import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../product/Product.js";
import "./Topselling.css";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card-link"
    >
      <div className="product-card">

        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <h3>{product.name}</h3>

        <div className="product-rating">
          <span>★★★★★</span>
          <small>{product.rating}/5</small>
          <small>{product.reviews}</small>
        </div>

        <div className="product-price">
          <strong>${product.price}</strong>

          {product.oldPrice && (
            <del>${product.oldPrice}</del>
          )}

          {product.discount && (
            <span className="discount">
              {product.discount}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

function NewArrivals() {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="new-arrivals">

      <h2>NEW ARRIVALS</h2>

      <div className="products-grid">

        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      <button
        className="view-all"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "View All"}
      </button>

      <div className="section-line"></div>

    </section>
  );
}

export default NewArrivals;