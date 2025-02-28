import React from "react";
import Header from "./components/Header";
import ProductList from "./pages/productlist";
import { ProductsProvider } from "./context/productprovider";
import ProductDetail from "./pages/productdetails";
import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import './App.css'
import Cart from "./pages/cartpage";
import Login from "./pages/login";
import CheckOut from "./pages/checkOut";
import Signup from "./pages/signup";


function App() {
  return (
    <Router>
    <ProductsProvider>
        <Header />
        <Routes>
        <Route path="/productDetails" element={<ProductList />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
    </ProductsProvider>
    </Router>
  );
}
export default App
