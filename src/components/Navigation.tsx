import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { RootState } from '../store/store';

const Navigation: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      {isLoggedIn && <NavLink to="/portfolio">Portfolio</NavLink>}
      <NavLink to="/cart">Cart</NavLink>
    </Box>
  );
};

export default Navigation;