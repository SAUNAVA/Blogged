import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    }],
    bio:{
        type:String,
        default:"",
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User;