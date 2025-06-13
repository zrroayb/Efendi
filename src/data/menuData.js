import LocalBarIcon from "@mui/icons-material/LocalBar";
import WineBarIcon from "@mui/icons-material/WineBar";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

export const menuData = [
  {
    id: "specialCocktails",
    icon: <LocalBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        id: "citrusBlend",
        price: "₺320",
      },
      {
        id: "lambEar",
        price: "₺320",
      },
      {
        id: "rhubarb",
        price: "₺320",
      },
      {
        id: "drIndia",
        price: "₺320",
      },
      {
        id: "peachSour",
        price: "₺320",
      },
      {
        id: "goldenHarmony",
        price: "₺320",
      },
      {
        id: "chiliPassion",
        price: "₺320",
      },
      {
        id: "number10",
        price: "₺320",
      },
      {
        id: "wakeUp",
        price: "₺320",
      },
    ],
  },
  {
    id: "classicCocktails",
    icon: <LocalBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        id: "whiskeySour",
        price: "₺280",
      },
      {
        id: "bramble",
        price: "₺280",
      },
      {
        id: "oldFashioned",
        price: "₺280",
      },
      {
        id: "manhattan",
        price: "₺280",
      },
      {
        id: "aperolSpritz",
        price: "₺280",
      },
      {
        id: "barrelAgedNegroni",
        price: "₺280",
      },
      {
        id: "margaritaRocks",
        price: "₺280",
      },
      {
        id: "mezcalMargarita",
        price: "₺280",
      },
    ],
  },
  {
    id: "beers",
    icon: <SportsBarIcon sx={{ mr: 1 }} />,
    items: [
      { id: "belfastDraft", price: "₺180" },
      { id: "efes", price: "₺120" },
      { id: "efesGlutenFree", price: "₺120" },
      { id: "becks", price: "₺120" },
      { id: "bud", price: "₺120" },
      { id: "corona", price: "₺140" },
      { id: "leffeBlonde", price: "₺140" },
      { id: "hoegaarden", price: "₺140" },
      { id: "erdinger", price: "₺140" },
      { id: "duvel", price: "₺160" },
      { id: "garaGuzu", price: "₺160" },
      { id: "torchBrewery", price: "₺160" },
    ],
  },
  {
    id: "wines",
    icon: <WineBarIcon sx={{ mr: 1 }} />,
    items: [
      {
        id: "kayraVintage",
        price: "₺180",
      },
      {
        id: "morSalkimSyrah",
        price: "₺980",
      },
      { id: "cieloPinotGrigio", price: "₺180" },
      { id: "allureSauvignonBlanc", price: "₺980" },
      {
        id: "morSalkimChardonnay",
        price: "₺980",
      },
      { id: "cieloPinotGrigioBlush", price: "₺180" },
      {
        id: "allureRose",
        price: "₺980",
      },
      {
        id: "morSalkimRose",
        price: "₺980",
      },
    ],
  },
  {
    id: "sparkling",
    icon: <WineBarIcon sx={{ mr: 1 }} />,
    items: [
      { id: "ruffinoProsecco", price: "₺180" },
      { id: "bottegaBrut", price: "₺980" },
      { id: "moetBrut", price: "₺1800" },
      { id: "bottegaGold", price: "₺1200" },
      { id: "chandonGardenSpritz", price: "₺980" },
    ],
  },
  {
    id: "softDrinks",
    icon: <LocalDrinkIcon sx={{ mr: 1 }} />,
    items: [
      {
        id: "vitruviusKombucha",
        price: "₺120",
      },
      { id: "bitburger", price: "₺120" },
      { id: "orangeJuice", price: "₺80" },
      { id: "pellegrino", price: "₺80" },
      { id: "mocktail", price: "₺160" },
      { id: "homemadeLemonade", price: "₺100" },
      { id: "water", price: "₺40" },
      { id: "cocaCola", price: "₺60" },
    ],
  },
  {
    id: "hotCoffee",
    icon: <LocalCafeIcon sx={{ mr: 1 }} />,
    items: [
      { id: "americano", price: "₺80" },
      { id: "doubleEspresso", price: "₺80" },
      { id: "latte", price: "₺100" },
      { id: "cappuccino", price: "₺100" },
      { id: "espresso", price: "₺60" },
      { id: "filterCoffee", price: "₺100" },
      { id: "flavoredLatte", price: "₺120" },
      { id: "turkishCoffee", price: "₺80" },
    ],
  },
  {
    id: "coldCoffee",
    icon: <EmojiFoodBeverageIcon sx={{ mr: 1 }} />,
    items: [
      { id: "iceAmericano", price: "₺100" },
      { id: "iceLatte", price: "₺120" },
      { id: "flavoredIceLatte", price: "₺140" },
    ],
  },
  {
    id: "breakfast",
    icon: <BrunchDiningIcon sx={{ mr: 1 }} />,
    items: [
      {
        id: "yankeeBreakfast",
        price: "₺420",
      },
    ],
  },
];
