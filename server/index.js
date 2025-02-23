import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { ResidencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/residency', ResidencyRoute);

// This is the serverless function handler for Vercel
export default function handler(req, res) {
  app(req, res); // Pass the request and response objects to the Express app
}
