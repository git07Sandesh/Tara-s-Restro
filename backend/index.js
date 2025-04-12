import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import menuRoute from "./routes/menu.route.js"
import authRoute from "./routes/auth.route.js"
import adminRoute from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname1, '../.env') });
const PORT = process.env.PORT || 3000

const __dirname = path.resolve();
const app = express();
// Add this after initializing express
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(express.json())
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/menu", menuRoute)
app.use("/api/auth", authRoute)
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))

  })
}

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server running in port:" ${PORT}`)
} )
