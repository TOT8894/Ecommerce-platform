import express from "express";
import {
  getOrders,
  getOrdersById,
  creatOrders,
  updateOrders,
  deleteOrders
} from "../controllers/ordersController.js";
import { verificationToken } from "../middleware/authentication.js";
import { autherizedRoles } from "../middleware/autherization.js";
const ordersRoute = express.Router();
ordersRoute.get("/",verificationToken, getOrders);
ordersRoute.get("/:id",verificationToken, getOrdersById);
ordersRoute.post("/",autherizedRoles("admin","seller","super-admin"), creatOrders);
ordersRoute.put("/:id",autherizedRoles("admin","seller","super-admin"), updateOrders);
ordersRoute.delete("/:id",autherizedRoles("admin","seller","super-admin"), deleteOrders);
export default ordersRoute;