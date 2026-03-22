import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verificationToken = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken; 

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};