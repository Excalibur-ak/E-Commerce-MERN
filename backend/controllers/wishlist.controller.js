import Product from "../models/product.model.js";

export const getWishlist = async (req, res) => {
    try {
        const user = req.user;
        const wishlist = await Product.find({ _id: { $in: user.wishlist } });
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};