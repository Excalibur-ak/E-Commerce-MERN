import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const { fetchProductsByCategory, products } = useProductStore();
    const { category } = useParams();

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category]);

    // Open modal with selected image
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className='min-h-screen'>
            <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <motion.h1
                    className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.h1>

                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {products?.length === 0 && (
                        <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                            No products found
                        </h2>
                    )}

                    {products?.map((product) => (
                        <div key={product._id} onClick={() => handleImageClick(product.image)}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
                    onClick={closeModal}
                >
                    <div
                        className='relative bg-white rounded-lg overflow-hidden'
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <img src={selectedImage} alt='Product' className='w-full h-auto' />
                        <button
                            className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2'
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
