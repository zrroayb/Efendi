import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaInstagram } from "react-icons/fa";
import { menuData } from "../data/menuData";
import logo from "../efendi-logo.png";
import Footer from "./Footer";

const Menu = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        position: "relative",
        paddingBottom: "60px",
      }}
    >
      <div className="logo-background">
        <img src={logo} alt="Efendi Logo" className="logo" />
      </div>
      <Container maxWidth="md" sx={{ flex: 1 }}>
        <div className="menu-container">
          {Object.entries(menuData).map(([category, data]) => (
            <Accordion
              key={category}
              expanded={expanded === category}
              onChange={handleChange(category)}
              sx={{
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
                marginBottom: "8px",
                "&:before": {
                  display: "none",
                },
                "& .MuiAccordionSummary-root": {
                  minHeight: "48px",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "8px 0",
                },
                "& .MuiAccordionDetails-root": {
                  padding: "8px 16px 16px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
                sx={{
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {t(`menu.${category}`)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.items.map((item, index) => (
                  <div key={index} style={{ marginBottom: "12px" }}>
                    <Typography
                      sx={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#ffffff",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name} - {item.price} TL
                    </Typography>
                    {item.description && (
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#cccccc",
                          fontStyle: "italic",
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
      <Footer />

      {/* Instagram Link */}
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
    </div>
  );
};

export default Menu;
