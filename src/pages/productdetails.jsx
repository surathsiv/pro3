import React from "react";
import { useContext } from "react";
import { ProductProvuider } from "../context/productprovider";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { state, dispatch, darkMode } = useContext(ProductProvuider);
    const { id } = useParams(); 
    const navigate = useNavigate();

    // Find the selected product
    const product = state.products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <p className="text-center text-red-500">Product not found.</p>;
    }


    const isInCart = state.cart.some((item) => item.id === product.id);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <img src={product.image} alt={product.title}  width = "100" />
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-lg mt-2">{product.description}</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-300 mt-2">${product.price}</p>

            
            {isInCart ? (
                <button
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                >
                    Remove from Cart ❌
                </button>
            ) : (
                <button
                    onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Add to Cart 🛒
                </button>
            )}

            
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 transition"
            >
                Go Back
            </button>
        </div>
    );
};

export default ProductDetail;
