import React, { useState } from "react";
import { Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WineBarIcon from "@mui/icons-material/WineBar";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IcecreamIcon from "@mui/icons-material/Icecream";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import StarIcon from "@mui/icons-material/Star";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./efendi-logo.png";
import { useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from "./components/LanguageSelector";
import Footer from "./components/Footer";
import { menuData } from "./data/menuData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const BarrelIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      fill="currentColor"
    />
    <path
      d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
      fill="currentColor"
    />
  </svg>
);

function MenuPage() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (idx) => (event, isExpanded) => {
    setExpanded(isExpanded ? idx : false);
  };

  return (
    <div className="App">
      <div className="logo-background">
        <img src={logo} alt="Efendi Logo" className="background-logo" />
      </div>
      <Container className="menu-container">
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
        {menuData.map((category, idx) => (
          <Accordion
            key={category.id}
            expanded={expanded === idx}
            onChange={handleAccordionChange(idx)}
            className="menu-accordion"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx}-content`}
              id={`panel${idx}-header`}
            >
              <div className="accordion-header">
                {category.icon}
                <Typography>{t(`menu.${category.id}`)}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="menu-items">
                {category.items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="item-header">
                      <h3>{t(`items.${item.id}.name`)}</h3>
                      <span className="price">{item.price}</span>
                    </div>
                    {t(`items.${item.id}.desc`) && (
                      <p className="item-description">
                        {t(`items.${item.id}.desc`)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
