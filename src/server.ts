import express from "express";
import schoolRoutes from "./routes/school.route";
import authRoutes from "./routes/auth.routes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { corsMiddleware } from "./config/cors";

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());

connectDB();

app.use("/api/schools", schoolRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
