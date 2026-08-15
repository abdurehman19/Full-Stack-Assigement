import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "./Product.js";
import "./ProductDetails.css";

import { useCart } from "../pages/CartContext";


const ProductDetails = () => {

  const { id } = useParams();

  // ✅ IMPORTANT:
  // useCart component ke ANDAR hona chahiye
  const { addToCart } = useCart();


  // Find product
  const product = products.find(
    (item) => item.id === Number(id)
  );


  // States
  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedSize, setSelectedSize] =
    useState("Large");

  const [selectedColor, setSelectedColor] =
    useState(0);

  const [quantity, setQuantity] =
    useState(1);


  // Product images
  const productImages = product
    ? Array.isArray(product.image)
      ? product.image
      : [product.image]
    : [];


  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">

        <h2>
          Product Not Found
        </h2>

        <p>
          This product does not exist.
        </p>

        <Link to="/shop">
          Back to Shop
        </Link>

      </div>
    );
  }


  return (
    <main className="product-page">


      {/* =========================
          BREADCRUMB
      ========================= */}

      <div className="product-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>/</span>

        <Link to="/shop">
          Shop
        </Link>

        <span>/</span>

        <span>
          {product.category}
        </span>

        <span>/</span>

        <strong>
          {product.name}
        </strong>

      </div>



      {/* =========================
          PRODUCT MAIN
      ========================= */}

      <section className="product-main">


        {/* =========================
            PRODUCT GALLERY
        ========================= */}

        <div className="product-gallery">


          {/* Thumbnails */}

          <div className="product-thumbnails">

            {productImages.map(
              (image, index) => (

                <button
                  key={index}
                  type="button"
                  className={
                    selectedImage === index
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() =>
                    setSelectedImage(index)
                  }
                >

                  <img
                    src={image}
                    alt={`${product.name} ${
                      index + 1
                    }`}
                  />

                </button>

              )
            )}

          </div>



          {/* Main Image */}

          <div className="product-main-image">

            <img
              src={
                productImages[selectedImage]
              }
              alt={product.name}
            />

          </div>

        </div>



        {/* =========================
            PRODUCT INFORMATION
        ========================= */}

        <div className="product-info">


          {/* Product Name */}

          <h1>
            {product.name}
          </h1>



          {/* Rating */}

          <div className="product-rating">

            <span className="stars">
              ★★★★★
            </span>

            <span>
              {product.rating}/5
            </span>

            <span className="review-count">
              ({product.reviews} Reviews)
            </span>

          </div>



          {/* Price */}

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



          {/* Description */}

          <p className="product-description">

            {product.description ||
              "This product is made with high quality materials and designed for everyday comfort and style."}

          </p>


          <div className="product-divider"></div>



          {/* =========================
              COLOR
          ========================= */}

          <div className="product-option">

            <h4>
              Select Color
            </h4>

            <div className="color-options">

              {product.colors &&
                product.colors.map(
                  (color, index) => (

                    <button
                      key={index}
                      type="button"
                      className={
                        selectedColor === index
                          ? "color selected"
                          : "color"
                      }
                      style={{
                        backgroundColor: color,
                      }}
                      onClick={() =>
                        setSelectedColor(index)
                      }
                      aria-label={`Color ${
                        index + 1
                      }`}
                    />

                  )
                )}

            </div>

          </div>



          {/* =========================
              SIZE
          ========================= */}

          <div className="product-option">

            <div className="size-heading">

              <h4>
                Choose Size
              </h4>

              <button type="button">
                Size Guide →
              </button>

            </div>


            <div className="size-options">

              {product.sizes &&
                product.sizes.map(
                  (size) => (

                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSize === size
                          ? "size active"
                          : "size"
                      }
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>

                  )
                )}

            </div>

          </div>



          {/* =========================
              QUANTITY + CART
          ========================= */}

          <div className="product-cart-row">


            {/* Quantity */}

            <div className="quantity">

              <button
                type="button"
                onClick={() =>
                  setQuantity((q) =>
                    q > 1 ? q - 1 : 1
                  )
                }
              >
                −
              </button>


              <span>
                {quantity}
              </span>


              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
              >
                +
              </button>

            </div>



            {/* =========================
                ADD TO CART
            ========================= */}

            <button
              type="button"
              className="add-cart"
              onClick={() => {

                addToCart(
                  product,
                  quantity,
                  selectedSize,
                  product.colors
                    ? product.colors[selectedColor]
                    : null
                );

                alert(
                  "Product added to cart!"
                );

              }}
            >
              Add to Cart
            </button>

          </div>



          {/* Buy Now */}

          <button
            type="button"
            className="buy-now"
          >
            Buy Now
          </button>

        </div>

      </section>



      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      <section className="product-tabs">


        <div className="tabs-header">

          <button
            type="button"
            className="tab active"
          >
            Product Details
          </button>

          <button
            type="button"
            className="tab"
          >
            Rating & Reviews
          </button>

          <button
            type="button"
            className="tab"
          >
            FAQs
          </button>

        </div>



        <div className="product-details-content">

          <h2>
            Product Details
          </h2>

          <p>
            {product.description ||
              "High quality product designed for comfort, durability and everyday style."}
          </p>



          <div className="specifications">


            <div>
              <span>
                Category
              </span>

              <strong>
                {product.category}
              </strong>
            </div>


            <div>
              <span>
                Material
              </span>

              <strong>
                100% Cotton
              </strong>
            </div>


            <div>
              <span>
                Fit
              </span>

              <strong>
                Regular Fit
              </strong>
            </div>


            <div>
              <span>
                Availability
              </span>

              <strong>
                In Stock
              </strong>
            </div>


          </div>

        </div>

      </section>



      {/* =========================
          REVIEWS
      ========================= */}

      <section className="reviews-section">


        <div className="reviews-heading">

          <h2>
            All Reviews
          </h2>

          <button
            type="button"
            className="write-review"
          >
            Write a Review
          </button>

        </div>



        <div className="reviews-grid">

          {[
            "Absolutely love this product! The quality is really good.",
            "Very comfortable and the fitting is perfect.",
            "The product looks exactly like the pictures.",
            "Really happy with the quality and design.",
          ].map(
            (review, index) => (

              <div
                className="review-card"
                key={index}
              >

                <div className="review-stars">
                  ★★★★★
                </div>

                <strong>
                  Verified Customer ✓
                </strong>

                <p>
                  {review}
                </p>

                <small>
                  Posted recently
                </small>

              </div>

            )
          )}

        </div>

      </section>



      {/* =========================
          RELATED PRODUCTS
      ========================= */}

      <section className="related-products">

        <h2>
          YOU MIGHT ALSO LIKE
        </h2>


        <div className="related-grid">

          {products
            .filter(
              (item) =>
                item.id !== product.id
            )
            .slice(0, 4)
            .map((item) => (

              <Link
                to={`/product/${item.id}`}
                className="related-card"
                key={item.id}
              >

                <div className="related-image">

                  <img
                    src={
                      Array.isArray(item.image)
                        ? item.image[0]
                        : item.image
                    }
                    alt={item.name}
                  />

                </div>


                <h3>
                  {item.name}
                </h3>


                <div className="related-rating">
                  ★★★★★ {item.rating}/5
                </div>


                <strong>
                  ${item.price}
                </strong>

              </Link>

            ))}

        </div>

      </section>


    </main>
  );
};


export default ProductDetails;