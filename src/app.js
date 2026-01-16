import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
  console.log("Database synced!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
