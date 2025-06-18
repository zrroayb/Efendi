import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const statusColors = {
  pending: "warning",
  preparing: "info",
  ready: "success",
  completed: "success",
  cancelled: "error",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: Timestamp.now(),
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.items?.length || 0} items</TableCell>
                <TableCell>₺{order.total}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleViewOrder(order)}
                    size="small"
                  >
                    <VisibilityIcon />
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
        {selectedOrder && (
          <>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Order ID: {selectedOrder.id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Date: {formatDate(selectedOrder.createdAt)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Status:{" "}
                  <Chip
                    label={selectedOrder.status}
                    color={statusColors[selectedOrder.status]}
                    size="small"
                  />
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Items:
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₺{item.price}</TableCell>
                          <TableCell>₺{item.price * item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total: ₺{selectedOrder.total}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {selectedOrder.status === "pending" && (
                <>
                  <Button
                    onClick={() =>
                      handleStatusChange(selectedOrder.id, "preparing")
                    }
                    color="primary"
                  >
                    Start Preparing
                  </Button>
                  <Button
                    onClick={() =>
                      handleStatusChange(selectedOrder.id, "cancelled")
                    }
                    color="error"
                  >
                    Cancel Order
                  </Button>
                </>
              )}
              {selectedOrder.status === "preparing" && (
                <Button
                  onClick={() => handleStatusChange(selectedOrder.id, "ready")}
                  color="success"
                >
                  Mark as Ready
                </Button>
              )}
              {selectedOrder.status === "ready" && (
                <Button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, "completed")
                  }
                  color="success"
                >
                  Complete Order
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Orders;
