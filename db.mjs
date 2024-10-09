import mongoose from 'mongoose'
import './config.mjs'

mongoose.connect(process.env.DSN)

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    payment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}]
}, { timestamps: true })

const paymentSchema = mongoose.Schema({
    paymentId: {type: String, required: true},
    user: {type: String, required: true},
    paymentType: {type: String, required: true},
    comment: {type: String, required: true},
    amount: {type: Number, required: true},
    receiver: [{type: String, required: true}],
    status: {type: String, required: true}
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
const Payment = mongoose.model('Payment', paymentSchema)

export default {
    User,
    Payment
}