import { Box, Paper } from '@mui/material';
import React from 'react';
import { Header } from '../../components/common';
import useStyles from './HeaderLayout.styles';

export const HeaderLayout = ({ children, header, fullWidth, bgColor }) => {
  const classes = useStyles();
  return (
    <Paper
      style={{ maxWidth: fullWidth ? 'unset' : 800, backgroundColor: bgColor || 'white' }}
      square
      variant="none"
      className={classes.root}
    >
      <Box className={classes.header}>{header}</Box>
      <Box className={classes.center}>{children}</Box>
    </Paper>
  );
};
