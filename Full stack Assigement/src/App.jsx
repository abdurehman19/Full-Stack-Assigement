import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AnnouncementBar from "./components/topbar/AnnouncementBar";
import Navbar from "./components/navbar/Navbar";



function App() {
  return (
    <BrowserRouter>
        <AnnouncementBar/>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;