const admin = require("firebase-admin");
const menuData = require("./src/data/menuData.migrate").menuData;
const en = require("./src/locales/en/translation.json").items;
const tr = require("./src/locales/tr/translation.json").items;
const ru = require("./src/locales/ru/translation.json").items;

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function migrate() {
  // Kategorileri ekle
  for (const category of menuData) {
    const translations = {
      en: en[category.id] ? en[category.id] : category.id,
      tr: tr[category.id] ? tr[category.id] : category.id,
      ru: ru[category.id] ? ru[category.id] : category.id,
    };
    await db
      .collection("categories")
      .doc(category.id)
      .set({
        id: category.id,
        translations: {
          en: translations.en.name || translations.en,
          tr: translations.tr.name || translations.tr,
          ru: translations.ru.name || translations.ru,
        },
      });
  }

  // Ürünleri ekle
  for (const category of menuData) {
    for (const item of category.items) {
      await db.collection("menuItems").add({
        category: category.id,
        price: item.price,
        translations: {
          en: {
            name: en[item.id]?.name || item.id,
            description: en[item.id]?.desc || "",
          },
          tr: {
            name: tr[item.id]?.name || item.id,
            description: tr[item.id]?.desc || "",
          },
          ru: {
            name: ru[item.id]?.name || item.id,
            description: ru[item.id]?.desc || "",
          },
        },
      });
    }
  }
  console.log("Migration completed!");
}

migrate();
