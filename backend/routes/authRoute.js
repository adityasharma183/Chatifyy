import express from 'express'
const router=express.Router()
import {signUp,login,logout,updateProfile} from '../controllers/authController.js'
import { protectRoute } from '../middlewares/authMiddleware.js'

router.post('/signup',signUp)

router.post('/login',login)

router.post('/logout',logout)

router.put('update-profile',protectRoute,updateProfile)

router.get('/check',protectRoute,(req,res)=>{
    res.status(200).json(req.user)

})

export default router