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
import Checkout from "./components/checkout/Checkout";
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