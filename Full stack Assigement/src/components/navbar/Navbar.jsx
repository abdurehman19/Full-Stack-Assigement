import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          SHOP.CO
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">

          <Link to="/shop" className="shop-link">
            Shop
            <FiChevronDown />
          </Link>

          <Link to="/sale">
            On Sale
          </Link>

          <Link to="/new-arrivals">
            New Arrivals
          </Link>

          <Link to="/brands">
            Brands
          </Link>

        </div>

        {/* Search */}
        <div className="search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search for products..."
          />

        </div>

        {/* Actions */}
        <div className="nav-actions">

          <Link to="/cart">
            <FiShoppingCart />
          </Link>

          <Link to="/account">
            <FiUser />
          </Link>

        </div>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <Link
            to="/sale"
            onClick={() => setMenuOpen(false)}
          >
            On Sale
          </Link>

          <Link
            to="/new-arrivals"
            onClick={() => setMenuOpen(false)}
          >
            New Arrivals
          </Link>

          <Link
            to="/brands"
            onClick={() => setMenuOpen(false)}
          >
            Brands
          </Link>

        </div>
      )}
    </>
  );
};

export default Navbar;