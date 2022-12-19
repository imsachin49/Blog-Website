import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";

import blogRouter from './routes/blogRoutes.js';
import router from './routes/user-routes.js';

const port=process.env.PORT || 5000;
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>app.listen(port)
    ).then(()=>console.log("Connected to database and listening to the port 5000")
    ).catch((err)=>console.log(err));
