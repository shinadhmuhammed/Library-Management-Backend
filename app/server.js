import express from 'express'
import 'dotenv/config'
import route from './Routes/userRouter.js'
import {limiter}  from './utils/rateLimitter.js';
import connectDB from './Models/mongodb.js';
import cors from 'cors'
import AdminRouter from './Routes/adminRouter.js';
import userRoute from './Routes/userRouter.js';

const PORT=process.env.PORT 
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    }))

app.use(express.json({ limit: "50mb" }));
app.use(limiter)

app.use('/',userRoute)
app.use('/',AdminRouter)
connectDB()


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})