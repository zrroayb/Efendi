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

const menu = [
  {
    title: "Özel Kokteyller",
    icon: <LocalBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Citrus Blend",
        desc: "Tanqueray Sevilla, Aperol, Italicus, Bodrum Mandalinası, Limon Suyu",
        price: "₺320",
      },
      {
        name: "Kuzu Kulağı",
        desc: "Gordon's Gin, Taze Kuzu Kulağı, Yuzu, Limon Suyu, Salatalık",
        price: "₺320",
      },
      {
        name: "Rhubarb",
        desc: "Smirnoff Vodka, Douzico, Rhubarb Likörü, Nar Ekşisi, Limon Suyu",
        price: "₺320",
      },
      {
        name: "Dr India",
        desc: "Captain Morgan Spiced Gold, Zencefil Likörü, Tarçın, Limon Suyu",
        price: "₺320",
      },
      {
        name: "Peach Sour",
        desc: "Gordon's Gin, Şeftali Likörü, Taze Şeftali, Limon Suyu, Cocktail Foam",
        price: "₺320",
      },
      {
        name: "Golden Harmony",
        desc: "Singleton 12 Years, Luxardo Maraschino, Karamelize Taze Şeftali, Limon Suyu, Cocktail Foam",
        price: "₺320",
      },
      {
        name: "Chili Passion",
        desc: "Acı Biber Infused Casamigos, Passion Fruit, Limon Suyu, Tajin Baharatlı Gerdan",
        price: "₺320",
      },
      {
        name: "10 Numara",
        desc: "Gordon's Gin, Passion Fruit, Taze Bodrum Mandalinası, Limon Suyu, Cocktail Foam",
        price: "₺320",
      },
      {
        name: "Wake Up",
        desc: "Guatemala Coffe Beans InfuSed Captain Morgan Rom, Dede Mix, Cocktail Foam",
        price: "₺320",
      },
    ],
  },
  {
    title: "Klasik Kokteyller",
    icon: <LocalBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Whiskey Sour",
        desc: "Bulleit Bourbon Viski, Limon Suyu, Simple Şurup, Angostura Bitters, Cocktail Foam",
        price: "₺280",
      },
      {
        name: "Bramble",
        desc: "Gordon's Gin, Orman Meyvesi Likörü, Taze Limon Suyu",
        price: "₺280",
      },
      {
        name: "Old Fashioned",
        desc: "Woodford Reserve Viski, Angostura Bitter",
        price: "₺280",
      },
      {
        name: "Manhattan",
        desc: "Bulleit Bourbon, Cinzano 1757 Rosso, Maraschino Cherries",
        price: "₺280",
      },
      {
        name: "Aperol Spritz",
        desc: "Aperol, Ruffino Prosecco, Soda",
        price: "₺280",
      },
      {
        name: "Barrel-Aged Negroni",
        desc: "Tanqueray, Campari, Tatlı Vermut",
        price: "₺280",
      },
      {
        name: "Margarita Rock's",
        desc: "Casamigos, Cointreau, Lime Suyu",
        price: "₺280",
      },
      {
        name: "Mezcal Margarita",
        desc: "Casamigos Mezcal, Cointreau, Lime Suyu",
        price: "₺280",
      },
    ],
  },
  {
    title: "Biralar",
    icon: <SportsBarIcon sx={{ mr: 1 }} />,
    items: [
      { name: "Belfast Fıçı 50cl", price: "₺180" },
      { name: "Efes 33cl", price: "₺120" },
      { name: "Efes Glutensiz", price: "₺120" },
      { name: "Becks 33cl", price: "₺120" },
      { name: "Bud 33cl", price: "₺120" },
      { name: "Corona 35cl", price: "₺140" },
      { name: "Leffe Blonde 33cl", price: "₺140" },
      { name: "Hoegaarden 33cl", price: "₺140" },
      { name: "Erdinger 33cl", price: "₺140" },
      { name: "Duvel 33cl", price: "₺160" },
      { name: "Gara Guzu Summer Ipa", price: "₺160" },
      { name: "Torch Brewery IPA", price: "₺160" },
    ],
  },
  {
    title: "Şaraplar",
    icon: <WineBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Kayra Vintage C. Sauvignon (Kadeh)",
        desc: "Kırmızı",
        price: "₺180",
      },
      {
        name: "Mor Salkım Bodrum Cantabile Syrah (Şişe)",
        desc: "Kırmızı",
        price: "₺980",
      },
      { name: "Cielo Pinot Grigio (Kadeh)", desc: "Beyaz", price: "₺180" },
      { name: "Allure Sauvignon Blanc (Şişe)", desc: "Beyaz", price: "₺980" },
      {
        name: "Mor Salkım Bodrum Volante Chardonnay (Şişe)",
        desc: "Beyaz",
        price: "₺980",
      },
      { name: "Cielo Pinot Grigio (Kadeh)", desc: "Blush", price: "₺180" },
      {
        name: "Allure Beyaz Kalecik Karası (Şişe)",
        desc: "Rose",
        price: "₺980",
      },
      {
        name: "Mor Salkım Bodrum Vivace Merlot Rose (Şişe)",
        desc: "Rose",
        price: "₺980",
      },
    ],
  },
  {
    title: "Köpüklüler",
    icon: <WineBarIcon sx={{ mr: 1 }} />,
    items: [
      { name: "Ruffino Prossecco", desc: "Kadeh", price: "₺180" },
      { name: "Bottega Brut", desc: "Şişe", price: "₺980" },
      { name: "Moet Brut", desc: "Şişe", price: "₺1800" },
      { name: "Bottega Gold", desc: "Şişe", price: "₺1200" },
      { name: "Chandon Garden Spritz", desc: "Şişe", price: "₺980" },
    ],
  },
  {
    title: "Softlar",
    icon: <LocalDrinkIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Vitruvius Kombucha",
        desc: "Elma&Baharat, Chili, Kereviz&Ananas",
        price: "₺120",
      },
      { name: "Bitburger", desc: "Alkolsüz Bira", price: "₺120" },
      { name: "Portakal Suyu", price: "₺80" },
      { name: "S.Pellegrino Churchill", price: "₺80" },
      { name: "Mocktail", price: "₺160" },
      { name: "Ev Yapımı Limonata", price: "₺100" },
      { name: "Su 33cl", price: "₺40" },
      { name: "Coca Cola & Cola Zero", price: "₺60" },
    ],
  },
  {
    title: "Sıcak Kahveler",
    icon: <LocalCafeIcon sx={{ mr: 1 }} />,
    items: [
      { name: "Americano", price: "₺80" },
      { name: "Double Espresso", price: "₺80" },
      { name: "Latte", price: "₺100" },
      { name: "Cappucino", price: "₺100" },
      { name: "Espresso", price: "₺60" },
      { name: "Filtre Kahve", price: "₺100" },
      { name: "Aromalı Latte", desc: "Vanilya, Karamel", price: "₺120" },
      { name: "Türk Kahvesi", price: "₺80" },
    ],
  },
  {
    title: "Soğuk Kahveler",
    icon: <EmojiFoodBeverageIcon sx={{ mr: 1 }} />,
    items: [
      { name: "Ice Americano", price: "₺100" },
      { name: "Ice Latte", price: "₺120" },
      { name: "Aromalı Ice Latte", desc: "Vanilya, Karamel", price: "₺140" },
    ],
  },
  {
    title: "Kahvaltı",
    icon: <BrunchDiningIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Yankee Breakfast",
        desc: "Frankfurter Sosis, Dana Bacon, Fırın Patates, Salata, Göz Yumurta, Kızarmış Domatesli Ekmek.",
        price: "₺420",
      },
      {
        name: "Truffle Omlette",
        desc: "Omlet, Trüf Yağı, Salata, Kaşık Patates, Parmesan.",
      },
      {
        name: "Kahvaltı Bowl",
        desc: "Domates, Salatalık, Kırmızı ve Yeşil Biber, Maydanoz, Ev Yapımı Lor Peyniri, Siyah Zeytin, Simit Kıtırları, Çörek Otu",
      },
    ],
  },
  {
    title: "Yiyecekler",
    icon: <FastfoodIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "Cheeseburger",
        desc: "120 gr Burger Köftesi, Turşu Relish, Cheddar Peyniri, Trüflü Aioli, Burger Sos ve Patates Kızartması",
      },
      {
        name: "Efendi Burger",
        desc: "120 gr Burger Köftesi, Dana Bacon Kaburga, Hot Cocktail Sos, Burger Sos, Karamelize Kırmızı Soğan, Cheddar ve Patates Kızartması",
      },
      {
        name: "Crispy Chicken Burger",
        desc: "120 gr Panelenmiş Tavuk Bonfile, Cheddar, Ballı Hardal, Coleslaw Salatası, Patates Kızartması",
      },
      {
        name: "Impossible Burger (Vegetarian)",
        desc: "Beyond The Meat, Ballı Hardal, Marul, Domates, Patates Kızartması",
      },
      {
        name: "Falafel Burger",
        desc: "120 gr Falafel Burger Köftesi, Ballı Hardal, Marul, Domates, Vegan Cheddar Sos ve Patates Kızartması",
      },
      {
        name: "Bonfile Taco",
        desc: "Bonfile, Mevsim Yeşillikleri, Çıtır Soğan, Bbq Mayonez, Guacamole",
      },
      {
        name: "Izgara Tavuk Salata",
        desc: "120 gr Izgara Tavuk Göğsü, Kıvırcık Marul, Domates, Mısır, Salata Sosu, Ranch Sos, Kızartılmış Tortilla",
      },
      {
        name: "Ton Balıklı Salata",
        desc: "Ton Balığı, Cherry Domates, Mısır, Mevsim Yeşillikleri, Kızarmış Tortilla, Salata Sosu",
      },
      {
        name: "Falafel Salata",
        desc: "Falafel Topları, Kıvırcık Marul, Mısır, Domates, Salata Sosu, Ballı Hardal",
      },
      {
        name: "Mozarella Sticks",
        desc: "150 gr Panelenmiş Mozarella Sticks, Kaşık Patates",
      },
      {
        name: "Chicken Fingers",
        desc: "150 gr Çıtır Tavuk Parçaları, Kaşık Patates",
      },
      {
        name: "Patates Kızartması",
        desc: "Kaşık Patates veya French Fries Tercihinizi Belirtiniz.",
      },
      {
        name: "Trüflü Patates",
        desc: "İnce Patates, Toz Parmesan, Trüf Yağı, Frenk Soğanı, Ranch Sos",
      },
    ],
  },
  {
    title: "Tatlılar",
    icon: <IcecreamIcon sx={{ mr: 1 }} />,
    items: [
      {
        name: "San Sebastian Cheesecake",
        desc: "San Sebastian Usulü Cheesecake",
      },
    ],
  },
];

function App() {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (idx) => (event, isExpanded) => {
    setExpanded(isExpanded ? idx : false);
  };

  return (
    <Container
      fluid
      className="App"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <header
        className="App-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 32,
          }}
        >
          <img
            src={logo}
            alt="Efendi Bar Logo"
            style={{
              height: 96,
              width: 96,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <div style={{ marginTop: 40, width: "100%", maxWidth: 600 }}>
          {menu.map((section, idx) => (
            <Accordion
              key={section.title}
              expanded={expanded === idx}
              onChange={handleAccordionChange(idx)}
              sx={{
                background: "rgba(24,24,24,0.95)",
                mb: 2,
                borderRadius: 2,
                boxShadow: "0 2px 8px #000",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {section.icon} {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.items.map((item, i) => (
                  <div key={item.name} style={{ marginBottom: 18 }}>
                    <div className="menu-item-container">
                      <div className="menu-item-info">
                        <div className="menu-item-title">{item.name}</div>
                        {item.desc && (
                          <div className="menu-item-desc">{item.desc}</div>
                        )}
                      </div>
                      <div className="menu-item-price">{item.price}</div>
                    </div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </header>
      <footer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 48,
          marginBottom: 24,
        }}
      >
        <a
          href="https://www.instagram.com/efendi_nargile_pub/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 448 512"
            fill="currentColor"
            style={{ marginRight: 6 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 202.66A53.34 53.34 0 1 0 277.34 256 53.38 53.38 0 0 0 224 202.66Zm124.71-41a54 54 0 0 0-30.36-30.36C293.19 120 256.6 118.13 224 118.13s-69.19 1.87-94.35 13.17a54 54 0 0 0-30.36 30.36C120 162.81 118.13 199.4 118.13 232s1.87 69.19 13.17 94.35a54 54 0 0 0 30.36 30.36C162.81 392 199.4 393.87 232 393.87s69.19-1.87 94.35-13.17a54 54 0 0 0 30.36-30.36C392 349.19 393.87 312.6 393.87 280s-1.87-69.19-13.17-94.35ZM224 338a82 82 0 1 1 82-82 82 82 0 0 1-82 82Zm85.4-148.6a19.2 19.2 0 1 1-19.2-19.2 19.2 19.2 0 0 1 19.2 19.2ZM398.8 80A80 80 0 0 0 368 51.2C347.2 32.8 320.8 24 288 24H160c-32.8 0-59.2 8.8-80 27.2A80 80 0 0 0 49.2 80C32.8 100.8 24 127.2 24 160v128c0 32.8 8.8 59.2 27.2 80A80 80 0 0 0 80 432c20.8 18.4 47.2 27.2 80 27.2h128c32.8 0 59.2-8.8 80-27.2a80 80 0 0 0 27.2-80c18.4-20.8 27.2-47.2 27.2-80V160c0-32.8-8.8-59.2-27.2-80ZM224 338a114 114 0 1 1 114-114A114 114 0 0 1 224 338Zm146.4-186.4a32 32 0 1 1-32-32 32 32 0 0 1 32 32Z" />
          </svg>
          @efendi_nargile_pub
        </a>
      </footer>
    </Container>
  );
}

export default App;
