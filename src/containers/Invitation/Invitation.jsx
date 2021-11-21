import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './Invitation.styles';
import { apiClasses } from '../../services/api';

export const Invitation = () => {
  const [nameCourse, setNameCourse] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    apiClasses
      .getClassDetail(1)
      .then((res) => {
        setNameCourse(res.data.name);
      })
      .catch(() => {
        history.push('/');
      });
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box px={4} py={4} className={classes.invitationBox}>
          <Typography variant="h5">Join class ?</Typography>
          <Typography variant="subtitle2">
            You've been invited to join {nameCourse}. You're signed in as
            <b>
              {' '}
              {user?.name}({user?.mail}).
            </b>
          </Typography>
          <Box mt={1}>
            <Button variant="contained">Join</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
