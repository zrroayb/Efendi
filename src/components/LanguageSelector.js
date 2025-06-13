import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 1000,
  backgroundColor: "rgba(24, 24, 24, 0.7)",
  backdropFilter: "blur(8px)",
  borderRadius: "8px",
  padding: "4px",
  [theme.breakpoints.down("sm")]: {
    top: "10px",
    right: "10px",
  },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: active ? "#fff" : "rgba(255, 255, 255, 0.7)",
  backgroundColor: active ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  minWidth: "40px",
  padding: "4px 8px",
  fontSize: "0.875rem",
  [theme.breakpoints.down("sm")]: {
    minWidth: "32px",
    padding: "2px 4px",
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
      >
        TR
      </StyledButton>
      <StyledButton
        active={i18n.language === "en" ? 1 : 0}
        onClick={() => changeLanguage("en")}
      >
        EN
      </StyledButton>
      <StyledButton
        active={i18n.language === "ru" ? 1 : 0}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </StyledButton>
    </StyledButtonGroup>
  );
};

export default LanguageSelector;
