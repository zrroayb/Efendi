import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMDG5K3xxvPnksqr8FJ67GqJ5G3xhRh_Y",
  authDomain: "efendimenu.firebaseapp.com",
  projectId: "efendimenu",
  storageBucket: "efendimenu.firebasestorage.app",
  messagingSenderId: "321820061009",
  appId: "1:321820061009:web:9d9d39d04105a154c2b770",
  measurementId: "G-HMDTMQB3RT",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateOrders = async () => {
  try {
    // Kategorileri güncelle
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Kategorileri güncelle
    for (let i = 0; i < categories.length; i++) {
      await updateDoc(doc(db, "categories", categories[i].id), {
        order: i,
      });
      console.log(
        `Updated category order: ${
          categories[i].translations?.en || categories[i].id
        } -> ${i}`
      );
    }

    // Menü öğelerini güncelle
    const menuItemsSnapshot = await getDocs(collection(db, "menuItems"));
    const menuItems = menuItemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Her kategori için ürünleri grupla ve sırala
    const itemsByCategory = {};
    menuItems.forEach((item) => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });

    // Her kategorideki ürünleri güncelle
    for (const [categoryId, items] of Object.entries(itemsByCategory)) {
      for (let i = 0; i < items.length; i++) {
        await updateDoc(doc(db, "menuItems", items[i].id), {
          order: i,
        });
        console.log(
          `Updated menu item order: ${
            items[i].translations?.en?.name || items[i].id
          } -> ${i}`
        );
      }
    }

    console.log("All orders have been updated successfully!");
  } catch (error) {
    console.error("Error updating orders:", error);
  }
};

// Scripti çalıştır
updateOrders();
