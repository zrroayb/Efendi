import React from "react";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 6px;
  }
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();

  return (
    <ToggleButton onClick={toggleTheme} aria-label={t("common.toggleTheme")}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;
