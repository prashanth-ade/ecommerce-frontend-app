import products from "../data/products";

// Get all products
export const getAllProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

// Get product by ID
export const getProductById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(
        (item) => item.id === Number(id)
      );

      resolve(product);
    }, 500);
  });
};