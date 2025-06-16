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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    price: "",
    translations: {
      en: { name: "", description: "" },
      tr: { name: "", description: "" },
      ru: { name: "", description: "" },
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenuItems(items);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({
        id: "",
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "menuItems", id));
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Menu Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>English Name</TableCell>
              <TableCell>Turkish Name</TableCell>
              <TableCell>Russian Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.translations.en.name}</TableCell>
                <TableCell>{item.translations.tr.name}</TableCell>
                <TableCell>{item.translations.ru.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="ID"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <TextField
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <TextField
              label="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            {["en", "tr", "ru"].map((lang) => (
              <Box key={lang} sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {lang.toUpperCase()} Translation
                </Typography>
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
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
