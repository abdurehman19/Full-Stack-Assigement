import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./AdminProducts.css";

const API_URL = "https://full-stack-assignment-backend.vercel.app/admin/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ==============================
  // LOAD PRODUCTS
  // ==============================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      alert("Products load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(loadProducts);
  }, []);


  // ==============================
  // CATEGORIES
  // ==============================

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [products]);


  // ==============================
  // SEARCH + CATEGORY FILTER
  // ==============================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);


  // ==============================
  // DELETE
  // ==============================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap ye product delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setProducts((prev) =>
        prev.filter(
          (product) => product._id !== id
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="admin-products-page">

        <div className="admin-loading">
          <h2>Loading products...</h2>
        </div>

      </main>
    );
  }


  return (
    <main className="admin-products-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-products-header">

        <div>
          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Products</h1>

          <p className="admin-description">
            Manage your SHOP.CO products.
          </p>
        </div>


        <Link
          to="/admin/products/new"
          className="add-product-btn"
        >
          <FiPlus />
          Add Product
        </Link>

      </div>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="products-toolbar">

        <div className="admin-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </div>


        <select
          className="category-filter"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>


      {/* =========================
          RESULT INFO
      ========================= */}

      <div className="products-result-info">

        <span>
          {filteredProducts.length} products
        </span>

        {(search || category !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        )}

      </div>


      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="admin-products-table">

        <div className="table-header">

          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Actions</span>

        </div>


        {filteredProducts.length === 0 ? (

          <div className="empty-products">

            <div className="empty-icon">
              🔍
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="product-row"
              key={product._id}
            >

              {/* PRODUCT */}

              <div className="admin-product-info">

                <div className="admin-product-image">

                  <img
                    src={
                      Array.isArray(product.image)
                        ? product.image[0]
                        : product.image
                    }
                    alt={product.name}
                  />

                </div>


                <div className="admin-product-name">

                  <strong>
                    {product.name}
                  </strong>

                  <small>
                    ID: {product._id}
                  </small>

                </div>

              </div>


              {/* CATEGORY */}

              <span className="product-category">
                {product.category}
              </span>


              {/* PRICE */}

              <strong className="product-price">
                ${product.price}
              </strong>


              {/* STOCK */}

              <span
                className={
                  product.stock > 0
                    ? "stock available"
                    : "stock out"
                }
              >
                {product.stock > 0
                  ? `${product.stock} left`
                  : "Out of stock"}
              </span>


              {/* ACTIONS */}

              <div className="product-actions">

                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="edit-btn"
                  title="Edit product"
                >
                  <FiEdit2 />
                  Edit
                </Link>


                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  title="Delete product"
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
};

export default AdminProducts;