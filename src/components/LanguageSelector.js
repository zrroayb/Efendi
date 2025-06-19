import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  position: "fixed",
  top: "1.5rem",
  right: "1.5rem",
  zIndex: 1000,
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  padding: "3px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  [theme.breakpoints.down("sm")]: {
    top: "1rem",
    right: "1rem",
    padding: "2px",
  },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: active ? "#fff" : "rgba(255, 255, 255, 0.8)",
  backgroundColor: active
    ? "linear-gradient(135deg, #00B4D8, #0077B6)"
    : "transparent",
  background: active
    ? "linear-gradient(135deg, #00B4D8, #0077B6)"
    : "transparent",
  "&:hover": {
    backgroundColor: active
      ? "linear-gradient(135deg, #0077B6, #00B4D8)"
      : "rgba(255, 255, 255, 0.12)",
    transform: "translateY(-1px)",
    boxShadow: active
      ? "0 2px 8px rgba(0, 180, 216, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  minWidth: "32px",
  padding: "4px 8px",
  fontSize: "0.75rem",
  fontWeight: active ? 600 : 500,
  borderRadius: "16px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontFamily: "'Inter', sans-serif",
  textTransform: "none",
  letterSpacing: "0.3px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "28px",
    padding: "3px 6px",
    fontSize: "0.7rem",
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
