import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlistItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== product.id
        )
      );

      toast.info(
        `${product.name} removed from wishlist`
      );
    } else {
      setWishlistItems((previousItems) => [
        ...previousItems,
        product,
      ]);

      toast.success(
        `${product.name} added to wishlist!`
      );
    }
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};