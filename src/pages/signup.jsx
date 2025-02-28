import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvuider } from "../context/productprovider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch, darkMode } = useContext(ProductProvuider);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Post the signup details to the dummy API endpoint
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The API typically uses only email and password.
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed.");
      } else {
        console.log("Signup successful. Token:", data.token);
        setSignupSuccess(true);
        
        dispatch({ type: "SIGNUP", payload: { name, email } });
        navigate("/login"); 
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-yellow-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col gap-y-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input

            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <button className="m-10 pb-50 pr-50 absolute top-1 left-4 " onClick={() => navigate("/login")}>Back</button>
    </div>
  );
};

export default Signup;
