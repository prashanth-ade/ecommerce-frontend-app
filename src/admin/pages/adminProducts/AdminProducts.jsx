import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/products";

import "./AdminProducts.css";

const AdminProducts = () => {
  const navigate = useNavigate();

  // Product list
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Men",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    stock: 10,
  });


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load products:", error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

 
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  const resetForm = () => {
    setFormData({
      name: "",
      category: "Men",
      price: "",
      oldPrice: "",
      image: "",
      description: "",
      stock: 10,
    });

    setEditingProduct(null);
    setShowForm(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Data sent to Spring Boot
      const productData = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice),
        image: formData.image,
        description: formData.description,
        stock: Number(formData.stock),
      };

      // UPDATE PRODUCT
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          productData
        );

        toast.success("Product updated successfully");
      }

      // ADD PRODUCT
      else {
        await addProduct(productData);

        toast.success("Product added successfully");
      }

      // Reload products from MySQL
      await loadProducts();

      // Close form
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);

      toast.error("Failed to save product");
    }
  };


  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "Men",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      image: product.image || "",
      description: product.description || "",
      stock: product.stock ?? 10,
    });

    setShowForm(true);

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      // Reload products from MySQL
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);

      toast.error("Failed to delete product");
    }
  };


  return (
    <div className="admin-products-page">

      {/* HEADER */}
      <div className="admin-products-header">

        <div>
          <h1>Product Management</h1>

          <p>
            Manage your ecommerce products
          </p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Dashboard
        </button>

      </div>

      {/* ACTIONS */}
      <div className="product-actions">

        <button
          className="add-product-btn"
          onClick={() => {
            setEditingProduct(null);

            setFormData({
              name: "",
              category: "Men",
              price: "",
              oldPrice: "",
              image: "",
              description: "",
              stock: 10,
            });

            setShowForm(true);
          }}
        >
          + Add Product
        </button>

      </div>

      {/* -------------------------------- */}
      {/* PRODUCT FORM */}
      {/* -------------------------------- */}

      {showForm && (

        <div className="product-form-container">

          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="product-form-grid">

              {/* PRODUCT NAME */}

              <div className="admin-form-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />

              </div>

              {/* CATEGORY */}

              <div className="admin-form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option value="Men">
                    Men
                  </option>

                  <option value="Women">
                    Women
                  </option>

                  <option value="Kids">
                    Kids
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Mobiles">
                    Mobiles
                  </option>

                  <option value="Furniture">
                    Furniture
                  </option>

                  <option value="Kitchen">
                    Kitchen
                  </option>

                </select>

              </div>

              {/* PRICE */}

              <div className="admin-form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                />

              </div>

              {/* OLD PRICE */}

              <div className="admin-form-group">

                <label>
                  Old Price
                </label>

                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="Enter old price"
                  min="0"
                />

              </div>

              {/* STOCK */}

              <div className="admin-form-group">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  min="0"
                  required
                />

              </div>

              {/* IMAGE */}

              <div className="admin-form-group">

                <label>
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div className="admin-form-group">

                <label>
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />

              </div>

            </div>

            {/* FORM BUTTONS */}

            <div className="product-form-buttons">

              <button
                type="submit"
                className="save-product-btn"
              >
                {editingProduct
                  ? "Update Product"
                  : "Add Product"}
              </button>

              <button
                type="button"
                className="cancel-product-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

      {/* -------------------------------- */}
      {/* PRODUCTS TABLE */}
      {/* -------------------------------- */}

      <div className="products-table-container">

        {loading ? (

          <p className="loading-message">
            Loading products...
          </p>

        ) : products.length === 0 ? (

          <p className="empty-products-message">
            No products found.
          </p>

        ) : (

          <table className="products-table">

            <thead>

              <tr>

                <th>
                  Image
                </th>

                <th>
                  Name
                </th>

                <th>
                  Category
                </th>

                <th>
                  Price
                </th>

                <th>
                  Old Price
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  {/* IMAGE */}

                  <td>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-product-image"
                    />

                  </td>

                  {/* NAME */}

                  <td>
                    {product.name}
                  </td>

                  {/* CATEGORY */}

                  <td>
                    {product.category}
                  </td>

                  {/* PRICE */}

                  <td>
                    ₹{product.price}
                  </td>

                  {/* OLD PRICE */}

                  <td>
                    ₹{product.oldPrice || 0}
                  </td>

                  {/* STOCK */}

                  <td>
                    {product.stock ?? 0}
                  </td>

                  {/* ACTIONS */}

                  <td className="product-actions-cell">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default AdminProducts;