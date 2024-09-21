import express from 'express'
import session from 'express-session'
import cors from 'cors'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

import './db.mjs'
import './config.mjs'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.static('dist'))

mongoose.connect(process.env.DSN)

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // access MongoDB to retrieve user information
        const user = await User.find({username: username})

        // if the username doesn't exist, send an error message
        if (!(user)) {
            return done(null, false, { message: 'Incorrect username or password'})
        }

        // if the password doesn't match from bcrypt comparing salt and hash, send error message
        else if (!(bcrypt.compareSync(password, user.password))) {
            return done(null, false, {message: 'Incorrect username or password'})
        } 
        
        // else username and password are correct, so pass to session
        else {
            return done(null, user)
        }
    } catch (e) {
        done(e)
    }
}))

// serialize user session
passport.serializeUser(async (user, done) => {
    const loggedUser = await User.find({username: user.username})
    return done(null, {
        id: loggedUser.id,
        username: loggedUser.username,
        name: user.name
    })
})

// deserialize user session
passport.deserializeUser((user, done) => {
    return done(null, user)
})

app.get('/login', (req, res) => {
    res.json(req.user)
})

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

app.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    const name = req.body.name
    const password = req.body.password

    try {
        const exist = await User.find({username: username})
        if (exist) {
            res.send({messsage: 'Username already exists'})
        } else {
            // hash password with salt value of 10
            const hashedPassword = bcrypt.hashSync(password, 10)
    
            const newUser = new User({
                name: name,
                username: username,
                password: hashedPassword,
                payment: []
            })
            await newUser.save()

            req.logIn(newUser, (err) => {
                if (err) {
                    return res.send({message: 'Error logging in'})
                }
                res.json({
                    id: newUser.id,
                    username: newUser.username,
                    name: newUser.name
                })
            })
        }
    } catch(e) {
        console.error(e)
    }
})

// io.on()
// socket.broadcast.emit('event name', 'message') - for multi-user venmo request

app.listen(process.env.PORT ?? 3000)