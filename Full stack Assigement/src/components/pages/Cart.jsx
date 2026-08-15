import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/pages/CartContext";
import "./Cart.css";

const Cart = () => {

  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();


  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {

    return (
      <main className="cart-page">

        <div className="empty-cart">

          <h1>
            Your Cart
          </h1>

          <p>
            Your cart is currently empty.
          </p>

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


          {cart.map((item) => (

            <div
              className="cart-item"
              key={`${item.id}-${item.size}-${item.color}`}
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


                <p>
                  Size:{" "}
                  <strong>
                    {item.size}
                  </strong>
                </p>


                <p className="cart-color-row">

                  Color:

                  <span
                    className="cart-color"
                    style={{
                      backgroundColor:
                        item.color || "#000",
                    }}
                  />

                </p>


                <strong className="cart-item-price">
                  ${Number(item.price).toFixed(2)}
                </strong>



                {/* BOTTOM */}

                <div className="cart-bottom">


                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.color,
                          item.quantity - 1
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
                          item.id,
                          item.size,
                          item.color,
                          item.quantity + 1
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
                        item.id,
                        item.size,
                        item.color
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}



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



          <div className="summary-line"></div>



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
            onClick={() =>
              navigate("/checkout")
            }
          >
            Go to Checkout →
          </button>

        </aside>

      </div>

    </main>
  );
};

export default Cart;