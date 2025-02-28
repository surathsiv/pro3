import React from "react";
import { useContext } from "react";
import { ProductProvuider } from "../context/productprovider";
import { useNavigate } from "react-router-dom"; 

const Header = () => {
    const { state, darkMode, toggleDarkMode } = useContext(ProductProvuider);
    const navigate = useNavigate(); 



    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // ✅ Remove login state
        navigate("/login"); // ✅ Redirect to login
    };

    return (
        <div className={`p-4 shadow-md flex justify-between items-center transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300">Product Store 🛒</h1>

            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md transition bg-gray-200 dark:bg-gray-700 dark:text-white"
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                )}

                {/* Cart Icon (Navigate to /cart) */}
                <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                    <span className="text-lg font-semibold">🛒</span>
                    {state.cart.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-2 -right-4">
                            {state.cart.length}
                        </span>
                    )}
                    </div>
                </div>
            </div>
       
    );
};

export default Header;