import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/common';
import { doGetClasses } from '../../redux/slice';

export const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { listClasses } = useSelector((state) => state.classes);
  // console.log(listClasses);
  useEffect(() => {
    dispatch(doGetClasses());
  }, []);
  return (
    <Box>
      Home
      <Button onClick={() => history.push('/auth')}>auth</Button>
    </Box>
  );
};
