import express from 'express'
const router=express.Router()
import {signUp,login} from '../controllers/authController.js'

router.post('/signup',signUp)

router.post('/login',login)

router.get('/logout',(req,res)=>{
    res.send('logout end point')

})

export default router