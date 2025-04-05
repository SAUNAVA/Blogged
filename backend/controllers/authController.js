import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"


export const loginUser = async(req,res)=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})
        res.json({
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                
            }
        })
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
    
}

export const registerUser = async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}

export const getUserBio = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json({bio:user.bio})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}

export const updateUserBio = async(req,res)=>{
    try {
        const {bio} = req.body
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.bio = bio
        await user.save()   
        res.json({message:"Bio updated successfully"})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}
export const deleteUserBio = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.bio = undefined
        await user.save()   
        res.json({message:"Bio deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}