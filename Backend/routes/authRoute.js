import { Router } from "express";
import { verificationToken } from "../middleware/authentication.js";
import {
  signIn,
  signUp,
  signOut,
  refreshToken,
  getUser
} from "../controllers/authController.js";
const authRoute = Router();
authRoute.get("/user", verificationToken, getUser);
authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.post("/sign-out", verificationToken, signOut);
authRoute.post("/refresh-token", refreshToken);
export default authRoute;