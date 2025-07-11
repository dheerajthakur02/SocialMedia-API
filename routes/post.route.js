import express from "express";
import roleAuth from "../middlewares/roleAuth.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  addPost,
  likeThePost,
  getAllPostOfUser,
  getAllPost,
} from "../controllers/post.controller.js";
const route = express.Router();

route.post("/post/create", isAuthenticated, addPost);
route.put("/post/like/:_id", isAuthenticated, likeThePost);
route.get("/post/user-all-posts", isAuthenticated, getAllPostOfUser);
route.get(
  "/post/all-posts",
  isAuthenticated,
  roleAuth(["admin", "desinger"]),
  getAllPost
);

export default route;
