import express from "express";
import postRoutes from "./post.route.js";
import userRoutes from "./user.route.js";

const router = express.Router();

router.use(userRoutes);
router.use(postRoutes);

export default router;
