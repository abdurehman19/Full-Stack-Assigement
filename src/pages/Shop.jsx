import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

const API_URL = "https://full-stack-assignment-backend.vercel.app/api/products";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Products load nahi huay."
          );
        }

        setProducts(data.products || data || []);
      } catch (err) {
        console.error("Shop products error:", err);

        setError(
          err.message || "Products load nahi ho sakay."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Shorts",
  ];

  // =========================
  // COLORS
  // =========================

  const colors = [
    { name: "Green", value: "#008000" },
    { name: "Red", value: "#ff0000" },
    { name: "Yellow", value: "#ffd700" },
    { name: "Orange", value: "#ff7a00" },
    { name: "Blue", value: "#0066ff" },
    { name: "Purple", value: "#8b00ff" },
    { name: "Pink", value: "#ff69b4" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
  ];

  // =========================
  // SIZES
  // =========================

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  // =========================
  // COLOR FILTER
  // =========================

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );

    setCurrentPage(1);
  };

  // =========================
  // SIZE FILTER
  // =========================

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );

    setCurrentPage(1);
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // Price
    result = result.filter(
      (product) =>
        Number(product.price) <= maxPrice
    );

    // Color
    if (selectedColors.length > 0) {
      result = result.filter((product) => {
        if (!Array.isArray(product.colors)) {
          return false;
        }

        return product.colors.some((color) =>
          selectedColors.some(
            (selectedColor) =>
              color.toLowerCase() ===
              selectedColor.toLowerCase()
          )
        );
      });
    }

    // Size
    if (selectedSizes.length > 0) {
      result = result.filter((product) => {
        if (!Array.isArray(product.sizes)) {
          return false;
        }

        return product.sizes.some((size) =>
          selectedSizes.includes(size)
        );
      });
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "Rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedColors,
    selectedSizes,
    maxPrice,
    sortBy,
  ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedColors([]);
    setSelectedSizes([]);
    setMaxPrice(300);
    setSortBy("Most Popular");
    setCurrentPage(1);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="shop-page">

        <div className="shop-loading">
          <h2>Loading products...</h2>
          <p>Please wait.</p>
        </div>

      </main>
    );
  }

  // =========================
  // API ERROR
  // =========================

  if (error) {
    return (
      <main className="shop-page">

        <div className="no-products">

          <h2>
            Products Load Nahi Huay
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="shop-page">

      {/* =========================
          BREADCRUMB
      ========================= */}

      <div className="shop-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>/</span>

        <strong>
          Shop
        </strong>

      </div>


      {/* =========================
          SHOP LAYOUT
      ========================= */}

      <div className="shop-layout">

        {/* =========================
            FILTER SIDEBAR
        ========================= */}

        <aside className="shop-filters">

          <div className="filter-title-row">

            <h3>
              Filters
            </h3>

            <button
              onClick={clearFilters}
              className="clear-filter"
            >
              Clear
            </button>

          </div>


          {/* Categories */}

          <div className="filter-section">

            <h4>
              Categories
            </h4>

            {categories.map((category) => (

              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "filter-category active"
                    : "filter-category"
                }
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >

                <span>
                  {category}
                </span>

                <span>
                  ›
                </span>

              </button>

            ))}

          </div>


          {/* Price */}

          <div className="filter-section">

            <h4>
              Price
            </h4>

            <div className="price-values">

              <span>
                $0
              </span>

              <span>
                ${maxPrice}
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(
                  Number(e.target.value)
                );

                setCurrentPage(1);
              }}
              className="price-range"
            />

          </div>


          {/* Colors */}

          <div className="filter-section">

            <h4>
              Colors
            </h4>

            <div className="color-filter-grid">

              {colors.map((color) => (

                <button
                  key={color.name}
                  title={color.name}
                  className={
                    selectedColors.includes(
                      color.value
                    )
                      ? "filter-color selected"
                      : "filter-color"
                  }
                  style={{
                    backgroundColor:
                      color.value,
                  }}
                  onClick={() =>
                    toggleColor(
                      color.value
                    )
                  }
                />

              ))}

            </div>

          </div>


          {/* Sizes */}

          <div className="filter-section">

            <h4>
              Size
            </h4>

            <div className="size-filter-grid">

              {sizes.map((size) => (

                <button
                  key={size}
                  className={
                    selectedSizes.includes(size)
                      ? "filter-size selected"
                      : "filter-size"
                  }
                  onClick={() =>
                    toggleSize(size)
                  }
                >
                  {size}
                </button>

              ))}

            </div>

          </div>


          {/* Dress Style */}

          <div className="filter-section">

            <h4>
              Dress Style
            </h4>

            <button className="dress-style">
              Casual
              <span>›</span>
            </button>

            <button className="dress-style">
              Formal
              <span>›</span>
            </button>

            <button className="dress-style">
              Party
              <span>›</span>
            </button>

            <button className="dress-style">
              Gym
              <span>›</span>
            </button>

          </div>


          <button
            className="apply-filter"
            onClick={() =>
              setCurrentPage(1)
            }
          >
            Apply Filter
          </button>

        </aside>


        {/* =========================
            PRODUCTS AREA
        ========================= */}

        <section className="shop-products">

          {/* Header */}

          <div className="shop-heading">

            <div>

              <h1>
                {selectedCategory === "All"
                  ? "Shop"
                  : selectedCategory}
              </h1>

              <p>

                {filteredProducts.length === 0
                  ? "0 Products"
                  : `Showing ${
                      startIndex + 1
                    }-${Math.min(
                      startIndex +
                        productsPerPage,
                      filteredProducts.length
                    )} of ${
                      filteredProducts.length
                    } Products`}

              </p>

            </div>


            {/* Sort */}

            <div className="sort-box">

              <span>
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              >

                <option>
                  Most Popular
                </option>

                <option>
                  Price: Low to High
                </option>

                <option>
                  Price: High to Low
                </option>

                <option>
                  Rating
                </option>

              </select>

            </div>

          </div>


          {/* Product Grid */}

          {visibleProducts.length > 0 ? (

            <div className="shop-product-grid">

              {visibleProducts.map(
                (product) => {

                  const productId =
                    product._id ||
                    product.id;

                  const image =
                    Array.isArray(
                      product.image
                    )
                      ? product.image[0]
                      : product.image;

                  return (

                    <Link
                      to={`/product/${productId}`}
                      className="shop-product-card"
                      key={productId}
                    >

                      <div className="shop-product-image">

                        <img
                          src={image}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      </div>


                      <h3>
                        {product.name}
                      </h3>


                      <div className="shop-rating">

                        <span>
                          ★★★★★
                        </span>

                        <small>
                          {product.rating || 0}/5
                        </small>

                        <small>
                          ({product.reviews || 0})
                        </small>

                      </div>


                      <div className="shop-price">

                        <strong>
                          ${product.price}
                        </strong>

                        {product.oldPrice && (
                          <del>
                            ${product.oldPrice}
                          </del>
                        )}

                        {product.discount && (
                          <span>
                            {String(
                              product.discount
                            ).includes("%")
                              ? product.discount
                              : `-${product.discount}%`}
                          </span>
                        )}

                      </div>

                    </Link>

                  );
                }
              )}

            </div>

          ) : (

            <div className="no-products">

              <h2>
                No Products Found
              </h2>

              <p>
                Try changing your filters.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}


          {/* Pagination */}

          {totalPages > 1 && (

            <div className="pagination">

              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
              >
                ← Previous
              </button>


              <div className="page-numbers">

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (

                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "page active"
                        : "page"
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>

                ))}

              </div>


              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
              >
                Next →
              </button>

            </div>

          )}

        </section>

      </div>

    </main>
  );
};

export default Shop;