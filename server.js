import express from "express";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/api", allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}`);
});
