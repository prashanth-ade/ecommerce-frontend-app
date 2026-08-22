import { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success(
      "Your message has been sent successfully!"
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>

        <p>
          We would love to hear from you.
          Send us your questions or feedback.
        </p>
      </div>

      <div className="contact-container">

        {/* CONTACT INFORMATION */}

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <p>
            Have a question about our products or
            orders? Our team is here to help you.
          </p>

          <div className="contact-details">
            <div>
              <h3>📍 Address</h3>
              <p>Hyderabad, Telangana, India</p>
            </div>

            <div>
              <h3>📞 Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h3>✉ Email</h3>
              <p>support@fashion.com</p>
            </div>

            <div>
              <h3>🕒 Working Hours</h3>
              <p>
                Monday - Saturday
                <br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <h2>Send Us a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;