import mongoose from 'mongoose'
import './config.mjs'

mongoose.connect(process.env.DSN)

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    payment: [{}]
})

const paymentSchema = mongoose.Schema({

})

const User = mongoose.model('User', userSchema)
const Payment = mongoose.model('Payment', paymentSchema)

export default {
    User,
    Payment
}