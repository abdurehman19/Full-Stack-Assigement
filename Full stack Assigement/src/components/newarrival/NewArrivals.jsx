import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";

const API_URL = "http://localhost:5000/api/products";

const ProductCard = ({ product }) => {
  const image = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card"
    >
      <div className="product-image">
        <img
          src={image}
          alt={product.name}
        />
      </div>

      <h3>{product.name}</h3>

      <div className="product-rating">
        <span>★★★★★</span>
        <small>{product.rating}/5</small>
        <small>({product.reviews})</small>
      </div>

      <div className="product-price">
        <strong>${product.price}</strong>

        {product.oldPrice && (
          <del>${product.oldPrice}</del>
        )}

        {product.discount && (
          <span className="discount">
            -{product.discount}%
          </span>
        )}
      </div>
    </Link>
  );
};

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products fetch failed");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="new-arrivals">
        <h2>NEW ARRIVALS</h2>
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="new-arrivals">
        <h2>NEW ARRIVALS</h2>
        <p>{error}</p>
      </section>
    );
  }

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="new-arrivals">

      <h2>NEW ARRIVALS</h2>

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {products.length > 4 && (
        <button
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}

      <div className="section-line"></div>

    </section>
  );
};

export default NewArrivals;