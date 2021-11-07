import React from 'react';
import { Paper } from '@mui/material';
import useStyles from './BlankLayout.styles';

export const BlankLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper square variant="none" className={classes.root}>
      {children}
    </Paper>
  );
};
