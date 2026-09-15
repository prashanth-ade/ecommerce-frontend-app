import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminSettings.css";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    storeName: "Fashion Store",
    email: "admin@fashionstore.com",
    phone: "9876543210",
    address: "Hyderabad, Telangana, India",
    currency: "INR",
    description:
      "Your one-stop online fashion and lifestyle store.",
    maintenanceMode: false,
  });

  useEffect(() => {
    const adminLoggedIn =
      localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      toast.error("Please login as admin");
      navigate("/admin/login");
      return;
    }

    const storedSettings = JSON.parse(
      localStorage.getItem("websiteSettings") || "null"
    );

    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "websiteSettings",
      JSON.stringify(settings)
    );

    toast.success("Website settings saved successfully");
  };

  return (
    <div className="admin-settings-page">

      {/* Header */}

      <div className="settings-header">

        <div>
          <h1>Website Settings</h1>
          <p>Configure your ecommerce website</p>
        </div>

        <button
          className="settings-dashboard-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Dashboard
        </button>

      </div>

      {/* Settings Form */}

      <div className="settings-container">

        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >

          <h2>Store Information</h2>

          {/* Store Name */}

          <div className="settings-field">
            <label>Store Name</label>

            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              placeholder="Enter store name"
            />
          </div>

          {/* Email */}

          <div className="settings-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Enter store email"
            />
          </div>

          {/* Phone */}

          <div className="settings-field">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* Address */}

          <div className="settings-field">
            <label>Address</label>

            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Enter store address"
              rows="3"
            />
          </div>

          {/* Currency */}

          <div className="settings-field">
            <label>Currency</label>

            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="INR">INR - ₹</option>
              <option value="USD">USD - $</option>
              <option value="EUR">EUR - €</option>
              <option value="GBP">GBP - £</option>
            </select>
          </div>

          {/* Description */}

          <div className="settings-field">
            <label>Website Description</label>

            <textarea
              name="description"
              value={settings.description}
              onChange={handleChange}
              placeholder="Enter website description"
              rows="4"
            />
          </div>

          {/* Maintenance Mode */}

          <div className="maintenance-setting">

            <div>
              <h3>Maintenance Mode</h3>

              <p>
                Temporarily disable the website
                for customers.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* Save */}

          <button
            type="submit"
            className="save-settings-btn"
          >
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminSettings;