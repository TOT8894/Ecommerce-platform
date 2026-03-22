import express from "express";
import { verificationToken } from "../middleware/authentication.js";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/adminUserController.js";
import { autherizedRoles } from "../middleware/autherization.js";
const userRoute = express.Router();
userRoute.use(autherizedRoles("admin","super-admin"),verificationToken);
userRoute.post("/", createUser);
userRoute.get("/", getUser);
userRoute.get("/:id", getUserById);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);
export default userRoute;