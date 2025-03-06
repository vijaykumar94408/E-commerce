import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
