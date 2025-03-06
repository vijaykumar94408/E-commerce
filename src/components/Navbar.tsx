import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: isActive('/') ? '#fff' : 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: '#fff' }
          }}
        >
          E-Commerce
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/cart"
                startIcon={<ShoppingCartIcon />}
                sx={{ 
                  opacity: isActive('/cart') ? 1 : 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Cart ({cartItems.length})
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
                sx={{ 
                  opacity: isActive('/login') ? 1 : 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/signup"
                sx={{ 
                  opacity: isActive('/signup') ? 1 : 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;