import express from "express";
import {
  getCarts,
  creatCarts,
  updateCarts,
  deleteCartsById,
  getCartsById
} from "../controllers/cartController.js";
import { verificationToken } from "../middleware/authentication.js";
import { autherizedRoles } from "../middleware/autherization.js";
const cartRoute = express.Router();
cartRoute.use(verificationToken,autherizedRoles("user"));
cartRoute.get("/", getCarts);
cartRoute.get("/:id", getCartsById);
cartRoute.post("/", creatCarts);
cartRoute.put("/id",updateCarts);
cartRoute.delete("/:id", deleteCartsById);
export default cartRoute;