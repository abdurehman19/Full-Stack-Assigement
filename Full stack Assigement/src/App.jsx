import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";

import AnnouncementBar from "./components/topbar/AnnouncementBar";
import Navbar from "./components/navbar/Navbar";

import ProductDetails from "./components/product/ProductDetails";

import { CartProvider } from "./components/pages/CartContext";
import Newsletter from "./components/newsletter/Newsletter";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>

      <CartProvider>

        <AnnouncementBar />

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>
        <Newsletter/>
        <Footer/>

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;