import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { convertToINR } from "../utils/currency";

const ProductCard = ({ product, isWishlistPage = false }) => {
	const { user, addToWishlist } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	// Format price using Intl.NumberFormat for better localization
	const formattedPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(convertToINR(product.price));

	return (
		<div className='bg-gray-800 rounded-lg shadow-md p-4'>
			<img
				src={product.image}
				alt={product.name}
				className='w-full h-48 object-cover rounded-md mb-4'
			/>
			<h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
			<p className='text-gray-400 mb-4'>{formattedPrice}</p>
			{!isWishlistPage && (
				<button
					className='bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600'
					onClick={() => addToWishlist(product._id)}
				>
					Add to Wishlist
				</button>
			)}
			{!isWishlistPage && (
				<button
					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 mt-2'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			)}
		</div>
	);
};

export default ProductCard;
