import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const Cart = ({ items, onRemoveItem, onClearCart }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    tableNumber: "",
    notes: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
        customerInfo: customerInfo,
        status: "pending",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(collection(db, "orders"), orderData);
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      onClearCart();
      handleCloseDialog();
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbar({
        open: true,
        message: "Error placing order. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Cart
      </Typography>

      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Paper sx={{ mb: 2 }}>
            <List>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`₺${item.price} x ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography sx={{ mr: 2 }}>
                      ₺{item.price * item.quantity}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onRemoveItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">₺{total}</Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOpenDialog}
          >
            Place Order
          </Button>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Complete Your Order</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Table Number"
              name="tableNumber"
              value={customerInfo.tableNumber}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Special Notes"
              name="notes"
              value={customerInfo.notes}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handlePlaceOrder}
            variant="contained"
            color="primary"
            disabled={!customerInfo.name || !customerInfo.tableNumber}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
