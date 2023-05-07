import mongoose, { Schema } from "mongoose";




const userSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    contact: {
        type: Number,
        // required: true
    },
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        index: {
            expireAfterSeconds: 0
        }
    }
})

export const User = mongoose.model('users', userSchema)