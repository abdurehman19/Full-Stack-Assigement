import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        SHOP.CO
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">

        <Link to="/shop" className="shop-link">
          Shop
          <FiChevronDown />
        </Link>

        <Link to="/sale">On Sale</Link>

        <Link to="/new-arrivals">New Arrivals</Link>

        <Link to="/brands">Brands</Link>

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
  );
};

export default Navbar;