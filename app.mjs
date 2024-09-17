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

passport.use(new LocalStrategy(async (username, password, cb) => {
    // access MongoDB to retrieve user information
    const user = await User.find({username: username})
    const pw = await User.find({username: username}, {'password': password})

    // if the username doesn't exist, send an error message
    if (!user) {
        return done(null, false, { message: 'Incorrect username or password'})
    }

    // hash the password to check MongoDB's record of hashed password, adding salt value of 10
    const hashedpw = bcrypt.hashSync(password, 10)

    // if the password doesn't match, send error message
    if (hashedpw !== pw) {
        return done(null, false, {message: 'Incorrect username or password'})
    }
}))

// add cookies session from passport somewhere for making sure user stays logged in

app.get('/', (req, res) => {
    res.json()
})

mongoose.connect(process.env.DSN)

io.on()
// socket.broadcast.emit('event name', 'message') - for multi-user venmo request