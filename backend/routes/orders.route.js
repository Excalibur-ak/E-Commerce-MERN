// filepath: d:\InnoknowVex\E-Commerce-MERN\backend\routes\orders.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserOrders } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserOrders);

export default router;