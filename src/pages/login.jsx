import React from "react";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvuider } from "../context/productprovider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch, darkMode } = useContext(ProductProvuider); 

    const handleLogin = async(e) => {
        e.preventDefault();

    try {

        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
        console.log(data);
  

        if (!response.ok) {

          setError(data.error || 'Login failed');
        } else {
          console.log('Login successful. Token:', data.token);
          setLoginSuccess(true);
        }
      } catch (err) {
        console.error('Error during login:', err);
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    

        if (email === data.email && password === data.password) {
            dispatch({ type: "LOGIN" }); 
            navigate("/"); 
        } else {
            setError("Invalid email or password!");
        
        }

    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="block w-xs px-3 py-2 mb-4 text-gray-700 bg-blue-300 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {error && <p className="text-red-500">{error}</p>}
                <label className="font-bold" > Username</label>
                <input
                    type="email"
                    placeholder="Enter mobile number or Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border border-gray-300 rounded-md"
                    required
                />
                                
                <label className="font-bold" > Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border border-gray-300 rounded-md "
                    required
                />
                <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded w-full">
                    Login
                </button>
              
            </form>
        </div>
    );
};

export default Login;
