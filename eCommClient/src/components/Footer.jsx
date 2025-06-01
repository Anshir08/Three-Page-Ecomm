import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 4,
        textAlign: 'center',
        backgroundColor: '#eeeeee',
        borderTop: '1px solid #ccc',
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} MiniShop. All rights reserved.
      </Typography>
    </Box>
  );
}
