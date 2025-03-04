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
        <div className={`flex flex-col items-center justify-center min-h-screen transition m-20 p-10 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="text-2xl  w-lg px-3 py-5 mb-10   text-gray-700 bg-cyan-200 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {error && <p className="text-red-500">{error}</p>}
                <label className="block  font-bold " >
                  <span> Username</span>
                  </label>
                <input
                    type="email"
                    placeholder="Enter mobile number or Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" gap-x-10 w-full border border-solid border-black-300 rounded-md mb-4"
                    required
                />
                                
                <label className="block  font-bold" >
                  <span>Password</span> </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full  border border-solid  border-black-300 rounded-md mb-4"
                    required
                />
                <button type="submit" className="font-bold text-blue-800  px-4 py-2 rounded-full block mx-auto  bg-cyan-400">
                    Login
                </button>
                </form>
                <div className="block mb-200 px-3 py-20 " >

                <p className="text-xl justify-center  text-blue-500 ">
                  New to Store Create an Account 
                  </p>
                <button className="text-xl text-red-500  rounded w-full" 
                onClick={()=> navigate("/signup")}> Sign Up
                  </button>
                  </div>
            
        </div>
    );
};

export default Login;
