import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Cart load error:", error);
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (
    product,
    quantity = 1,
    selectedSize = null,
    selectedColor = null
  ) => {
    setCartItems((prevItems) => {
      const productId = product.id || product._id;

      const existingItemIndex = prevItems.findIndex(
        (item) =>
          (item.id || item._id) === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + quantity,
        };

        return updatedItems;
      }

      const newItem = {
        ...product,

        id: productId,

        quantity,

        selectedSize,

        selectedColor,
      };

      return [...prevItems, newItem];
    });
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            (item.id || item._id) === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = (
    id,
    quantity,
    selectedSize,
    selectedColor
  ) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.id || item._id) === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

