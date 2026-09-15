import API from "./api";

export const updateProductStock = async (id, stock) => {
  try {
    const response = await API.put(`/products/${id}/stock`, {
      stock: Number(stock),
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Add product
export const addProduct = async (product) => {
  try {
    const response = await API.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, product) => {
  try {
    const response = await API.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    await API.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};