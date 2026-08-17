import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/pages/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart</h1>

          <p>Your cart is currently empty.</p>

          <Link to="/shop">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // DELIVERY
  // =========================

  const delivery = 15;
  const total = cartTotal + delivery;

  return (
    <main className="cart-page">

      {/* =========================
          BREADCRUMB
      ========================= */}

      <div className="cart-breadcrumb">
        <Link to="/">
          Home
        </Link>

        <span>/</span>

        <strong>
          Cart
        </strong>
      </div>

      {/* =========================
          TITLE
      ========================= */}

      <h1>
        Your Cart
      </h1>

      {/* =========================
          CART LAYOUT
      ========================= */}

      <div className="cart-layout">

        {/* =========================
            PRODUCTS
        ========================= */}

        <section className="cart-items">

          {cartItems.map((item) => {

            const itemId = item.id || item._id;

            return (
              <div
                className="cart-item"
                key={`${itemId}-${item.selectedSize}-${item.selectedColor}`}
              >

                {/* IMAGE */}

                <div className="cart-item-image">

                  <img
                    src={
                      Array.isArray(item.image)
                        ? item.image[0]
                        : item.image
                    }
                    alt={item.name}
                  />

                </div>

                {/* INFORMATION */}

                <div className="cart-item-info">

                  <h2>
                    {item.name}
                  </h2>

                  {/* SIZE */}

                  {item.selectedSize && (
                    <p>
                      Size:{" "}
                      <strong>
                        {item.selectedSize}
                      </strong>
                    </p>
                  )}

                  {/* COLOR */}

                  {item.selectedColor && (
                    <p className="cart-color-row">

                      Color:

                      <span
                        className="cart-color"
                        style={{
                          backgroundColor:
                            item.selectedColor,
                        }}
                      />

                    </p>
                  )}

                  {/* PRICE */}

                  <strong className="cart-item-price">
                    ${Number(item.price || 0).toFixed(2)}
                  </strong>

                  {/* BOTTOM */}

                  <div className="cart-bottom">

                    {/* QUANTITY */}

                    <div className="cart-quantity">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            itemId,
                            item.quantity - 1,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            itemId,
                            item.quantity + 1,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      className="remove-cart"
                      onClick={() =>
                        removeFromCart(
                          itemId,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

          {/* CLEAR CART */}

          <button
            type="button"
            className="clear-cart"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </section>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="cart-summary">

          <h2>
            Order Summary
          </h2>

          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>

          </div>

          {/* DELIVERY */}

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong>
              ${delivery.toFixed(2)}
            </strong>

          </div>

          <div className="summary-line" />

          {/* TOTAL */}

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>

          {/* CHECKOUT */}

          <button
            type="button"
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Go to Checkout →
          </button>

        </aside>

      </div>

    </main>
  );
};

export default Cart;