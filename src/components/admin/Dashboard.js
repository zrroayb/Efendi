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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import { styled } from "@mui/material/styles";

const LangBox = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  borderRadius: 6,
  padding: "4px 12px",
  display: "inline-block",
  fontWeight: 700,
  fontSize: "0.95rem",
  marginBottom: 8,
  marginRight: 8,
  letterSpacing: 1,
}));

const langColors = {
  en: "#1976d2",
  tr: "#388e3c",
  ru: "#d32f2f",
};

// Modern buton stili
const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  fontWeight: 700,
  fontSize: "1rem",
  padding: "10px 28px",
  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
  background: "linear-gradient(90deg, #1976d2 0%, #388e3c 100%)",
  color: "#fff",
  textTransform: "none",
  transition: "all 0.2s",
  "&:hover": {
    background: "linear-gradient(90deg, #388e3c 0%, #1976d2 100%)",
    boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
  },
}));

const IconBtn = styled(IconButton)(({ colorname }) => ({
  borderRadius: 16,
  padding: 8,
  margin: 2,
  fontSize: 22,
  background: "transparent",
  transition: "background 0.2s",
  "&:hover": {
    background:
      colorname === "edit"
        ? "rgba(25, 118, 210, 0.12)"
        : "rgba(211, 47, 47, 0.12)",
    color: colorname === "edit" ? "#1976d2" : "#d32f2f",
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
  const [categoryFilter, setCategoryFilter] = useState("");
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
        await addDoc(collection(db, "menuItems"), formData);
      }
      handleCloseDialog();
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      await addDoc(collection(db, "categories"), newCategory);
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

  // Kategorileri ve ürünleri filtrele
  const categoriesWithItems = categories.filter((category) =>
    menuItems.some((item) => item.category === category.id)
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          mb: 3,
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: { xs: 2, sm: 0 }, fontSize: { xs: "1.3rem", sm: "2rem" } }}
        >
          Menu Management
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormControl
            sx={{
              minWidth: { xs: "100%", sm: 200 },
              mr: { sm: 2 },
              mb: { xs: 1, sm: 0 },
            }}
            size="small"
          >
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Filter by Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.translations.en}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ModernButton
            startIcon={<CategoryIcon />}
            onClick={handleOpenCategoryDialog}
            sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 } }}
          >
            Add Category
          </ModernButton>
          <ModernButton
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add New Item
          </ModernButton>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          mb: 4,
          width: "100%",
          overflowX: "auto",
          background: "#f7fafd",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead
            sx={{
              background: "linear-gradient(90deg, #1976d2 0%, #388e3c 100%)",
              "& th": { fontSize: "1.05rem", letterSpacing: 0.5 },
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                English Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Turkish Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Russian Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems
              .filter(
                (item) => !categoryFilter || item.category === categoryFilter
              )
              .slice()
              .sort((a, b) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                const aName = a.translations.en.name || "";
                const bName = b.translations.en.name || "";
                return aName.localeCompare(bName);
              })
              .map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    borderRadius: 3,
                    boxShadow: 1,
                  }}
                >
                  <TableCell>
                    {categories.find((cat) => cat.id === item.category)
                      ?.translations.en || item.category}
                  </TableCell>
                  <TableCell>{item.price ? `${item.price} ₺` : ""}</TableCell>
                  <TableCell>{item.translations.en.name}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 220,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.translations.en.description}
                  </TableCell>
                  <TableCell>{item.translations.tr.name}</TableCell>
                  <TableCell>{item.translations.ru.name}</TableCell>
                  <TableCell>
                    <IconBtn
                      onClick={() => handleOpenDialog(item)}
                      colorname="edit"
                    >
                      <EditIcon sx={{ fontSize: 22 }} />
                    </IconBtn>
                    <IconBtn
                      onClick={() => handleDelete(item.id)}
                      colorname="delete"
                    >
                      <DeleteIcon sx={{ fontSize: 22 }} />
                    </IconBtn>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            boxShadow: 8,
            background: "linear-gradient(120deg, #f7fafd 60%, #e3f2fd 100%)",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.3rem",
            color: "#1976d2",
            letterSpacing: 1,
            mb: 1,
            textAlign: "center",
            borderBottom: "1px solid #e3f2fd",
            pb: 2,
          }}
        >
          {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 3 }, mt: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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
                    style={{ color: "#1976d2", fontWeight: 700, marginLeft: 4 }}
                  >
                    ₺
                  </span>
                ),
              }}
            />

            {["en", "tr", "ru"].map((lang) => (
              <Box
                key={lang}
                sx={{
                  mt: 2,
                  mb: 1,
                  p: 2,
                  borderRadius: 2,
                  background: "#f7fafd",
                  boxShadow: 1,
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
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
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
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2,
            pt: 1,
            borderTop: "1px solid #e3f2fd",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ borderRadius: 20, px: 4 }}
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
            boxShadow: 8,
            background: "linear-gradient(120deg, #f7fafd 60%, #e3f2fd 100%)",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#388e3c",
            letterSpacing: 1,
            mb: 1,
            textAlign: "center",
            borderBottom: "1px solid #e3f2fd",
            pb: 2,
          }}
        >
          Add New Category
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 3 }, mt: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Category ID"
              value={newCategory.id}
              onChange={(e) =>
                setNewCategory({ ...newCategory, id: e.target.value })
              }
              helperText="Enter a unique identifier for the category (e.g., 'specialCocktails')"
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
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2,
            pt: 1,
            borderTop: "1px solid #e3f2fd",
          }}
        >
          <Button
            onClick={handleCloseCategoryDialog}
            variant="outlined"
            sx={{ borderRadius: 20, px: 4 }}
          >
            Cancel
          </Button>
          <ModernButton onClick={handleSaveCategory}>Save</ModernButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
