import { sendWelcomeEmail } from "../email/emailHandlers.js"
import User from "../models/User.js"
import { generateToken } from "../utils/Token.js"
import bcrypt, { genSalt } from 'bcryptjs'
import { ENV } from "../utils/env.js"
import cloudinary from "../utils/cloudinary.js"


export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please enter all credentials" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const savedUser = await newUser.save();

    generateToken(savedUser._id, res);

    // ✅ RETURN HERE (MOST IMPORTANT FIX)
    return res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
    });

    // ❌ This will NEVER block response now
    // (safe fire-and-forget)
    // sendWelcomeEmail(
    //   ENV.EMAIL_ADI,
    //   savedUser.fullName,
    //   ENV.CLIENT_URL
    // ).catch(() => console.error("Failed to send welcome email"));

  } catch (error) {
    console.log("Error in signup controller", error);

    // ✅ Guard against double response
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};


//LOGIN 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Password or email is missing'})
    }

    const user = await User.findOne({ email }); // ✅ await added
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    });

  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//LOGOUT USER
export const logout=async (req,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:'Logged out successfully!!!'})
}
//UPDATE PROFILE
export const updateProfile=async (req,res)=>{
    try {
        const {profilePic} =req.body
        if(!profilePic) return res.status(400).json({message:'Profile pic is required'})
        const userId=req.user._id
      const uploadResponse=  await cloudinary.uploader.upload(profilePic)
     const updatedUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
     res.status(200).json({updatedUser})
        
    } catch (error) {
      console.log('Error in update profile')
      res.status(500).json({message:'Internal server error'})
        
    }

}