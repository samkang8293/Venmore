import express from 'express'
import session from 'express-session'
import cors from 'cors'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { User, Payment } from './db.mjs'
import './config.mjs'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.json()
})

mongoose.connect(process.env.DSN)

io.on()
// socket.broadcast.emit('event name', 'message') - for multi-user venmo request