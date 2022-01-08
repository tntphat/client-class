import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

export const ModalLoading = () => {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(0,0,0,.2)',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
