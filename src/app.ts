import express from 'express';
import schoolRoutes from './routes/school.route';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/schools', schoolRoutes);

export default app;
