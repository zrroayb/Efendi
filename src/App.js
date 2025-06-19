import React, { useState, useEffect } from "react";
import { Container, CircularProgress } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from "./components/LanguageSelector";
import Footer from "./components/Footer";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const categoryImages = {
  hot_drinks:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  soft_drinks:
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
  coffees:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  ice_coffees:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
  milkshakes:
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
  frozen:
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
  beers:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  alcohol_drinks:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  cocktails:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  snacks:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  breakfast:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  toasts:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  sandwiches:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  burgers:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  salads:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  desserts:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  shisha:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  nahla:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  alfakher:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  adalya:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  wines:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  sparkling:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  special_cocktails:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  classic_cocktails:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
};

const productImages = {
  // Cocktails
  "citrus-blend":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "lamb-ear":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  rhubarb:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "dr-india":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "peach-sour":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "golden-harmony":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "chili-passion":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  number10:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "wake-up":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "whiskey-sour":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  bramble:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "old-fashioned":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  manhattan:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "aperol-spritz":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "barrel-aged-negroni":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "margarita-rocks":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
  "mezcal-margarita":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",

  // Beers
  "belfast-draft":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  efes: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "efes-gluten-free":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  becks:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  bud: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  corona:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "leffe-blonde":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  hoegaarden:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  erdinger:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  duvel:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "gara-guzu":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "torch-brewery":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",

  // Wines
  "kayra-vintage":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "mor-salkim-syrah":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "cielo-pinot-grigio":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "allure-sauvignon-blanc":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "mor-salkim-chardonnay":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "cielo-pinot-grigio-blush":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "allure-rose":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "mor-salkim-rose":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",

  // Sparkling
  "ruffino-prosecco":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "bottega-brut":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "moet-brut":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "bottega-gold":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "chandon-garden-spritz":
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  "vitruvius-kombucha":
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
};

// Ürün ismine göre fotoğraf bulma fonksiyonu
const getProductImage = (product) => {
  const productName =
    product.translations?.en?.name ||
    product.translations?.tr?.name ||
    product.name ||
    "";

  // Önce tam eşleşme ara
  if (productImages[productName.toLowerCase()]) {
    return productImages[productName.toLowerCase()];
  }

  // Kısmi eşleşme ara
  for (const [key, value] of Object.entries(productImages)) {
    if (
      productName.toLowerCase().includes(key) ||
      key.includes(productName.toLowerCase())
    ) {
      return value;
    }
  }

  // Özel eşleştirmeler
  const specialMatches = {
    "turkish coffee":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "türk kahvesi":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "damla sakızlı türk kahvesi":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "turkish coffee with mastic":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "hot chocolate":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "sıcak çikolata":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "herbal tea":
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    "bitki çayı":
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    tea: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    çay: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    sahlep:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    salep:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "coca-cola":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    fanta:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    sprite:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "red bull":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "mineral water":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    soda: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "mineral water with fruit":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "meyveli soda":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    lemonade:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    limonata:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "fruit juice":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "meyve suyu":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "fresh orange":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    "sıkma portakal":
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    water:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    su: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    nescafe:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    espresso:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    americano:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    cappuccino:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "cafe latte":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    mocha:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "filter coffee":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "filtre kahve":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    frappe:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
    corona:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    "beck's":
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    bud: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    duvel:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  };

  const lowerProductName = productName.toLowerCase();
  for (const [key, value] of Object.entries(specialMatches)) {
    if (lowerProductName.includes(key) || key.includes(lowerProductName)) {
      return value;
    }
  }

  // Kategori bazlı varsayılan fotoğraflar
  const categoryDefaults = {
    hot_drinks:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    soft_drinks:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    coffees:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ice_coffees:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
    milkshakes:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    frozen:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80",
    beers:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    alcohol_drinks:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    cocktails:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
    snacks:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    breakfast:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    toasts:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    sandwiches:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    burgers:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    salads:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    desserts:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    shisha:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
    nahla:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
    alfakher:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
    adalya:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
    wines:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
    sparkling:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
  };

  return (
    categoryDefaults[product.category] ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  );
};

// Kategori grupları
const categoryGroups = {
  drinks: {
    name: {
      tr: "İçecekler",
      en: "Drinks",
      ru: "Напитки",
    },
    categories: [
      "hot_drinks",
      "soft_drinks",
      "coffees",
      "ice_coffees",
      "milkshakes",
      "frozen",
    ],
  },
  alcohol: {
    name: {
      tr: "Alkollü İçecekler",
      en: "Alcoholic Drinks",
      ru: "Алкогольные напитки",
    },
    categories: ["beers", "wines", "sparkling", "alcohol_drinks", "cocktails"],
  },
  food: {
    name: {
      tr: "Yemekler",
      en: "Food",
      ru: "Еда",
    },
    categories: [
      "breakfast",
      "snacks",
      "toasts",
      "sandwiches",
      "burgers",
      "salads",
      "desserts",
    ],
  },
  shisha: {
    name: {
      tr: "Nargile",
      en: "Shisha",
      ru: "Кальян",
    },
    categories: ["shisha", "nahla", "alfakher", "adalya"],
  },
};

function MenuPage() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const catSnap = await getDocs(collection(db, "categories"));
      const cats = catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const itemSnap = await getDocs(collection(db, "menuItems"));
      const items = itemSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(
        cats.sort((a, b) => {
          const orderA = a.order !== undefined ? Number(a.order) : 999999;
          const orderB = b.order !== undefined ? Number(b.order) : 999999;
          return orderA - orderB;
        })
      );
      setMenuItems(items);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress style={{ color: "#fff" }} />
      </div>
    );
  }

  // Sadece altında ürün olan kategoriler
  const categoriesWithItems = categories.filter((cat) =>
    menuItems.some((item) => item.category === cat.id)
  );

  // Seçili kategori için ürünleri filtrele
  const categoryItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory.id)
    : [];

  // Seçili gruba göre kategorileri filtrele
  const getFilteredCategories = () => {
    if (selectedGroup === "all") {
      return categoriesWithItems;
    }

    const groupCategories = categoryGroups[selectedGroup]?.categories || [];
    return categoriesWithItems.filter((cat) =>
      groupCategories.includes(cat.id)
    );
  };

  // Kategori sayfası
  if (selectedCategory) {
    return (
      <div className="App">
        <Container className="menu-container">
          <div className="language-selector-container">
            <LanguageSelector />
          </div>

          {/* Kaydırmalı Kategori Navigasyonu */}
          <div className="category-scroll-container">
            <div className="category-scroll-wrapper">
              {categoriesWithItems.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-scroll-button ${
                    selectedCategory && category.id === selectedCategory.id
                      ? "active"
                      : ""
                  }`}
                >
                  {category.translations?.[i18n.language] ||
                    category.translations?.en ||
                    category.id}
                </button>
              ))}
            </div>
          </div>

          <h1 className="category-title">
            {selectedCategory.translations[i18n.language]?.name ||
              selectedCategory.name}
          </h1>

          <button
            onClick={() => setSelectedCategory(null)}
            className="back-button"
          >
            ← {t("menu.backToMainMenu")}
          </button>

          <div className="products-grid">
            {categoryItems.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={item.image || getProductImage(item)}
                  alt={item.translations[i18n.language]?.name || item.name}
                  className="product-image"
                />
                <div className="product-content">
                  <div className="product-header">
                    <h3 className="product-name">
                      {item.translations[i18n.language]?.name || item.name}
                    </h3>
                    <span className="product-price">{item.price} ₺</span>
                  </div>
                  {item.translations[i18n.language]?.description && (
                    <p className="product-description">
                      {item.translations[i18n.language].description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  // Ana menü sayfası
  return (
    <div className="App">
      <Container className="menu-container">
        <div className="language-selector-container">
          <LanguageSelector />
        </div>

        {/* Kaydırmalı Kategori Grup Navigasyonu */}
        <div className="category-scroll-container">
          <div className="category-scroll-wrapper">
            <button
              onClick={() => setSelectedGroup("all")}
              className={`category-scroll-button ${
                selectedGroup === "all" ? "active" : ""
              }`}
            >
              {t("menu.categories") || "Categories"}
            </button>
            {Object.entries(categoryGroups).map(([key, group]) => (
              <button
                key={key}
                onClick={() => setSelectedGroup(key)}
                className={`category-scroll-button ${
                  selectedGroup === key ? "active" : ""
                }`}
              >
                {group.name[i18n.language] || group.name.en}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {getFilteredCategories().map((category) => (
            <div
              key={category.id}
              className="product-card"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={
                  category.image ||
                  categoryImages[category.id] ||
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                }
                alt={
                  category.translations?.[i18n.language] ||
                  category.translations?.en ||
                  category.id
                }
                className="product-image"
              />
              <div className="product-content">
                <div className="product-header">
                  <h3 className="product-name">
                    {category.translations?.[i18n.language] ||
                      category.translations?.en ||
                      category.id}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
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
