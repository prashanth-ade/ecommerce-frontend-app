import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminCustomers.css";

const AdminCustomers = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      toast.error("Please login as admin");
      navigate("/admin/login");
      return;
    }

    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const orders = Array.isArray(storedOrders)
      ? storedOrders.filter(Boolean)
      : [];

    const customerMap = new Map();

    orders.forEach((order) => {
      const customer = order.customer;

      if (!customer) return;

      const email = customer.email || "No Email";

      if (!customerMap.has(email)) {
        customerMap.set(email, {
          name:
            `${customer.firstName || ""} ${
              customer.lastName || ""
            }`.trim() || "Unknown Customer",

          email,

          phone: customer.phone || "N/A",

          orders: 0,

          totalSpent: 0,
        });
      }

      const existingCustomer = customerMap.get(email);

      existingCustomer.orders += 1;
      existingCustomer.totalSpent += Number(order.total || 0);
    });

    setCustomers(Array.from(customerMap.values()));
  }, [navigate]);

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.toLowerCase().includes(searchText)
    );
  });

  const totalCustomers = customers.length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  return (
    <div className="admin-customers-page">

      <div className="customers-header">
        <div>
          <h1>Customer Management</h1>
          <p>View and manage your customers</p>
        </div>

        <button
          className="customers-dashboard-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </button>
      </div>

      {/* Statistics */}

      <div className="customer-stats">

        <div className="customer-stat-card">
          <h3>Total Customers</h3>
          <strong>{totalCustomers}</strong>
        </div>

        <div className="customer-stat-card">
          <h3>Total Orders</h3>
          <strong>{totalOrders}</strong>
        </div>

        <div className="customer-stat-card">
          <h3>Total Revenue</h3>
          <strong>₹{totalRevenue}</strong>
        </div>

      </div>

      {/* Search */}

      <div className="customer-search-container">

        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

      </div>

      {/* Customer Table */}

      <div className="customer-table-container">

        <table className="customer-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr key={customer.email}>

                  <td>{index + 1}</td>

                  <td>{customer.name}</td>

                  <td>{customer.email}</td>

                  <td>{customer.phone}</td>

                  <td>{customer.orders}</td>

                  <td>₹{customer.totalSpent}</td>

                  <td>
                    <span className="customer-status">
                      Active
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="no-customers"
                >
                  No customers found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminCustomers;