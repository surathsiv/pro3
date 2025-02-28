import React from "react";
import { useReducer, useEffect, useState, createContext } from "react";

const initialState = {
    products: [],
    cart: [],
    loading: true,
    error: null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true"
};
export const ProductProvuider = createContext();

const productsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, products: [], loading: false, error: action.payload };
            case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] };
            case "REMOVE_FROM_CART":
            return {...state,cart: state.cart.filter((item) => item.id !== action.payload.id),};
            case "LOGIN":
                localStorage.setItem("isAuthenticated", "true"); 
                return { ...state, isAuthenticated: true };
            case "LOGOUT":
                localStorage.removeItem("isAuthenticated"); 
                return { ...state, isAuthenticated: false };
            default:
                return state;
    }
};

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                console.log("Fetched products:", data);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (error) {
                console.error("Fetch error:", error);
                dispatch({ type: "FETCH_ERROR", payload: error.message });
            }
        };
        fetchProducts();
    }, []);

    
    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ProductProvuider.Provider value={{ state, dispatch, darkMode, toggleDarkMode }}>
            {children}
        </ProductProvuider.Provider>
    );
};
