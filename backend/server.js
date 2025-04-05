import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import path from 'path';
dotenv.config();


const app = express();

const __dirname = path.resolve();
// Serve the uploads folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

connectDB();



app.use("/api/auth" , authRoutes )
app.use("/api/blogs" , blogRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})