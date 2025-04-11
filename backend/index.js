import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import menuRoute from "./routes/menu.route.js"
import authRoute from "./routes/auth.route.js"

import cookieParser from "cookie-parser";

import cors from 'cors';


dotenv.config();

const app = express();
// Add this after initializing express
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(express.json())
app.use(cookieParser());

app.use("/api/menu", menuRoute)
app.use("/api/auth", authRoute)
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server running in port:" ${PORT}`)
} )
