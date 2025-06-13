import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#2a2a2a",
        padding: "12px",
        textAlign: "center",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      }}
    >
      <a
        href="https://www.instagram.com/efendibodrum"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#ffffff",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "#333333",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        <FaInstagram size={24} />
        @efendibodrum
      </a>
    </div>
  );
};

export default Footer;
