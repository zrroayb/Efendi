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

const Menu = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (idx) => (event, isExpanded) => {
    setExpanded(isExpanded ? idx : false);
  };

  return (
    <div>
      <div className="App">
        <div className="logo-background">
          <img src={logo} alt="Efendi Logo" className="logo" />
        </div>
        <Container className="menu-container">
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
        <footer className="footer">
          <a
            href="https://www.instagram.com/efendibodrum"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.instagram")}
          >
            <FaInstagram /> {t("footer.instagram")}
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Menu;
