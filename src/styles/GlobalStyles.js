import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .App {
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .logo-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: -1;
  }

  .logo {
    width: 80%;
    height: 80%;
    opacity: ${(props) => props.theme.logoOpacity};
    object-fit: contain;
  }

  .menu-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 16px 80px;
    flex: 1;
  }

  .menu-accordion {
    background-color: ${(props) => props.theme.cardBackground} !important;
    color: ${(props) => props.theme.text} !important;
    margin: 8px 0 !important;
    border: 1px solid ${(props) => props.theme.accordionBorder} !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    transition: all 0.3s ease !important;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }

    .MuiAccordionSummary-root {
      background-color: ${(props) => props.theme.accordionHeader} !important;
      color: ${(props) => props.theme.accordionText} !important;
      border-bottom: 1px solid ${(props) =>
        props.theme.accordionBorder} !important;
      padding: 16px !important;
      min-height: 64px !important;
      transition: all 0.3s ease !important;

      &:hover {
        background-color: ${(props) =>
          props.theme.accordionHeaderHover} !important;
      }

      .MuiAccordionSummary-content {
        margin: 0 !important;
        color: ${(props) => props.theme.accordionText} !important;
        font-weight: 600 !important;
        font-size: 1.1rem !important;
      }
    }

    .MuiAccordionDetails-root {
      background-color: ${(props) => props.theme.accordionContent} !important;
      color: ${(props) => props.theme.accordionText} !important;
      padding: 16px !important;
    }

    .MuiTypography-root {
      color: ${(props) => props.theme.accordionText} !important;
      font-size: 1rem !important;
      line-height: 1.6 !important;
    }
  }

  .MuiAccordionSummary-expandIconWrapper {
    color: ${(props) => props.theme.accordionText} !important;
    transition: transform 0.3s ease !important;
  }

  .accordion-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .menu-items {
    padding: 8px 0;
  }

  .menu-item {
    padding: 12px 16px;
    border-bottom: 1px solid ${(props) => props.theme.accordionBorder};
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: ${(props) => props.theme.cardHover};
    }
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .item-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    margin: 0;
  }

  .item-description {
    color: ${(props) => props.theme.secondary};
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  .price {
    color: ${(props) => props.theme.accent};
    font-weight: 600;
    font-size: 1.1rem;
  }

  .footer {
    background-color: ${(props) => props.theme.footerBackground};
    color: ${(props) => props.theme.footerText};
    padding: 20px;
    text-align: center;
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  .footer a {
    color: ${(props) => props.theme.footerLink};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1.1rem;

    &:hover {
      opacity: 0.8;
      transform: translateY(-1px);
    }

    svg {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 768px) {
    .menu-container {
      padding: 16px 12px 80px;
    }

    .logo {
      width: 90%;
      height: 90%;
    }

    .menu-accordion {
      margin: 6px 0 !important;
      border-radius: 8px !important;

      .MuiAccordionSummary-root {
        padding: 12px !important;
        min-height: 56px !important;
      }

      .MuiAccordionDetails-root {
        padding: 12px !important;
      }
    }

    .menu-item {
      padding: 10px 12px;
    }

    .item-header h3 {
      font-size: 1rem;
    }

    .price {
      font-size: 1rem;
    }

    .footer {
      padding: 16px;
      font-size: 0.9rem;
    }
  }
`;
