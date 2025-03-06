// src/components/Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { AppDispatch } from '../store/store';
import ChatBot from './ChatBot';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              borderBottom: location.pathname === '/' ? '2px solid white' : 'none'
            }}
          >
            Vijay Store
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/portfolio"
              sx={{
                borderBottom: location.pathname === '/portfolio' ? '2px solid white' : 'none'
              }}
            >
              Portfolio
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/contact"
              sx={{
                borderBottom: location.pathname === '/contact' ? '2px solid white' : 'none'
              }}
            >
              <Link to="/contact">
                <Button color="inherit">Contact Me</Button>
              </Link>
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/cart"
              sx={{
                borderBottom: location.pathname === '/cart' ? '2px solid white' : 'none'
              }}
            >
              Cart
            </Button>
            {isAuthenticated ? (
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{
                    borderBottom: location.pathname === '/login' ? '2px solid white' : 'none'
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/signup"
                  sx={{
                    borderBottom: location.pathname === '/signup' ? '2px solid white' : 'none'
                  }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        position: 'fixed', 
        top: 70, // Positions below navbar
        right: 20, // Aligns to right side
        zIndex: 1200 
      }}>
        <ChatBot />
      </Box>
    </>
  );
};

export default Header;
