import { Button } from '@material-ui/core';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './Invitation.styles';

export const Invitation = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Box px={4} py={4} className={classes.invitationBox}>
        <Typography>JOIN CLASS</Typography>
      </Box>
    </Box>
  );
};
