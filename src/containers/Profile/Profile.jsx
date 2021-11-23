import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './Profile.styles';
import { apiClasses } from '../../services/api';
import { Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputText } from '../../components/common';
import { doUpdateInforUser } from '../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';

export const Profile = () => {
  const [nameCourse, setNameCourse] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { user, isLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('studentId', user.studentId);
    }
  }, [user]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(doUpdateInforUser(data))
      .then(unwrapResult)
      .then(() => history.push('/'));
    // dispatch(doAddClass(data));
    // setOpenDialog(false);
  };

  return (
    <Box px={2}>
      <Typography variant="h3">Profile</Typography>

      <Avatar
        sx={{ bgcolor: '#e15f41', width: 80, height: 80, margin: '0 auto', fontSize: '40px' }}
      >
        {user?.name.trim()[0]}
      </Avatar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          error={errors.name}
          label="Name"
          name="name"
          register={register}
          rules={{ required: true }}
        />

        <InputText
          error={errors.studentId}
          label="StudentId"
          name="studentId"
          register={register}
          rules={{ required: true }}
        />
        <Button variant="contained" type="submit">
          Ok
        </Button>
      </form>
    </Box>
  );
};
