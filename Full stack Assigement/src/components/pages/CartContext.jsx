import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });


  // Save cart
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);


  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (
    product,
    quantity = 1,
    size = "Large",
    color = null
  ) => {

    setCart((oldCart) => {

      const existingProduct = oldCart.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );


      // Already exists
      if (existingProduct) {

        return oldCart.map((item) => {

          if (
            item.id === product.id &&
            item.size === size &&
            item.color === color
          ) {

            return {
              ...item,
              quantity:
                item.quantity + quantity,
            };

          }

          return item;

        });

      }


      // New product
      return [
        ...oldCart,

        {
          ...product,
          quantity,
          size,
          color,
        },
      ];

    });

  };


  // =========================
  // REMOVE
  // =========================

  const removeFromCart = (
    id,
    size,
    color
  ) => {

    setCart((oldCart) =>
      oldCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );

  };


  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = (
    id,
    size,
    color,
    quantity
  ) => {

    if (quantity < 1) return;

    setCart((oldCart) =>
      oldCart.map((item) => {

        if (
          item.id === id &&
          item.size === size &&
          item.color === color
        ) {

          return {
            ...item,
            quantity,
          };

        }

        return item;

      })
    );

  };


  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCart([]);
  };


  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );


  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


// =========================
// USE CART
// =========================

export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};