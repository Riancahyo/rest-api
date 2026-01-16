import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, isAdmin, createProduct);
router.get("/", auth, getProducts);
router.put("/:id", auth, isAdmin, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

export default router;
