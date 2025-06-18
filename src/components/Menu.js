import React, { useState, useEffect } from "react";
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
import logo from "../efendi-logo.png";
import Footer from "./Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Menu = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catSnap = await getDocs(collection(db, "categories"));
      const cats = catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      const itemSnap = await getDocs(collection(db, "menuItems"));
      const items = itemSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    };
    fetchData();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Kategoriler order'a göre sıralanıyor
  const sortedCategories = categories
    .slice()
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
  console.log(
    "Kategoriler:",
    sortedCategories.map((c) => ({
      name: c.translations?.en || c.id,
      order: c.order,
    }))
  );

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
        <div className="menu-container" style={{ marginBottom: "80px" }}>
          {sortedCategories.map((category) => {
            // Sadece bu kategoriye ait ürünleri order'a göre sırala
            const items = menuItems
              .filter((item) => item.category === category.id)
              .slice()
              .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
            console.log(
              `Kategori: ${category.translations?.en || category.id}`
            );
            items.forEach((i) =>
              console.log(
                `  ${i.translations?.en?.name || i.name} (order: ${i.order})`
              )
            );
            return (
              <Accordion
                key={category.id}
                expanded={expanded === category.id}
                onChange={handleChange(category.id)}
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
                    {category.translations?.en || t(`menu.${category.id}`)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {items.map((item) => (
                    <div key={item.id} style={{ marginBottom: "12px" }}>
                      <Typography
                        sx={{
                          fontFamily: "Playfair Display, serif",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#ffffff",
                          marginBottom: "4px",
                        }}
                      >
                        {item.translations?.en?.name || item.name} -{" "}
                        {item.price} TL
                      </Typography>
                      {(item.translations?.en?.description ||
                        item.description) && (
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "#cccccc",
                            fontStyle: "italic",
                          }}
                        >
                          {item.translations?.en?.description ||
                            item.description}
                        </Typography>
                      )}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          })}
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
