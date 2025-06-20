import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import { styled } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Luxury theme colors
const theme = {
  primary: "#1a237e", // Deep indigo
  secondary: "#c2185b", // Deep pink
  accent: "#ffd700", // Gold
  background: "#f5f5f5",
  text: "#333333",
  white: "#ffffff",
  success: "#2e7d32",
  error: "#c62828",
  warning: "#f57f17",
  info: "#1565c0",
};

const LangBox = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: theme.white,
  borderRadius: 6,
  padding: "4px 12px",
  display: "inline-block",
  fontWeight: 700,
  fontSize: "0.95rem",
  marginBottom: 8,
  marginRight: 8,
  letterSpacing: 1,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const langColors = {
  en: theme.primary,
  tr: theme.success,
  ru: theme.error,
};

// Modern buton stili
const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  fontWeight: 700,
  fontSize: "1rem",
  padding: "12px 32px",
  boxShadow: "0 4px 12px rgba(26, 35, 126, 0.15)",
  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
  color: theme.white,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
    boxShadow: "0 6px 16px rgba(26, 35, 126, 0.25)",
    transform: "translateY(-2px)",
  },
}));

const IconBtn = styled(IconButton)(({ colorname }) => ({
  borderRadius: 16,
  padding: 10,
  margin: 4,
  fontSize: 22,
  background: "transparent",
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      colorname === "edit"
        ? "rgba(26, 35, 126, 0.12)"
        : "rgba(198, 40, 40, 0.12)",
    color: "#fff",
    transform: "scale(1.1)",
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: 16,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    minHeight: 64,
    padding: "0 24px",
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
    color: theme.white,
    borderRadius: "12px 12px 0 0",
  },
  "& .MuiAccordionSummary-content": {
    margin: "12px 0",
  },
  "& .MuiAccordionDetails-root": {
    padding: "24px",
    background: theme.white,
  },
}));

// Ek: Menüdeki gibi ürün kartı stili
const ProductCard = styled(Box)(({ theme, isdragging }) => ({
  background: isdragging ? "#333" : "#232323",
  color: "#fff",
  borderRadius: 12,
  boxShadow: isdragging
    ? "0 12px 32px 4px rgba(0,0,0,0.25)"
    : "0 2px 8px rgba(0,0,0,0.12)",
  padding: isdragging ? "12px 16px" : "18px 20px",
  marginBottom: isdragging ? 0 : 14,
  marginTop: isdragging ? 0 : 0,
  opacity: isdragging ? 0.92 : 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 64,
  transition:
    "box-shadow 0.2s, background 0.2s, transform 0.2s, opacity 0.2s, padding 0.2s, margin 0.2s",
  fontFamily: "Playfair Display, serif",
  fontSize: "1.1rem",
  fontWeight: 500,
  border: isdragging ? "2px solid #ffd700" : "1px solid #333",
  transform: isdragging ? "scale(1.04)" : "none",
  zIndex: isdragging ? 100 : 1,
  cursor: isdragging ? "grabbing" : "grab",
  position: isdragging ? "relative" : "static",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
    background: "#292929",
  },
}));

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    translations: {
      en: { name: "", description: "" },
      tr: { name: "", description: "" },
      ru: { name: "", description: "" },
    },
  });
  const [newCategory, setNewCategory] = useState({
    id: "",
    translations: {
      en: "",
      tr: "",
      ru: "",
    },
  });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [openCategoryEditDialog, setOpenCategoryEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenuItems(items);
  };

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const cats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(cats);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({
        category: "",
        price: "",
        translations: {
          en: { name: "", description: "" },
          tr: { name: "", description: "" },
          ru: { name: "", description: "" },
        },
      });
    }
    setOpenDialog(true);
  };

  const handleOpenCategoryDialog = () => {
    setNewCategory({
      id: "",
      translations: {
        en: "",
        tr: "",
        ru: "",
      },
    });
    setOpenCategoryDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        await updateDoc(doc(db, "menuItems", selectedItem.id), formData);
      } else {
        await addDoc(collection(db, "menuItems"), {
          ...formData,
          order: menuItems.filter((i) => i.category === formData.category)
            .length,
        });
      }
      handleCloseDialog();
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      await addDoc(collection(db, "categories"), {
        translations: {
          en: newCategory.translations.en,
          tr: newCategory.translations.tr,
          ru: newCategory.translations.ru,
        },
        order: categories.length,
      });
      handleCloseCategoryDialog();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "menuItems", id));
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleOpenCategoryEditDialog = (category) => {
    setSelectedCategory(category);
    setNewCategory({
      id: category.id,
      translations: { ...category.translations },
    });
    setOpenCategoryEditDialog(true);
  };

  const handleCloseCategoryEditDialog = () => {
    setOpenCategoryEditDialog(false);
    setSelectedCategory(null);
  };

  const handleSaveCategoryEdit = async () => {
    try {
      await updateDoc(doc(db, "categories", selectedCategory.id), newCategory);
      handleCloseCategoryEditDialog();
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? All items in this category will also be deleted."
      )
    ) {
      try {
        // Delete all items in this category first
        const categoryItems = menuItems.filter((item) => item.category === id);
        for (const item of categoryItems) {
          await deleteDoc(doc(db, "menuItems", item.id));
        }
        // Then delete the category
        await deleteDoc(doc(db, "categories", id));
        fetchCategories();
        fetchMenuItems();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const onDragEnd = async (result) => {
    console.log("onDragEnd tetiklendi", result);
    if (!result.destination) return;

    const { source, destination, type } = result;

    // Kategori sıralama
    if (type === "CATEGORY") {
      // Ekranda görünen sıralamayı al
      const sortedCategories = categories
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const reorderedCategories = Array.from(sortedCategories);
      const [removed] = reorderedCategories.splice(source.index, 1);
      reorderedCategories.splice(destination.index, 0, removed);

      // Firestore'a sırayı topluca kaydet
      await Promise.all(
        reorderedCategories.map((cat, i) => {
          console.log("Güncellenen kategori ID:", cat.id, "order:", i);
          return updateDoc(doc(db, "categories", cat.id), { order: i });
        })
      );

      setCategories(
        reorderedCategories.map((cat, i) => ({ ...cat, order: i }))
      );
      await fetchCategories();
    }
    // Ürün sıralama
    else if (type.startsWith("PRODUCT-")) {
      const categoryId = type.replace("PRODUCT-", "");
      // Ekranda görünen ürün sırasını al
      const sortedItems = menuItems
        .filter((item) => item.category === categoryId)
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const reorderedItems = Array.from(sortedItems);
      const [removed] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, removed);

      // Firestore'a sırayı topluca kaydet
      await Promise.all(
        reorderedItems.map((item, i) => {
          console.log("Güncellenen ürün ID:", item.id, "order:", i);
          return updateDoc(doc(db, "menuItems", item.id), { order: i });
        })
      );

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.category === categoryId
            ? {
                ...item,
                order: reorderedItems.findIndex((x) => x.id === item.id),
              }
            : item
        )
      );
      await fetchMenuItems();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Button
          variant={openDialog ? "contained" : "text"}
          onClick={() => handleOpenDialog()}
          sx={{ mr: 2 }}
        >
          Menu Management
        </Button>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, px: { xs: 1, sm: 2, md: 4 } }}
      >
        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <ModernButton
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            }}
          >
            Add Menu Item
          </ModernButton>
          <ModernButton
            startIcon={<CategoryIcon />}
            onClick={handleOpenCategoryDialog}
            sx={{
              background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
            }}
          >
            Add Category
          </ModernButton>
        </Box>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="categories" type="CATEGORY">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {categories
                  .slice()
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((category, catIdx) => (
                    <Draggable
                      key={category.id}
                      draggableId={category.id}
                      index={catIdx}
                    >
                      {(catProvided, catSnapshot) => (
                        <StyledAccordion
                          expanded={expandedCategory === category.id}
                          onChange={() =>
                            setExpandedCategory(
                              expandedCategory === category.id
                                ? null
                                : category.id
                            )
                          }
                          ref={catProvided.innerRef}
                          {...catProvided.draggableProps}
                          sx={{
                            transform: catSnapshot.isDragging
                              ? "scale(1.02)"
                              : "none",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: theme.white }} />
                            }
                            {...catProvided.dragHandleProps}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "1.3rem",
                                  letterSpacing: 0.5,
                                  color: theme.white,
                                }}
                              >
                                {category.translations.en}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <IconBtn
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenCategoryEditDialog(category);
                                  }}
                                  colorname="edit"
                                >
                                  <EditIcon sx={{ fontSize: 24 }} />
                                </IconBtn>
                                <IconBtn
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCategory(category.id);
                                  }}
                                  colorname="delete"
                                >
                                  <DeleteIcon sx={{ fontSize: 24 }} />
                                </IconBtn>
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Droppable
                              droppableId={`products-${category.id}`}
                              type={`PRODUCT-${category.id}`}
                            >
                              {(prodProvided) => (
                                <div
                                  ref={prodProvided.innerRef}
                                  {...prodProvided.droppableProps}
                                >
                                  {menuItems
                                    .filter(
                                      (item) => item.category === category.id
                                    )
                                    .slice()
                                    .sort(
                                      (a, b) => (a.order ?? 0) - (b.order ?? 0)
                                    )
                                    .map((item, prodIdx, arr) => (
                                      <ProductCard key={item.id}>
                                        <Box>
                                          <Typography
                                            sx={{
                                              fontFamily:
                                                "Playfair Display, serif",
                                              fontSize: "1.1rem",
                                              fontWeight: 600,
                                              color: "#fff",
                                              mb: 0.5,
                                            }}
                                          >
                                            {item.translations?.en?.name ||
                                              "İsimsiz Ürün"}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: "1rem",
                                              color: "#ffd700",
                                              fontWeight: 500,
                                              mb: 0.5,
                                            }}
                                          >
                                            {item.price
                                              ? `${item.price} ₺`
                                              : "Fiyat yok"}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: "0.95rem",
                                              color: "#cccccc",
                                              fontStyle: "italic",
                                            }}
                                          >
                                            {item.translations?.en
                                              ?.description || "Açıklama yok"}
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 1,
                                            alignItems: "center",
                                          }}
                                        >
                                          <IconBtn
                                            onClick={async () => {
                                              // Yukarı taşı
                                              if (prodIdx === 0) return;
                                              const prevItem = arr[prodIdx - 1];
                                              await updateDoc(
                                                doc(db, "menuItems", item.id),
                                                { order: prevItem.order }
                                              );
                                              await updateDoc(
                                                doc(
                                                  db,
                                                  "menuItems",
                                                  prevItem.id
                                                ),
                                                { order: item.order }
                                              );
                                              await fetchMenuItems();
                                            }}
                                            colorname="edit"
                                            disabled={prodIdx === 0}
                                          >
                                            ▲
                                          </IconBtn>
                                          <IconBtn
                                            onClick={async () => {
                                              // Aşağı taşı
                                              if (prodIdx === arr.length - 1)
                                                return;
                                              const nextItem = arr[prodIdx + 1];
                                              await updateDoc(
                                                doc(db, "menuItems", item.id),
                                                { order: nextItem.order }
                                              );
                                              await updateDoc(
                                                doc(
                                                  db,
                                                  "menuItems",
                                                  nextItem.id
                                                ),
                                                { order: item.order }
                                              );
                                              await fetchMenuItems();
                                            }}
                                            colorname="edit"
                                            disabled={
                                              prodIdx === arr.length - 1
                                            }
                                          >
                                            ▼
                                          </IconBtn>
                                          <IconBtn
                                            onClick={() =>
                                              handleOpenDialog(item)
                                            }
                                            colorname="edit"
                                          >
                                            <EditIcon sx={{ fontSize: 24 }} />
                                          </IconBtn>
                                          <IconBtn
                                            onClick={() =>
                                              handleDelete(item.id)
                                            }
                                            colorname="delete"
                                          >
                                            <DeleteIcon sx={{ fontSize: 24 }} />
                                          </IconBtn>
                                        </Box>
                                      </ProductCard>
                                    ))}
                                  {prodProvided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </AccordionDetails>
                        </StyledAccordion>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Menu Item Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              maxWidth: { xs: "95vw", sm: 600 },
              m: { xs: 1, sm: "auto" },
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              background: theme.white,
              p: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.4rem",
              color: theme.primary,
              letterSpacing: 1,
              mb: 1,
              textAlign: "center",
              borderBottom: "2px solid rgba(26, 35, 126, 0.1)",
              pb: 2,
            }}
          >
            {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 4 }, mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: theme.primary }}>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(26, 35, 126, 0.2)",
                    },
                    "& .MuiSelect-select": {
                      color: theme.text,
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.translations.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value.replace(/[^0-9.,]/g, ""),
                  })
                }
                InputProps={{
                  endAdornment: (
                    <span
                      style={{
                        color: theme.primary,
                        fontWeight: 700,
                        marginLeft: 8,
                      }}
                    >
                      ₺
                    </span>
                  ),
                }}
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26, 35, 126, 0.2)",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.primary,
                  },
                  "& .MuiInputBase-input": {
                    color: theme.text,
                  },
                }}
              />

              {["en", "tr", "ru"].map((lang) => (
                <Box
                  key={lang}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "#f8f9fa",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <LangBox bgcolor={langColors[lang]}>
                    {lang.toUpperCase()}
                  </LangBox>
                  <TextField
                    label="Name"
                    fullWidth
                    value={formData.translations[lang].name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          [lang]: {
                            ...formData.translations[lang],
                            name: e.target.value,
                          },
                        },
                      })
                    }
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(26, 35, 126, 0.2)",
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.primary,
                      },
                      "& .MuiInputBase-input": {
                        color: theme.text,
                      },
                    }}
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.translations[lang].description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          [lang]: {
                            ...formData.translations[lang],
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(26, 35, 126, 0.2)",
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.primary,
                      },
                      "& .MuiInputBase-input": {
                        color: theme.text,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              pb: 3,
              pt: 2,
              borderTop: "2px solid rgba(26, 35, 126, 0.1)",
            }}
          >
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{
                borderRadius: 20,
                px: 4,
                borderColor: theme.primary,
                color: theme.primary,
                "&:hover": {
                  borderColor: theme.secondary,
                  color: theme.secondary,
                },
              }}
            >
              Cancel
            </Button>
            <ModernButton onClick={handleSave}>Save</ModernButton>
          </DialogActions>
        </Dialog>

        {/* Category Dialog */}
        <Dialog
          open={openCategoryDialog}
          onClose={handleCloseCategoryDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              maxWidth: { xs: "95vw", sm: 400 },
              m: { xs: 1, sm: "auto" },
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              background: theme.white,
              p: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.3rem",
              color: theme.secondary,
              letterSpacing: 1,
              mb: 1,
              textAlign: "center",
              borderBottom: "2px solid rgba(194, 24, 91, 0.1)",
              pb: 2,
            }}
          >
            Add New Category
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 4 }, mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {["en", "tr", "ru"].map((lang) => (
                <TextField
                  key={lang}
                  label={`${lang.toUpperCase()} Name`}
                  value={newCategory.translations[lang]}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      translations: {
                        ...newCategory.translations,
                        [lang]: e.target.value,
                      },
                    })
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(194, 24, 91, 0.2)",
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.secondary,
                    },
                    "& .MuiInputBase-input": {
                      color: theme.text,
                    },
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              pb: 3,
              pt: 2,
              borderTop: "2px solid rgba(194, 24, 91, 0.1)",
            }}
          >
            <Button
              onClick={handleCloseCategoryDialog}
              variant="outlined"
              sx={{
                borderRadius: 20,
                px: 4,
                borderColor: theme.secondary,
                color: theme.secondary,
                "&:hover": {
                  borderColor: theme.primary,
                  color: theme.primary,
                },
              }}
            >
              Cancel
            </Button>
            <ModernButton onClick={handleSaveCategory}>Save</ModernButton>
          </DialogActions>
        </Dialog>

        {/* Category Edit Dialog */}
        <Dialog
          open={openCategoryEditDialog}
          onClose={handleCloseCategoryEditDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              maxWidth: { xs: "95vw", sm: 400 },
              m: { xs: 1, sm: "auto" },
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              background: theme.white,
              p: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.3rem",
              color: theme.primary,
              letterSpacing: 1,
              mb: 1,
              textAlign: "center",
              borderBottom: "2px solid rgba(26, 35, 126, 0.1)",
              pb: 2,
            }}
          >
            Edit Category
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 4 }, mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Category ID"
                value={newCategory.id}
                disabled
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26, 35, 126, 0.2)",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.primary,
                  },
                  "& .MuiInputBase-input": {
                    color: theme.text,
                    opacity: 0.7,
                  },
                }}
              />
              {["en", "tr", "ru"].map((lang) => (
                <TextField
                  key={lang}
                  label={`${lang.toUpperCase()} Name`}
                  value={newCategory.translations[lang]}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      translations: {
                        ...newCategory.translations,
                        [lang]: e.target.value,
                      },
                    })
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(26, 35, 126, 0.2)",
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.primary,
                    },
                    "& .MuiInputBase-input": {
                      color: theme.text,
                    },
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              pb: 3,
              pt: 2,
              borderTop: "2px solid rgba(26, 35, 126, 0.1)",
            }}
          >
            <Button
              onClick={handleCloseCategoryEditDialog}
              variant="outlined"
              sx={{
                borderRadius: 20,
                px: 4,
                borderColor: theme.primary,
                color: theme.primary,
                "&:hover": {
                  borderColor: theme.secondary,
                  color: theme.secondary,
                },
              }}
            >
              Cancel
            </Button>
            <ModernButton onClick={handleSaveCategoryEdit}>Save</ModernButton>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;
