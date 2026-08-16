import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import "./NewArrivals.css";

function NewArrivals() {

  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data);

      } catch (error) {

        console.error(error);

        setError("Unable to load products.");

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

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

      <h2>
        NEW ARRIVALS
      </h2>


      <div className="products-grid">

        {visibleProducts.map((product) => (

          <Link
            to={`/product/${product._id}`}
            className="product-card"
            key={product._id}
          >

            <div className="product-image">

              <img
                src={product.image?.[0]}
                alt={product.name}
              />

            </div>


            <h3>
              {product.name}
            </h3>


            <div className="product-rating">

              <span>
                ★★★★★
              </span>

              <small>
                {product.rating}/5
              </small>

              <small>
                {product.reviews}
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
                  {product.discount}
                </span>
              )}

            </div>

          </Link>

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
}
export default NewArrivals;