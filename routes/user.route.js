import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  registerUser,
  userLogin,
  getProfile,
  userlogout,
  removeUser,
  getAllUsers,
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/user/register", registerUser);
route.post("/user/login", userLogin);
route.get("/user/getProfile", isAuthenticated, getProfile);
route.get("/user/logout", isAuthenticated, userlogout);
route.delete("/user/delete/:_id", isAuthenticated, isAdmin, removeUser);
route.get("/user/all-users", isAuthenticated, isAdmin, getAllUsers);

export default route;
