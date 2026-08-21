import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

import AnnouncementBar from "./topbar/AnnouncementBar";
import Navbar from "./navbar/Navbar";

import ProductDetails from "./product/ProductDetails";

import { CartProvider } from "./pages/CartContext.jsx";
import Newsletter from "./newsletter/Newsletter";
import Footer from "./footer/Footer";
import Checkout from "./checkout/Checkout";
import AdminProducts from "./admin/AdminProducts";
import AdminProductForm from "./admin/AdminProductForm";

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
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/products/new"
            element={<AdminProductForm />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<AdminProductForm />}
          />


        </Routes>
        <Newsletter />
        <Footer />

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;