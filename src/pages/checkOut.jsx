import React from "react";
import { useContext } from "react";
import { ProductProvuider } from "../context/productprovider";



export default function CheckOut() {

    const { darkMode } = useContext(ProductProvuider);


    return (
        <div className={`text-black min-h-screen flex items-center justify-center transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            
        <h1 className="text-4xl font-bold">Page is under construction 🚧</h1>
    </div>
    );
}
