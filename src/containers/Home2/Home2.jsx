import { Button } from '@material-ui/core';
import { Box } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Home2 = () => {
  const history = useHistory();
  return (
    <Box>
      <Button onClick={() => history.push('/home')}>click</Button>
    </Box>
  );
};
