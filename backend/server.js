import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import { connectDB } from './config/db.js'
const app=express()
const __dirname=path.resolve();

const PORT=process.env.PORT || 3000

app.use(express.json())//req.body
app.use(express.urlencoded({ extended: true }));



//middlewares for mounting routes
app.use('/api/auth',authRoute)
app.use('/api/messages',messageRoute)


/// make ready for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB()
    
})