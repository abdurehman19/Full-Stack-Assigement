import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AnnouncementBar from "./components/topbar/AnnouncementBar";
import Navbar from "./components/navbar/Navbar";
import ProductDetails from "./components/product/ProductDetails";
import Newsletter from "./components/newsletter/Newsletter";
import Footer from "./components/footer/Footer";



function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id"element={<ProductDetails />}/>
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        
      </Routes>
      <Newsletter/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;