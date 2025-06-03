// filepath: d:\InnoknowVex\E-Commerce-MERN\frontend\src\pages\OrdersViewPage.jsx
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { motion } from "framer-motion";

const convertToINR = (usd) => (usd * 82).toFixed(2);

const OrdersViewPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders");
                setOrders(response.data); // Assume prices are already in INR
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-300">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center text-red-400">{error}</div>;
    }

    return (
        <div className="min-h-screen py-8 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h1 className="text-3xl font-bold text-emerald-400 text-center mb-8">Your Orders</h1>
                {orders.length === 0 ? (
                    <p className="text-center text-gray-300">You have no orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                className="bg-gray-800 rounded-lg p-6 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-white">Order #{order._id}</h2>
                                    <p className="text-sm text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {order.products.map((product) => (
                                        <div
                                            key={product.product._id}
                                            className="flex items-center gap-4 text-gray-300"
                                        >
                                            <img
                                                src={product.product.image}
                                                alt={product.product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">{product.product.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    {product.quantity} x ₹{product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-between items-center border-t border-gray-700 pt-4">
                                    <p className="text-gray-400">Total:</p>
                                    <p className="text-emerald-400 font-bold">₹{order.totalAmount}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersViewPage;