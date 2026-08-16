import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import "./ProductDetails.css";

const API_URL = "http://localhost:5000/api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        const fetchedProduct = data.product || data;

        setProduct(fetchedProduct);

        // Default size
        if (fetchedProduct.sizes?.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }

        setSelectedImage(0);
        setSelectedColor(0);
        setQuantity(1);
      } catch (error) {
        console.error("Product fetch error:", error);
        setError("Product load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="product-page">
        <div className="product-loading">
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !product) {
    return (
      <main className="product-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>

          <p>
            {error || "This product does not exist."}
          </p>

          <Link to="/">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // PRODUCT DATA
  // =========================

  const images = Array.isArray(product.image)
    ? product.image.filter(Boolean)
    : product.image
      ? [product.image]
      : [];

  const colors = Array.isArray(product.colors)
    ? product.colors
    : [];

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : [];

  const currentImage =
    images[selectedImage] || images[0];

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {
    if (!product) return;

    const selectedColorValue =
      colors[selectedColor] || "";

    addToCart({
      id: product._id,
      name: product.name,
      price: Number(product.price),
      oldPrice: product.oldPrice
        ? Number(product.oldPrice)
        : null,
      image: images,
      size: selectedSize,
      color: selectedColorValue,
      quantity: quantity,
    });
  };

  // =========================
  // QUANTITY
  // =========================

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

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

          {/* THUMBNAILS */}

          <div className="product-thumbnails">

            {images.length > 0 ? (
              images.map((image, index) => (
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
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))
            ) : (
              <div className="thumbnail">
                No Image
              </div>
            )}

          </div>

          {/* MAIN IMAGE */}

          <div className="product-main-image">

            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
              />
            ) : (
              <div className="no-product-image">
                No Image
              </div>
            )}

          </div>

        </div>

        {/* =========================
            PRODUCT INFO
        ========================= */}

        <div className="product-info">

          <h1>
            {product.name}
          </h1>

          {/* RATING */}

          <div className="product-rating">

            <span className="stars">
              ★★★★★
            </span>

            <span>
              {product.rating || 0}/5
            </span>

            <span className="review-count">
              ({product.reviews || 0} Reviews)
            </span>

          </div>

          {/* PRICE */}

          <div className="product-price">

            <strong>
              ${Number(product.price).toFixed(2)}
            </strong>

            {product.oldPrice && (
              <del>
                ${Number(product.oldPrice).toFixed(2)}
              </del>
            )}

            {product.discount && (
              <span className="discount">
                -{product.discount}%
              </span>
            )}

          </div>

          {/* DESCRIPTION */}

          <p className="product-description">
            {product.description ||
              "No description available for this product."}
          </p>

          <div className="product-divider" />

          {/* =========================
              COLOR
          ========================= */}

          {colors.length > 0 && (
            <div className="product-option">

              <h4>
                Select Color
              </h4>

              <div className="color-options">

                {colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Select ${color}`}
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
                  />
                ))}

              </div>

            </div>
          )}

          {/* =========================
              SIZE
          ========================= */}

          {sizes.length > 0 && (
            <div className="product-option">

              <div className="size-heading">

                <h4>
                  Choose Size
                </h4>

                <button
                  type="button"
                  className="size-guide"
                >
                  Size Guide →
                </button>

              </div>

              <div className="size-options">

                {sizes.map((size) => (
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
                ))}

              </div>

            </div>
          )}

          {/* =========================
              QUANTITY + CART
          ========================= */}

          <div className="product-cart-row">

            <div className="quantity">

              <button
                type="button"
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
              >
                +
              </button>

            </div>

            <button
              type="button"
              className="add-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

          </div>

          {/* BUY NOW */}

          <button
            type="button"
            className="buy-now"
            onClick={handleAddToCart}
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
              "Product details are not available."}
          </p>

          <div className="specifications">

            <div>
              <span>
                Category
              </span>

              <strong>
                {product.category || "N/A"}
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
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"}
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
          ].map((review, index) => (

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

          ))}

        </div>

      </section>

    </main>
  );
};

export default ProductDetails;