import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, Container, Paper, Typography, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  CheckCircle 
} from '@mui/icons-material';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const handleCheckout = () => {
    setOpenModal(true);
  };
  const handleConfirmOrder = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setOpenModal(false);
      setOrderComplete(false);
      dispatch(clearCart());  // Use the imported action creator
    }, 2000);
  };

  console.log('Cart State:', cartItems); // Debug log

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total only if cartItems exists
  const total = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      minHeight: '80vh', 
      py: 4 
    }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Shopping Cart ({cartItems?.length || 0} items)
          </Typography>
          
          {!cartItems || cartItems.length === 0 ? (
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Your cart is empty
            </Typography>
          ) : (
            <>
              {cartItems.map((item) => (
                <Paper 
                  key={item.id} 
                  elevation={1} 
                  sx={{ 
                    p: 3, 
                    mb: 2, 
                    display: 'flex', 
                    gap: 3,
                    alignItems: 'center' 
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      bgcolor: '#f5f5f5',
                      p: 1,
                      borderRadius: 1
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${item.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleRemove(item.id)}
                        color="error"
                        sx={{ ml: 'auto' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
              
              <Box sx={{ 
                mt: 4, 
                pt: 3, 
                borderTop: 1, 
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="h5">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ minWidth: 200 }}
                  onClick={handleCheckout}  // Use the handleCheckout function here
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      <Dialog
        open={openModal}
        onClose={() => !orderComplete && setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        {orderComplete ? (
          <DialogContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography color="text.secondary">
              Thank you for your purchase.
            </Typography>
          </DialogContent>
        ) : (
          <>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Are you sure you want to place this order?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Amount: ${total.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                onClick={handleConfirmOrder}
                autoFocus
              >
                Confirm Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Cart;