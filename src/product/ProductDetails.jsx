import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../pages/useCart";
import "./ProductDetails.css";

const API_URL = "https://full-stack-assignment-backend.vercel.app/api/products";

const reviewsData = [
  {
    name: "Samantha D.",
    rating: 5,
    text: "Absolutely love this product! The quality is amazing and the fit is perfect. I would definitely recommend it.",
    date: "August 14, 2026",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: "The fabric feels really good and the product looks exactly like the pictures. Very happy with my purchase.",
    date: "August 12, 2026",
  },
  {
    name: "Ethan R.",
    rating: 4,
    text: "Great quality and comfortable fitting. The color is also exactly what I expected.",
    date: "August 10, 2026",
  },
  {
    name: "Olivia H.",
    rating: 5,
    text: "Really happy with the design. It looks premium and feels comfortable throughout the day.",
    date: "August 8, 2026",
  },
  {
    name: "Liam K.",
    rating: 5,
    text: "One of my favorite purchases recently. Good quality material and excellent fitting.",
    date: "August 6, 2026",
  },
  {
    name: "Ava R.",
    rating: 4,
    text: "Very nice product. Shipping was quick and the item arrived exactly as described.",
    date: "August 4, 2026",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState("details");
  const [visibleReviews, setVisibleReviews] = useState(4);


  // ==========================================
  // FETCH PRODUCT
  // ==========================================

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

        if (
          Array.isArray(fetchedProduct.sizes) &&
          fetchedProduct.sizes.length > 0
        ) {
          setSelectedSize(fetchedProduct.sizes[0]);
        } else {
          setSelectedSize("");
        }

        setSelectedImage(0);
        setSelectedColor(0);
        setQuantity(1);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Product load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // FETCH RELATED PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setRelatedLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Related products could not be loaded");
        }

        const data = await response.json();

        let products = [];

        if (Array.isArray(data)) {
          products = data;
        } else if (Array.isArray(data.products)) {
          products = data.products;
        } else if (Array.isArray(data.data)) {
          products = data.data;
        }

        const filteredProducts = products
          .filter(
            (item) =>
              String(item._id || item.id) !== String(id)
          )
          .slice(0, 4);

        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.error("Related products error:", err);
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  // ==========================================
  // PRODUCT DATA
  // ==========================================

  const images = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.image)) {
      return product.image.filter(Boolean);
    }

    if (product.image) {
      return [product.image];
    }

    return [];
  }, [product]);

  const colors = useMemo(() => {
    if (!product || !Array.isArray(product.colors)) {
      return [];
    }

    return product.colors;
  }, [product]);

  const sizes = useMemo(() => {
    if (!product || !Array.isArray(product.sizes)) {
      return [];
    }

    return product.sizes;
  }, [product]);

  const currentImage =
    images[selectedImage] || images[0] || "";

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {
    if (!product) return;

    const selectedColorValue =
      colors[selectedColor] || "";

    const cartProduct = {
      ...product,
      id: product._id,
      image: images,
    };

    addToCart(
      cartProduct,
      quantity,
      selectedSize,
      selectedColorValue
    );

    alert("Product added to cart!");
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {
    if (!product) return;

    const selectedColorValue =
      colors[selectedColor] || "";

    const cartProduct = {
      ...product,
      id: product._id,
      image: images,
    };

    addToCart(
      cartProduct,
      quantity,
      selectedSize,
      selectedColorValue
    );

    window.location.href = "/cart";
  };

  // ==========================================
  // QUANTITY
  // ==========================================

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="product-page">
        <div className="product-loading">
          <div className="loading-spinner" />
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !product) {
    return (
      <main className="product-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>

          <p>
            {error || "This product does not exist."}
          </p>

          <Link to="/shop">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-page">

      {/* ======================================
          BREADCRUMB
      ====================================== */}

      <div className="product-container">
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
            {product.category || "Products"}
          </span>

          <span>/</span>

          <strong>
            {product.name}
          </strong>

        </div>
      </div>

      {/* ======================================
          PRODUCT MAIN
      ====================================== */}

      <section className="product-main product-container">

        {/* GALLERY */}

        <div className="product-gallery">

          <div className="product-thumbnails">

            {images.length > 0 ? (
              images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
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

        {/* PRODUCT INFORMATION */}

        <div className="product-info">

          <h1>
            {product.name}
          </h1>

          {/* RATING */}

          <div className="product-rating">

            <span className="stars">
              ★★★★★
            </span>

            <strong>
              {product.rating || "4.5"}/5
            </strong>

            <span className="review-count">
              ({product.reviews || 451} Reviews)
            </span>

          </div>

          {/* PRICE */}

          <div className="product-price">

            <strong>
              ${Number(product.price || 0).toFixed(2)}
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
              "This premium product is designed for comfort, quality and everyday style."}
          </p>

          <div className="product-divider" />

          {/* COLOR */}

          {colors.length > 0 && (
            <div className="product-option">

              <h4>
                Select Color
              </h4>

              <div className="color-options">

                {colors.map((color, index) => (
                  <button
                    key={`${color}-${index}`}
                    type="button"
                    aria-label={`Select ${color}`}
                    title={color}
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

          {/* SIZE */}

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

          {/* CART */}

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

          <button
            type="button"
            className="buy-now"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>
      </section>

      {/* ======================================
          TABS
      ====================================== */}

      <section className="product-tabs product-container">

        <div className="tabs-header">

          <button
            type="button"
            className={
              activeTab === "details"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("details")
            }
          >
            Product Details
          </button>

          <button
            type="button"
            className={
              activeTab === "reviews"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("reviews")
            }
          >
            Rating & Reviews
          </button>

          <button
            type="button"
            className={
              activeTab === "faqs"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("faqs")
            }
          >
            FAQs
          </button>

        </div>

        {/* DETAILS */}

        {activeTab === "details" && (
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
                  {product.material || "100% Cotton"}
                </strong>
              </div>

              <div>
                <span>
                  Fit
                </span>

                <strong>
                  {product.fit || "Regular Fit"}
                </strong>
              </div>

              <div>
                <span>
                  Availability
                </span>

                <strong>
                  {product.stock > 0
                    ? `${product.stock} In Stock`
                    : "In Stock"}
                </strong>
              </div>

            </div>

          </div>
        )}

        {/* REVIEWS */}

        {activeTab === "reviews" && (
          <div className="tab-reviews">

            <div className="reviews-heading">

              <div>
                <h2>
                  All Reviews
                </h2>

                <span>
                  {product.reviews || 451} Reviews
                </span>
              </div>

              <div className="review-actions">

                <button
                  type="button"
                  className="filter-button"
                >
                  Filter
                </button>

                <button
                  type="button"
                  className="write-review"
                >
                  Write a Review
                </button>

              </div>

            </div>

            <div className="reviews-grid">

              {reviewsData
                .slice(0, visibleReviews)
                .map((review, index) => (
                  <div
                    className="review-card"
                    key={index}
                  >

                    <div className="review-card-top">

                      <div className="review-stars">
                        {"★".repeat(review.rating)}
                      </div>

                      <button
                        type="button"
                        className="review-menu"
                      >
                        ⋯
                      </button>

                    </div>

                    <strong className="review-name">
                      {review.name}
                      <span className="verified">
                        ✓
                      </span>
                    </strong>

                    <p>
                      {review.text}
                    </p>

                    <small>
                      Posted on {review.date}
                    </small>

                  </div>
                ))}

            </div>

            {visibleReviews < reviewsData.length && (
              <button
                type="button"
                className="load-more"
                onClick={() =>
                  setVisibleReviews(
                    (current) =>
                      current + 2
                  )
                }
              >
                Load More Reviews
              </button>
            )}

          </div>
        )}

        {/* FAQ */}

        {activeTab === "faqs" && (
          <div className="faq-content">

            <div className="faq-item">
              <h3>
                What material is this product made from?
              </h3>

              <p>
                This product is made from high-quality
                comfortable fabric suitable for everyday use.
              </p>
            </div>

            <div className="faq-item">
              <h3>
                How do I choose the correct size?
              </h3>

              <p>
                Please select your usual size. You can also
                use the Size Guide before placing your order.
              </p>
            </div>

            <div className="faq-item">
              <h3>
                Can I return this product?
              </h3>

              <p>
                Returns are accepted according to the store's
                return policy.
              </p>
            </div>

          </div>
        )}

      </section>

      {/* ======================================
          REVIEWS PREVIEW
      ====================================== */}

      {activeTab !== "reviews" && (
        <section className="reviews-section product-container">

          <div className="reviews-heading">

            <div>
              <h2>
                All Reviews
              </h2>

              <span>
                {product.reviews || 451} Reviews
              </span>
            </div>

            <button
              type="button"
              className="write-review"
              onClick={() =>
                setActiveTab("reviews")
              }
            >
              View Reviews
            </button>

          </div>

          <div className="reviews-grid">

            {reviewsData
              .slice(0, 4)
              .map((review, index) => (
                <div
                  className="review-card"
                  key={index}
                >

                  <div className="review-card-top">

                    <div className="review-stars">
                      {"★".repeat(review.rating)}
                    </div>

                    <span className="review-menu">
                      ⋯
                    </span>

                  </div>

                  <strong className="review-name">
                    {review.name}

                    <span className="verified">
                      ✓
                    </span>
                  </strong>

                  <p>
                    {review.text}
                  </p>

                  <small>
                    Posted on {review.date}
                  </small>

                </div>
              ))}

          </div>

          <button
            type="button"
            className="load-more"
            onClick={() =>
              setActiveTab("reviews")
            }
          >
            Load More Reviews
          </button>

        </section>
      )}

      {/* ======================================
          YOU MIGHT ALSO LIKE
      ====================================== */}

      <section className="related-section product-container">

        <h2>
          YOU MIGHT ALSO LIKE
        </h2>

        {relatedLoading ? (
          <div className="related-loading">
            Loading products...
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="related-grid">

            {relatedProducts.map((item) => {

              const relatedImage = Array.isArray(item.image)
                ? item.image[0]
                : item.image;

              return (
                <Link
                  to={`/product/${item._id || item.id}`}
                  className="related-card"
                  key={item._id || item.id}
                >

                  <div className="related-image">

                    {relatedImage ? (
                      <img
                        src={relatedImage}
                        alt={item.name}
                      />
                    ) : (
                      <div>
                        No Image
                      </div>
                    )}

                  </div>

                  <h3>
                    {item.name}
                  </h3>

                  <div className="related-rating">
                    <span>
                      ★★★★★
                    </span>

                    <small>
                      {item.rating || "4.5"}/5
                    </small>
                  </div>

                  <strong className="related-price">
                    ${Number(item.price || 0).toFixed(2)}
                  </strong>

                </Link>
              );
            })}

          </div>
        ) : (
          <p className="no-related">
            No related products available.
          </p>
        )}

      </section>

      {/* ======================================
          NEWSLETTER
      ====================================== */}

     

      {/* ======================================
          FOOTER
      ====================================== */}

     

    </main>
  );
};

export default ProductDetails;