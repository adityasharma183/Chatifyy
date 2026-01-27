import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
const app=express()

const PORT=process.env.PORT || 3000

//middlewares for mounting routes
app.use('/api/auth',authRoute)
app.use('/api/messages',messageRoute)



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})