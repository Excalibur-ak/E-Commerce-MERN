import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
    const { wishlist, fetchWishlist, removeFromWishlist } = useUserStore();
    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const handleRemove = (productId) => {
        removeFromWishlist(productId);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the selected image for the popup
    };

    const closePopup = () => {
        setSelectedImage(null); // Close the popup
    };

    return (
        <div className='relative min-h-screen text-white overflow-hidden'>
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
                    Your Wishlist
                </h1>
                <p className='text-center text-xl text-gray-300 mb-12'>
                    Explore your favorite products saved for later.
                </p>

                {wishlist.length === 0 ? (
                    <div className='flex flex-col items-center justify-center space-y-4 py-16'>
                        <p className='text-2xl font-semibold'>Your wishlist is empty</p>
                        <p className='text-gray-400'>Start adding products to your wishlist now!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {wishlist.map((product) => (
                            <div key={product._id} className='relative'>
                                <div onClick={() => handleImageClick(product.image)}>
                                    <ProductCard product={product} />
                                </div>
                                <button
                                    onClick={() => handleRemove(product._id)}
                                    className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Render the popup if an image is selected */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='relative bg-gray-800 p-4 rounded-lg'>
                        <button
                            onClick={closePopup}
                            className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                        >
                            Close
                        </button>
                        <img
                            src={selectedImage}
                            alt='Product'
                            className='max-w-full max-h-[80vh] rounded-md'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;