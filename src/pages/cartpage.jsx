import React from "react";

import { useState, useContext } from "react";
import { ProductProvuider } from "../context/productprovider";
import { IDLE_FETCHER, useNavigate } from "react-router-dom";

const Cart = () => {
    const { state, dispatch, darkMode } = useContext(ProductProvuider);
        const navigate = useNavigate();


    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
        
    

    const handlecheckout = () => {
        {isAuthenticated ? 
            navigate("/checkout") : navigate("/login")
        }
    
        
    }
    


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
                            className="p-4 shadow-md rounded-lg text-center justify-center
                            "
                        >
                            <img src={product.image} alt={product.title} width = "100" className="h-64 w-full object-contain" />
                            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                            <p className="text-blue-600 dark:text-blue-300 font-bold">${product.price}</p>

                            <div className="flex justify-center space-x-3 ">
                            <button     
                             onClick={() => dispatch({ type: "Inc", payload: product })}
                            className=" px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            >+</button>
                            <p className="font-bold text-xl text-red-700 py-2">{product.quantity}</p>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            onClick={() => dispatch({ type: "Dec", payload: product })}>-</button>
                            </div>

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

        
            <div className=" content-center flex gap-4  ml-130 mt-8 ">
                <button
                    onClick={() => navigate("/productDetails")}
                    className=" justify-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Back to Products
                </button>
                    <button 
                    onClick={handlecheckout}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-blue-700"
                >
                    checkout
                </button>
                
                

            </div>
        </div>
    );
};

export default Cart;
