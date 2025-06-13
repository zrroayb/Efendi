import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#000",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1000,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <a
        href="https://www.instagram.com/efendi_restaurant/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          background:
            "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaInstagram style={{ fontSize: "1.5rem" }} />
        <span>@efendi_restaurant</span>
      </a>
    </footer>
  );
};

export default Footer;
