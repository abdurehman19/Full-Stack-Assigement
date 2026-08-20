import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdminProductForm.css";

const API_URL = "https://full-stack-assignment-backend.vercel.app/api/products";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    discount: "",
    rating: "0",
    reviews: "0",
    description: "",
    image: "",
    colors: "",
    sizes: "",
    stock: "0",
  });

  // ==============================
  // LOAD PRODUCT FOR EDIT
  // ==============================

  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        const product = data.product || data;

        setForm({
          name: product.name || "",
          category: product.category || "",
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          discount: product.discount ?? "",
          rating: product.rating ?? "0",
          reviews: product.reviews ?? "0",
          description: product.description || "",

          image: Array.isArray(product.image)
            ? product.image.join("\n")
            : product.image || "",

          colors: Array.isArray(product.colors)
            ? product.colors.join(", ")
            : "",

          sizes: Array.isArray(product.sizes)
            ? product.sizes.join(", ")
            : "",

          stock: product.stock ?? "0",
        });
      } catch (error) {
        console.error("Load product error:", error);

        alert(
          error.message || "Product load nahi ho saka."
        );

        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEdit, navigate]);

  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ------------------------------
    // VALIDATION
    // ------------------------------

    if (!form.name.trim()) {
      alert("Product name required hai.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category required hai.");
      return;
    }

    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {
      alert("Valid price enter karo.");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("Stock 0 ya us se zyada hona chahiye.");
      return;
    }

    // ------------------------------
    // PREPARE DATA
    // ------------------------------

    const productData = {
      name: form.name.trim(),

      category: form.category.trim(),

      price: Number(form.price),

      oldPrice:
        form.oldPrice === ""
          ? null
          : Number(form.oldPrice),

      discount:
        form.discount.trim() || null,

      rating:
        Number(form.rating) || 0,

      reviews:
        Number(form.reviews) || 0,

      description:
        form.description.trim(),

      image: form.image
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      colors: form.colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      sizes: form.sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      stock:
        Number(form.stock) || 0,

      isActive: true,
    };

    console.log("PRODUCT DATA:", productData);

    // ------------------------------
    // SAVE
    // ------------------------------

    try {
      setSaving(true);

      const url = isEdit
        ? `${API_URL}/${id}`
        : API_URL;

      const method = isEdit
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Product save nahi ho saka."
        );
      }

      console.log(
        "PRODUCT SAVED:",
        data
      );

      alert(
        isEdit
          ? "Product updated successfully! ✅"
          : "Product created successfully! ✅"
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Save product error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="admin-form-page">

        <div className="admin-loading">
          <h2>Loading product...</h2>
          <p>Please wait.</p>
        </div>

      </main>
    );
  }

  // ==============================
  // FORM
  // ==============================

  return (
    <main className="admin-form-page">

      {/* HEADER */}

      <div className="admin-form-header">

        <div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>
            {isEdit
              ? "Edit Product"
              : "Add Product"}
          </h1>

          <p>
            {isEdit
              ? "Update your product information."
              : "Add a new product to your store."}
          </p>

        </div>

        <Link
          to="/admin/products"
          className="back-products"
        >
          ← Back to Products
        </Link>

      </div>

      {/* FORM */}

      <form
        className="admin-product-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC INFORMATION */}

        <section className="form-section">

          <h2>
            Basic Information
          </h2>

          <div className="form-grid">

            <div className="form-group full">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="T-shirt with Tape Details"
              />

            </div>

            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="T-Shirts"
              />

            </div>

            <div className="form-group">

              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
              />

            </div>

          </div>

        </section>

        {/* PRICING */}

        <section className="form-section">

          <h2>
            Pricing
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="120"
              />

            </div>

            <div className="form-group">

              <label>
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                min="0"
                step="0.01"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="150"
              />

            </div>

            <div className="form-group">

              <label>
                Discount
              </label>

              <input
                type="text"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="20"
              />

            </div>

          </div>

        </section>

        {/* DESCRIPTION */}

        <section className="form-section">

          <h2>
            Description
          </h2>

          <div className="form-group">

            <label>
              Product Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="Write product description..."
            />

          </div>

        </section>

        {/* IMAGES */}

        <section className="form-section">

          <h2>
            Product Images
          </h2>

          <div className="form-group">

            <label>
              Image URLs
            </label>

            <textarea
              name="image"
              value={form.image}
              onChange={handleChange}
              rows="4"
              placeholder={
                "/asstes/product/t-shirt-1.jpeg\n/asstes/product/t-shirt-2.jpeg"
              }
            />

            <small>
              Har image ka URL new line mein likho.
            </small>

          </div>

        </section>

        {/* VARIANTS */}

        <section className="form-section">

          <h2>
            Variants
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Colors
              </label>

              <input
                type="text"
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="#000000, #FFFFFF, #FF0000"
              />

              <small>
                Comma separated.
              </small>

            </div>

            <div className="form-group">

              <label>
                Sizes
              </label>

              <input
                type="text"
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="Small, Medium, Large, X-Large"
              />

              <small>
                Comma separated.
              </small>

            </div>

          </div>

        </section>

        {/* REVIEWS */}

        <section className="form-section">

          <h2>
            Reviews
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Reviews Count
              </label>

              <input
                type="number"
                name="reviews"
                min="0"
                value={form.reviews}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>

        {/* ACTIONS */}

        <div className="form-actions">

          <Link
            to="/admin/products"
            className="cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="save-product-btn"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEdit
                ? "Update Product"
                : "Create Product"}
          </button>

        </div>

      </form>

    </main>
  );
};

export default AdminProductForm;