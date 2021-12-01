import React from 'react';
import { Paper } from '@mui/material';
import useStyles from './BlankLayout.styles';

export const BlankLayout = ({ children, fullWidth, bgColor }) => {
  const classes = useStyles();
  return (
    <Paper
      style={{ maxWidth: fullWidth ? 'unset' : 800, backgroundColor: bgColor || 'white' }}
      square
      variant="none"
      className={classes.root}
    >
      {bgColor ? (
        <Paper style={{ maxWidth: 800, margin: '0 auto' }} square variant="none">
          {children}
        </Paper>
      ) : (
        children
      )}
    </Paper>
  );
};
