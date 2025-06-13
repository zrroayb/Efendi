import React, { useState } from "react";
import { Container } from "react-bootstrap";
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
import { menuData } from "./data/menuData";

const BarrelIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="20" cy="10" rx="12" ry="6" fill="#111" />
    <rect x="8" y="10" width="24" height="18" rx="8" fill="#111" />
    <ellipse cx="20" cy="28" rx="12" ry="6" fill="#111" />
    <rect x="12" y="10" width="16" height="18" fill="#fff" opacity="0.2" />
  </svg>
);

function App() {
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
    </div>
  );
}

export default App;
