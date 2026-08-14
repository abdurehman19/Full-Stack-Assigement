import React, { useState } from "react";
import "./Topselling.css";

function ProductCard({
  image,
  name,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
}) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <h3>{name}</h3>

      <div className="product-rating">
        <span>★★★★★</span>
        <small>{rating}/5</small>
        <small>{reviews}</small>
      </div>

      <div className="product-price">
        <strong>${price}</strong>

        {oldPrice && <del>${oldPrice}</del>}

        {discount && (
          <span className="discount">
            {discount}
          </span>
        )}
      </div>

    </div>
  );
}


function Topselling() {

  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      image: "src/assets/product/t shirt 2.jpeg",
      name: "T-shirt with Tape Details",
      rating: "4.5",
      reviews: "456",
      price: "120",
    },

    {
      image: "src/assets/product/t shirt 4.jpeg",
      name: "Skinny Fit Jeans",
      rating: "3.5",
      reviews: "320",
      price: "240",
      oldPrice: "260",
      discount: "-20%",
    },

    {
      image: "src/assets/product/t shirt 2.jpeg",
      name: "Checkered Shirt",
      rating: "4.5",
      reviews: "410",
      price: "180",
    },

    {
      image: "src/assets/product/t shirt 4.jpeg",
      name: "Sleeve Striped T-shirt",
      rating: "4.5",
      reviews: "250",
      price: "130",
      oldPrice: "160",
      discount: "-30%",
    },

    // 👇 Additional products

    {
      image: "src/assets/product/t shirt 2.jpeg",
      name: "Vertical Striped Shirt",
      rating: "4.5",
      reviews: "300",
      price: "212",
    },

    {
      image: "src/assets/product/t shirt 4.jpeg",
      name: "Courage Graphic T-shirt",
      rating: "4.0",
      reviews: "220",
      price: "145",
    },

    {
      image: "src/assets/product/t shirt 2.jpeg",
      name: "Loose Fit Bermuda Shorts",
      rating: "4.5",
      reviews: "180",
      price: "80",
    },

    {
      image: "src/assets/product/t shirt 3.jpeg",
      name: "Faded Skinny Jeans",
      rating: "4.5",
      reviews: "390",
      price: "210",
    },
  ];


  // Pehle 4 products
  // View All ke baad saare products

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);


  return (
    <section className="new-arrivals">

      <h2>TOP SELLING</h2>


      <div className="products-grid">

        {visibleProducts.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
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

export default Topselling;