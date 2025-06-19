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
  hot_drinks: "/images/categories/hot-coffee.jpg",
  soft_drinks: "/images/categories/soft-drinks.jpg",
  coffees: "/images/categories/hot-coffee.jpg",
  ice_coffees: "/images/categories/cold-coffee.jpg",
  milkshakes: "/images/categories/soft-drinks.jpg",
  frozen: "/images/categories/soft-drinks.jpg",
  beers: "/images/categories/beers.jpg",
  alcohol_drinks: "/images/categories/wines.jpg",
  cocktails: "/images/categories/special-cocktails.jpg",
  snacks: "/images/categories/breakfast.jpg",
  breakfast: "/images/categories/breakfast.jpg",
  toasts: "/images/categories/breakfast.jpg",
  sandwiches: "/images/categories/breakfast.jpg",
  burgers: "/images/categories/breakfast.jpg",
  salads: "/images/categories/breakfast.jpg",
  desserts: "/images/categories/breakfast.jpg",
  shisha: "/images/categories/special-cocktails.jpg",
  nahla: "/images/categories/special-cocktails.jpg",
  alfakher: "/images/categories/special-cocktails.jpg",
  adalya: "/images/categories/special-cocktails.jpg",
  wines: "/images/categories/wines.jpg",
  sparkling: "/images/categories/sparkling.jpg",
  special_cocktails: "/images/categories/special-cocktails.jpg",
  classic_cocktails: "/images/categories/classic-cocktails.jpg",
};

const productImages = {
  // Cocktails
  "citrus-blend": "/images/products/citrus-blend.jpg",
  "lamb-ear": "/images/products/lamb-ear.jpg",
  rhubarb: "/images/products/rhubarb.jpg",
  "dr-india": "/images/products/dr-india.jpg",
  "peach-sour": "/images/products/peach-sour.jpg",
  "golden-harmony": "/images/products/golden-harmony.jpg",
  "chili-passion": "/images/products/chili-passion.jpg",
  number10: "/images/products/number10.jpg",
  "wake-up": "/images/products/wake-up.jpg",
  "whiskey-sour": "/images/products/whiskey-sour.jpg",
  bramble: "/images/products/bramble.jpg",
  "old-fashioned": "/images/products/old-fashioned.jpg",
  manhattan: "/images/products/manhattan.jpg",
  "aperol-spritz": "/images/products/aperol-spritz.jpg",
  "barrel-aged-negroni": "/images/products/barrel-aged-negroni.jpg",
  "margarita-rocks": "/images/products/margarita-rocks.jpg",
  "mezcal-margarita": "/images/products/mezcal-margarita.jpg",

  // Beers
  "belfast-draft": "/images/products/belfast-draft.jpg",
  efes: "/images/products/efes.jpg",
  "efes-gluten-free": "/images/products/efes-gluten-free.jpg",
  becks: "/images/products/becks.jpg",
  bud: "/images/products/bud.jpg",
  corona: "/images/products/corona.jpg",
  "leffe-blonde": "/images/products/leffe-blonde.jpg",
  hoegaarden: "/images/products/hoegaarden.jpg",
  erdinger: "/images/products/erdinger.jpg",
  duvel: "/images/products/duvel.jpg",
  "gara-guzu": "/images/products/gara-guzu.jpg",
  "torch-brewery": "/images/products/torch-brewery.jpg",

  // Wines
  "kayra-vintage": "/images/products/kayra-vintage.jpg",
  "mor-salkim-syrah": "/images/products/mor-salkim-syrah.jpg",
  "cielo-pinot-grigio": "/images/products/cielo-pinot-grigio.jpg",
  "allure-sauvignon-blanc": "/images/products/allure-sauvignon-blanc.jpg",
  "mor-salkim-chardonnay": "/images/products/mor-salkim-chardonnay.jpg",
  "cielo-pinot-grigio-blush": "/images/products/cielo-pinot-grigio-blush.jpg",
  "allure-rose": "/images/products/allure-rose.jpg",
  "mor-salkim-rose": "/images/products/mor-salkim-rose.jpg",

  // Sparkling
  "ruffino-prosecco": "/images/products/ruffino-prosecco.jpg",
  "bottega-brut": "/images/products/bottega-brut.jpg",
  "moet-brut": "/images/products/moet-brut.jpg",
  "bottega-gold": "/images/products/bottega-gold.jpg",
  "chandon-garden-spritz": "/images/products/chandon-garden-spritz.jpg",
  "vitruvius-kombucha": "/images/products/vitruvius-kombucha.jpg",
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
    "turkish coffee": "/images/products/number10.jpg",
    "türk kahvesi": "/images/products/number10.jpg",
    "damla sakızlı türk kahvesi": "/images/products/number10.jpg",
    "turkish coffee with mastic": "/images/products/number10.jpg",
    "hot chocolate": "/images/products/wake-up.jpg",
    "sıcak çikolata": "/images/products/wake-up.jpg",
    "herbal tea": "/images/products/citrus-blend.jpg",
    "bitki çayı": "/images/products/citrus-blend.jpg",
    tea: "/images/products/citrus-blend.jpg",
    çay: "/images/products/citrus-blend.jpg",
    sahlep: "/images/products/wake-up.jpg",
    salep: "/images/products/wake-up.jpg",
    "coca-cola": "/images/products/golden-harmony.jpg",
    fanta: "/images/products/golden-harmony.jpg",
    sprite: "/images/products/golden-harmony.jpg",
    "red bull": "/images/products/chili-passion.jpg",
    "mineral water": "/images/products/vitruvius-kombucha.jpg",
    soda: "/images/products/vitruvius-kombucha.jpg",
    "mineral water with fruit": "/images/products/vitruvius-kombucha.jpg",
    "meyveli soda": "/images/products/vitruvius-kombucha.jpg",
    lemonade: "/images/products/citrus-blend.jpg",
    limonata: "/images/products/citrus-blend.jpg",
    "fruit juice": "/images/products/citrus-blend.jpg",
    "meyve suyu": "/images/products/citrus-blend.jpg",
    "fresh orange": "/images/products/citrus-blend.jpg",
    "sıkma portakal": "/images/products/citrus-blend.jpg",
    water: "/images/products/vitruvius-kombucha.jpg",
    su: "/images/products/vitruvius-kombucha.jpg",
    nescafe: "/images/products/number10.jpg",
    espresso: "/images/products/number10.jpg",
    americano: "/images/products/number10.jpg",
    cappuccino: "/images/products/number10.jpg",
    "cafe latte": "/images/products/number10.jpg",
    mocha: "/images/products/number10.jpg",
    "filter coffee": "/images/products/number10.jpg",
    "filtre kahve": "/images/products/number10.jpg",
    frappe: "/images/products/cold-coffee.jpg",
    corona: "/images/products/corona.jpg",
    "beck's": "/images/products/becks.jpg",
    bud: "/images/products/bud.jpg",
    duvel: "/images/products/duvel.jpg",
  };

  const lowerProductName = productName.toLowerCase();
  for (const [key, value] of Object.entries(specialMatches)) {
    if (lowerProductName.includes(key) || key.includes(lowerProductName)) {
      return value;
    }
  }

  // Kategori bazlı varsayılan fotoğraflar
  const categoryDefaults = {
    hot_drinks: "/images/categories/hot-coffee.jpg",
    soft_drinks: "/images/categories/soft-drinks.jpg",
    coffees: "/images/categories/hot-coffee.jpg",
    ice_coffees: "/images/categories/cold-coffee.jpg",
    milkshakes: "/images/categories/soft-drinks.jpg",
    frozen: "/images/categories/soft-drinks.jpg",
    beers: "/images/categories/beers.jpg",
    alcohol_drinks: "/images/categories/wines.jpg",
    cocktails: "/images/categories/special-cocktails.jpg",
    snacks: "/images/categories/breakfast.jpg",
    breakfast: "/images/categories/breakfast.jpg",
    toasts: "/images/categories/breakfast.jpg",
    sandwiches: "/images/categories/breakfast.jpg",
    burgers: "/images/categories/breakfast.jpg",
    salads: "/images/categories/breakfast.jpg",
    desserts: "/images/categories/breakfast.jpg",
    shisha: "/images/categories/special-cocktails.jpg",
    nahla: "/images/categories/special-cocktails.jpg",
    alfakher: "/images/categories/special-cocktails.jpg",
    adalya: "/images/categories/special-cocktails.jpg",
    wines: "/images/categories/wines.jpg",
    sparkling: "/images/categories/sparkling.jpg",
  };

  return categoryDefaults[product.category] || "/images/placeholder.svg";
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
                  "/images/placeholder.svg"
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
