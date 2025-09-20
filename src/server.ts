import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { corsMiddleware } from "./config/cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes";
import locationRoutes from "./routes/location.routes";
import organizationRoutes from "./routes/organization.route";
import userRoutes from "./routes/user.routes";
import systemManagerRoutes from "./routes/systemSetting.routes";


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json());

connectDB();

app.use("/api/organization", organizationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/system-manager", systemManagerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
