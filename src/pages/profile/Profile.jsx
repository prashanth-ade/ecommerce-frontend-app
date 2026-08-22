import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const { user, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  // const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      ...formData,
    };

    // Update current logged-in user
    login(updatedUser);

    // Update user in users list
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((item) =>
      item.id === user.id
        ? updatedUser
        : item
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success("Profile Updated Successfully!");

    // setSuccess("Profile updated successfully!");

    // setTimeout(() => {
    //   setSuccess("");
    // }, 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-card">
          <h2>My Profile</h2>

          <p className="profile-subtitle">
            Update your personal information.
          </p>

          {/* {success && (
            <div className="profile-success">
              {success}
            </div>
          )} */}

          <form onSubmit={handleSubmit}>

            <div className="profile-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label>Address</label>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="profile-save-btn"
            >
              Save Changes
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;