import express from 'express'
import session from 'express-session'
import cors from 'cors'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

import { User, Payment } from './db.mjs'
import './config.mjs'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use(express.static('dist'))

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // access MongoDB to retrieve user information
        const user = await User.find({username: username})

        // if the username doesn't exist, send an error message
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password'})
        }

        // if the password doesn't match from bcrypt comparing salt and hash, send error message
        else if (bcrypt.compareSync(password, user.password)) {
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
        username: loggedUser.username
    })
})

// deserialize user session
passport.deserializeUser((user, done) => {
    return done(null, user)
})

app.get('/', (req, res) => {
    res.json()
})

app.get('/login', (req, res) => {

})

mongoose.connect(process.env.DSN)

io.on()
// socket.broadcast.emit('event name', 'message') - for multi-user venmo request