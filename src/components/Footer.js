import React from "react";
import { FaInstagram, FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/efendinargilepub/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <FaInstagram style={{ fontSize: "1.1rem" }} />
          <span className="instagram-text">@efendinargilepub</span>
        </a>

        {/* Contact Info - Desktop */}
        <div className="contact-info desktop-only">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Bodrum, Türkiye</span>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <span>+90 252 XXX XX XX</span>
          </div>
          <div className="contact-item">
            <FaClock className="contact-icon" />
            <span>12:00 - 02:00</span>
          </div>
        </div>

        {/* Mobile Contact Info - Compact */}
        <div className="contact-info mobile-only">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Bodrum</span>
          </div>
          <div className="contact-item">
            <FaClock className="contact-icon" />
            <span>12:00-02:00</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
