import React from "react";

import { useContext } from "react";
import { ProductProvuider } from "../context/productprovider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { state, dispatch, darkMode } = useContext(ProductProvuider);
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen p-6 transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <h2 className="text-3xl font-bold text-center">🛒 Your Cart</h2>

            {state.cart.length === 0 ? (
                <p className="text-center text-xl mt-4">Your cart is empty.</p>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
                 >
                    {state.cart.map((product) => (
                        <div
                            key={product.id}
                            className="p-4 shadow-md rounded-lg text-center"
                        >
                            <img src={product.image} alt={product.title} width = "100" className="h-64 w-full object-contain" />
                            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                            <p className="text-blue-600 dark:text-blue-300 font-bold">${product.price}</p>

                            <button
                                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}
                                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            >
                                Remove from Cart ❌
                            </button>

                        </div>
                    ))}
                </div>
            )}

            {/* Back to Products Button */}
            <div className=" content-center flex gap-4  ml-130 mt-8 ">
                <button
                    onClick={() => navigate("/productDetails")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Back to Products
                </button>
                <button
                    onClick={() => navigate("/checkout")}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-blue-700"
                >
                    checkout
                </button>

            </div>
        </div>
    );
};

export default Cart;
