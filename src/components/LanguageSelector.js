import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 1000,
  backgroundColor: "rgba(24, 24, 24, 0.8)",
  backdropFilter: "blur(8px)",
  borderRadius: "8px",
  padding: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("sm")]: {
    top: "10px",
    right: "10px",
    padding: "2px",
  },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: active ? "#fff" : "rgba(255, 255, 255, 0.7)",
  backgroundColor: active ? "rgba(255, 255, 255, 0.15)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  minWidth: "40px",
  padding: "6px 12px",
  fontSize: "0.875rem",
  fontWeight: active ? 600 : 400,
  transition: "all 0.2s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    minWidth: "36px",
    padding: "4px 8px",
    fontSize: "0.75rem",
  },
}));

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <StyledButtonGroup variant="contained" aria-label="language selector">
      <StyledButton
        active={i18n.language === "tr" ? 1 : 0}
        onClick={() => changeLanguage("tr")}
        aria-label="Turkish"
      >
        TR
      </StyledButton>
      <StyledButton
        active={i18n.language === "en" ? 1 : 0}
        onClick={() => changeLanguage("en")}
        aria-label="English"
      >
        EN
      </StyledButton>
      <StyledButton
        active={i18n.language === "ru" ? 1 : 0}
        onClick={() => changeLanguage("ru")}
        aria-label="Russian"
      >
        RU
      </StyledButton>
    </StyledButtonGroup>
  );
};

export default LanguageSelector;
