import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './Invitation.styles';
import { apiClasses } from '../../services/api';

export const Invitation = () => {
  const [nameCourse, setNameCourse] = useState('');
  const [idCourse, setIdCourse] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(token);
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    apiClasses
      .getInforByToken(token)
      .then((res) => {
        setNameCourse(res.data.name);
        setIdCourse(res.data.id);
      })
      .catch(() => {
        history.push('/');
      });
  }, []);

  const handleClickJoin = () => {
    const promise = location.pathname.includes('ByLink')
      ? apiClasses.joinClassByLink(token)
      : apiClasses.joinClass(token);
    promise.then(() => {
      history.push(`/course/${idCourse}/infor`);
    });
  };

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
            <Button onClick={handleClickJoin} variant="contained">
              Join
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
