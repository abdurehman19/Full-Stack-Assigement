import React from "react";
import "./NewArrivals.css";

function ProductCard({ image, name, rating, reviews, price, oldPrice, discount }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <h3>{name}</h3>

      <div className="product-rating">
        <span>★ ★ ★ ★ ★</span>
        <small>{rating}/5</small>
        <small>{reviews}</small>
      </div>

      <div className="product-price">
        <strong>${price}</strong>

        {oldPrice && (
          <del>${oldPrice}</del>
        )}

        {discount && (
          <span className="discount">
            {discount}
          </span>
        )}
      </div>

    </div>
  );
}


function NewArrivals() {

  const products = [
    {
      image: "/products/tshirt.png",
      name: "T-shirt with Tape Details",
      rating: "4.5",
      reviews: "456",
      price: "120",
    },
    {
      image: "/products/jeans.png",
      name: "Skinny Fit Jeans",
      rating: "3.5",
      reviews: "320",
      price: "240",
      oldPrice: "260",
      discount: "-20%",
    },
    {
      image: "/products/shirt.png",
      name: "Checkered Shirt",
      rating: "4.5",
      reviews: "410",
      price: "180",
    },
    {
      image: "/products/striped-shirt.png",
      name: "Sleeve Striped T-shirt",
      rating: "4.5",
      reviews: "250",
      price: "130",
      oldPrice: "160",
      discount: "-30%",
    },
  ];

  return (
    <section className="new-arrivals">

      <h2>NEW ARRIVALS</h2>

      <div className="products-grid">

        {products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
          />
        ))}

      </div>

      <button className="view-all">
        View All
      </button>

      <div className="section-line"></div>

    </section>
  );
}

export default NewArrivals;