import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    // Demo admin credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");

      toast.success("Admin login successful!");

      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        <p>Login to access the admin dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>

        <div className="admin-demo">
          <p>Demo Credentials</p>
          <span>Email: admin@gmail.com</span>
          <span>Password: admin123</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;