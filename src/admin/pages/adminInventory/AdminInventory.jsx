import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import products from "../../../data/products";
import "./AdminInventory.css";

const AdminInventory = () => {
  const navigate = useNavigate();

  const [allproduct, setAllProduct] = useState([]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      toast.error("Please login as admin");
      navigate("/admin/login");
      return;
    }

    const storedProducts = JSON.parse(
      localStorage.getItem("allproduct") || "null"
    );

    const productList = Array.isArray(storedProducts)
      ? storedProducts
      : products;

    const productsWithStock = productList.map((product) => ({
      ...product,
      stock:
        product.stock !== undefined
          ? product.stock
          : 10,
    }));

    setAllProduct(productsWithStock);

    localStorage.setItem(
      "allproduct",
      JSON.stringify(productsWithStock)
    );
  }, [navigate]);

  const updateStock = (id, change) => {
    const updatedProducts = allproduct.map((product) => {
      if (product.id === id) {
        const newStock = Math.max(
          0,
          Number(product.stock) + change
        );

        return {
          ...product,
          stock: newStock,
        };
      }

      return product;
    });

    setAllProduct(updatedProducts);

    localStorage.setItem(
      "allproduct",
      JSON.stringify(updatedProducts)
    );

    toast.success("Stock updated successfully");
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return "Out of Stock";
    }

    if (stock <= 5) {
      return "Low Stock";
    }

    return "In Stock";
  };

  const totalStock = allproduct.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const outOfStock = allproduct.filter(
    (product) => Number(product.stock) === 0
  ).length;

  const lowStock = allproduct.filter(
    (product) =>
      Number(product.stock) > 0 &&
      Number(product.stock) <= 5
  ).length;

  return (
    <div className="admin-inventory-page">

      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Manage product stock</p>
        </div>

        <button
          className="inventory-dashboard-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Dashboard
        </button>
      </div>

      {/* Inventory Statistics */}

      <div className="inventory-stats">

        <div className="inventory-stat-card">
          <h3>Total Products</h3>
          <strong>{allproduct.length}</strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Total Stock</h3>
          <strong>{totalStock}</strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Low Stock</h3>
          <strong>{lowStock}</strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Out of Stock</h3>
          <strong>{outOfStock}</strong>
        </div>

      </div>

      {/* Inventory Table */}

      <div className="inventory-table-container">

        <table className="inventory-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {allproduct.map((product) => {

              const stock = Number(product.stock || 0);

              return (
                <tr key={product.id}>

                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="inventory-product-image"
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>
                    <strong>{stock}</strong>
                  </td>

                  <td>
                    <span
                      className={`stock-status ${
                        stock === 0
                          ? "out-stock"
                          : stock <= 5
                          ? "low-stock"
                          : "in-stock"
                      }`}
                    >
                      {getStockStatus(stock)}
                    </span>
                  </td>

                  <td className="stock-actions">

                    <button
                      className="stock-minus-btn"
                      onClick={() =>
                        updateStock(product.id, -1)
                      }
                      disabled={stock === 0}
                    >
                      −
                    </button>

                    <button
                      className="stock-plus-btn"
                      onClick={() =>
                        updateStock(product.id, 1)
                      }
                    >
                      +
                    </button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminInventory;