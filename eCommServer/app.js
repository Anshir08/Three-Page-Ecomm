import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {connectDB} from "./utils/database.js";
import orderRoutes from "./Routes/Order.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

// Routes
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Backend server is running");
});

export default app;

