// filepath: d:\InnoknowVex\E-Commerce-MERN\backend\controllers\orders.controller.js
import Order from "../models/order.model.js";

const USD_TO_INR_RATE = 82;

const convertToINR = (usd) => (usd * USD_TO_INR_RATE).toFixed(2);

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.product");
        const ordersInINR = orders.map((order) => ({
            ...order._doc,
            totalAmount: convertToINR(order.totalAmount),
            products: order.products.map((item) => ({
                ...item._doc,
                price: convertToINR(item.price),
            })),
        }));
        res.json(ordersInINR);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};