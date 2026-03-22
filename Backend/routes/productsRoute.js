import express from "express";
import {
  getProducts,
  getProductsById,
  createProducts,
  updateProductsById,
  deleteProductsById
} from "../controllers/productsController.js";
import { verificationToken } from "../middleware/authentication.js";
import { autherizedRoles } from "../middleware/autherization.js";
const productsRoute = express.Router();
productsRoute.get("", getProducts);
productsRoute.get("/:id", getProductsById);
productsRoute.post("/",verificationToken,autherizedRoles("admin","seller","super-admin"), createProducts);
productsRoute.put("/:id",verificationToken,autherizedRoles("admin","seller","super-admin"), updateProductsById);
productsRoute.delete("/:id",verificationToken,autherizedRoles("admin","seller","super-admin"), deleteProductsById);

export default productsRoute;