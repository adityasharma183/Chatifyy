import express from 'express'
import cookieParser from 'cookie-parser'

import {ENV} from './utils/env.js'
import path from 'path'
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import { connectDB } from './config/db.js'

import aj from './utils/arcjet.js';

if (process.env.NODE_ENV !== "development") {
  app.use(aj.middleware());
}

const app=express()
const __dirname=path.resolve();

const PORT=ENV.PORT || 3000
//payload too large
app.use(express.json())//req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



//middlewares for mounting routes
app.use('/api/auth',authRoute)
app.use('/api/messages',messageRoute)


/// make ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB()
    
})