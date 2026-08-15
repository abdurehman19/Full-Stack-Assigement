import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/pages/CartContext";
import "./Checkout.css";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });


  const [paymentMethod, setPaymentMethod] =
    useState("cash");


  const [orderPlaced, setOrderPlaced] =
    useState(false);


  const delivery = 15;

  const total = cartTotal + delivery;


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // =========================
  // PLACE ORDER
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    setOrderPlaced(true);

    clearCart();

  };


  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0 && !orderPlaced) {

    return (
      <main className="checkout-page">

        <div className="empty-checkout">

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Please add some products before
            going to checkout.
          </p>

          <Link to="/shop">
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }


  // =========================
  // ORDER SUCCESS
  // =========================

  if (orderPlaced) {

    return (
      <main className="checkout-page">

        <div className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for your order.
            We will contact you shortly.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      </main>
    );
  }


  return (
    <main className="checkout-page">


      {/* =========================
          BREADCRUMB
      ========================= */}

      <div className="checkout-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>/</span>

        <Link to="/cart">
          Cart
        </Link>

        <span>/</span>

        <strong>
          Checkout
        </strong>

      </div>



      <h1>
        Checkout
      </h1>



      <div className="checkout-layout">


        {/* =========================
            CHECKOUT FORM
        ========================= */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >


          {/* CUSTOMER INFORMATION */}

          <section className="checkout-section">

            <h2>
              Contact Information
            </h2>


            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="03XX XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

          </section>



          {/* SHIPPING ADDRESS */}

          <section className="checkout-section">

            <h2>
              Shipping Address
            </h2>


            <div className="form-row">

              <div className="form-group">

                <label>
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="House number, street, area"
                value={formData.address}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Postal Code
                </label>

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>



          {/* PAYMENT */}

          <section className="checkout-section">

            <h2>
              Payment Method
            </h2>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="cash"
                checked={
                  paymentMethod === "cash"
                }
                onChange={() =>
                  setPaymentMethod("cash")
                }
              />

              <span>
                Cash on Delivery
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="card"
                checked={
                  paymentMethod === "card"
                }
                onChange={() =>
                  setPaymentMethod("card")
                }
              />

              <span>
                Credit / Debit Card
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="bank"
                checked={
                  paymentMethod === "bank"
                }
                onChange={() =>
                  setPaymentMethod("bank")
                }
              />

              <span>
                Bank Transfer
              </span>

            </label>

          </section>


          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>

        </form>



        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="checkout-summary">

          <h2>
            Your Order
          </h2>


          <div className="checkout-products">

            {cart.map((item) => (

              <div
                className="checkout-product"
                key={`${item.id}-${item.size}-${item.color}`}
              >

                <div className="checkout-product-image">

                  <img
                    src={
                      Array.isArray(item.image)
                        ? item.image[0]
                        : item.image
                    }
                    alt={item.name}
                  />

                  <span>
                    {item.quantity}
                  </span>

                </div>


                <div className="checkout-product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Size: {item.size}
                  </p>

                  <strong>
                    ${(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                </div>

              </div>

            ))}

          </div>


          <div className="checkout-summary-line"></div>


          <div className="checkout-summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>

          </div>


          <div className="checkout-summary-row">

            <span>
              Delivery
            </span>

            <strong>
              ${delivery.toFixed(2)}
            </strong>

          </div>


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>

        </aside>

      </div>

    </main>
  );
};

export default Checkout;