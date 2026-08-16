import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../components/pages/CartContext";
import "./ProductDetails.css";

const API_URL = "http://localhost:5000/api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // =========================
  // LOAD PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        const productData = data.product || data;

        setProduct(productData);

        // First color automatically select
        if (
          Array.isArray(productData.colors) &&
          productData.colors.length > 0
        ) {
          setSelectedColor(productData.colors[0]);
        }

        // First size if Large doesn't exist
        if (
          Array.isArray(productData.sizes) &&
          productData.sizes.length > 0 &&
          !productData.sizes.includes("Large")
        ) {
          setSelectedSize(productData.sizes[0]);
        }
      } catch (err) {
        console.error("Product details error:", err);
        setError(
          err.message || "Product load nahi ho saka."
        );
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
        <h2>Loading product...</h2>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !product) {
    return (
      <main className="product-page">

        <h2>Product Not Found</h2>

        <p>
          {error || "Product available nahi hai."}
        </p>

        <Link to="/shop">
          Back to Shop
        </Link>

      </main>
    );
  }

  // =========================
  // IMAGES
  // =========================

  const images = Array.isArray(product.image)
    ? product.image
    : product.image
      ? [product.image]
      : [];

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,

      // MongoDB _id ko Cart ke id mein convert
      id: product._id,

      image: images,
    };

    addToCart(
      cartProduct,
      quantity,
      selectedSize,
      selectedColor
    );

    alert("Product added to cart! 🛒");
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

        <Link to="/shop">
          Shop
        </Link>

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
            GALLERY
        ========================= */}

        <div className="product-gallery">

          <div className="product-thumbnails">

            {images.map((image, index) => (

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

            ))}

          </div>

          <div className="product-main-image">

            {images.length > 0 ? (

              <img
                src={images[selectedImage]}
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

          {/* Rating */}

          <div className="product-rating">

            <span className="stars">
              ★★★★★
            </span>

            <span>
              {product.rating || 0}/5
            </span>

            <span>
              ({product.reviews || 0} Reviews)
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
                -{product.discount}%
              </span>
            )}

          </div>

          {/* Description */}

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-divider" />

          {/* =========================
              COLOR
          ========================= */}

          {Array.isArray(product.colors) &&
            product.colors.length > 0 && (

              <div className="product-option">

                <h4>
                  Select Color
                </h4>

                <div className="color-options">

                  {product.colors.map(
                    (color, index) => (

                      <button
                        key={index}
                        type="button"
                        title={color}
                        className={
                          selectedColor === color
                            ? "color selected"
                            : "color"
                        }
                        style={{
                          backgroundColor: color,
                        }}
                        onClick={() =>
                          setSelectedColor(color)
                        }
                      />

                    )
                  )}

                </div>

              </div>

            )}

          {/* =========================
              SIZE
          ========================= */}

          {Array.isArray(product.sizes) &&
            product.sizes.length > 0 && (

              <div className="product-option">

                <h4>
                  Choose Size
                </h4>

                <div className="size-options">

                  {product.sizes.map((size) => (

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

            <button
              type="button"
              className="add-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default ProductDetails;