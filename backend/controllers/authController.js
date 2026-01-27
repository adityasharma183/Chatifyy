import User from "../models/User.js"
import { generateToken } from "../utils/Token.js"
import bcrypt, { genSalt } from 'bcryptjs'
export const signUp=async (req,res)=>{
    try {
        const {fullName,email,password}=req.body
    if(!fullName || !email || !password){
        return res.status(400).json({message:'Please enter all credentials'})
    }
    if(password.length<6){
        return res.status(400).json({message:'Password should be at least 6 characters'})
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:'Invalid email format'})
    }

    const user=await User.findOne({email})
    if(user){return res.status(400).json({message:'Email already exists'})}

    //hash password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const newUser=new User({
        fullName,email, password: hashedPassword
    })
    if (newUser) {
        generateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
           
            profilePic:newUser.profilePic
        })
        
    } else {
        res.status(400).json({message:'Invalid user data'})
        
        
    }

        
    } catch (error) {
        console.log('Error in signup controller',error);
        res.status(500).json({message:'Internal server error'})
        
        
    }

}

//LOGIN 
export const login=(req,res)=>{
    try {
        const {email,password}=req.body
        

        
    } catch (error) {
        
    }

}