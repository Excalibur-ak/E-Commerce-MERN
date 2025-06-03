import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWishlist);
router.post("/", protectRoute, addToWishlist);
router.delete("/", protectRoute, removeFromWishlist);

export default router;