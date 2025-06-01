import { useState } from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageNotFound from "./components/pageNotFound";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

function App() {
    return (
        <Router>
			<Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="*" element={<PageNotFound />} />
				<Route path="/product/:id/checkout" element={<Checkout />} />
				<Route path="/product/:id/order" element={<ThankYou />} />
            </Routes>
			<Footer />
        </Router>
    );
}

export default App;
