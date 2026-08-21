import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Topselling.css";

const API_URL = "https://full-stack-assignment-backend.vercel.app/api/products";

function Topselling() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products load nahi huay");
        }

        const data = await response.json();

        console.log("API PRODUCTS:", data);

        const productList = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(productList);
      } catch (error) {
        console.error("Products error:", error);
        setError("Products load nahi ho rahe.");
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

        {visibleProducts.map((product) => {

          const productImage = Array.isArray(product.image)
            ? product.image[0]
            : product.image;

          return (
            <Link
              to={`/product/${product._id}`}
              className="product-card-link"
              key={product._id}
            >

              <div className="product-card">

                <div className="product-image">

                  <img
                    src={productImage}
                    alt={product.name}
                    onError={(e) => {
                      console.error(
                        "Image not found:",
                        productImage
                      );
                    }}
                  />

                </div>

                <h3>{product.name}</h3>

                <div className="product-rating">

                  <span>★★★★★</span>

                  <small>
                    {product.rating}/5
                  </small>

                  <small>
                    ({product.reviews})
                  </small>

                </div>

                <div className="product-price">

                  <strong>
                    ${product.price}
                  </strong>

                  {product.oldPrice && (
                    <del>
                      ${product.oldPrice}
                    </del>
                  )}

                  {product.discount && (
                    <span className="discount">
                      -{product.discount}%
                    </span>
                  )}

                </div>

              </div>

            </Link>
          );
        })}

      </div>

      {products.length > 4 && (
        <button
          type="button"
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}

      <div className="section-line"></div>

    </section>
  );
}

export default Topselling;