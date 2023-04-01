import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mark:{
        type:String,
        required:true
    }
})

export const User = mongoose.model('users',userSchema)