import React from "react";
import { useContext } from "react";
import { ProductProvuider } from "../context/productprovider";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const { state, darkMode } = useContext(ProductProvuider);
    const navigate = useNavigate(); // Hook for navigation

    if (state.loading) return <p>Loading products...</p>;
    if (state.error) return <p>Error: {state.error}</p>;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 px-4 transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
        >
            {state.products.map((product) => (
                <div
                    key={product.id}
                    className={`p-4 shadow-md rounded-lg text-center transition ${
                        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                    }`}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        width = "100"
                        className="h-64 w-full object-contain"
                    />
                    <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                    <p className="font-bold text-blue-600 dark:text-blue-300">${product.price}</p>

                    {/* View Button to Navigate */}
                    <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="mt-3 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700"
                    >
                        View
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
