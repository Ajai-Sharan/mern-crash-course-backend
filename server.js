import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './route/product.route.js';

dotenv.config();


const app = express();



app.use(cors({
    origin: 'https://mern-crash-course-frontend.vercel.app',
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));
  
app.use(express.json());


app.use('/api/product', productRouter);

const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});