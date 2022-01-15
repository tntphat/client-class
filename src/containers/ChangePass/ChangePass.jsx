import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './ChangePass.styles';
import { apiAuth, apiClasses } from '../../services/api';
import { Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ConfirmDialog, InputText } from '../../components/common';
import { doPushIsLoadingModal, doUpdateInforUser } from '../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useModalLoading } from '../../hooks';

export const ChangePass = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setmsg] = useState('');
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();

  const { user, isLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleOpenModalLoading();
    apiAuth
      .changePassword(data)
      .then((res) => {
        setOpenDialog(true);
        if (res.data.message) setmsg(res.data.message);
        // dispatch(doPushIsLoadingModal(false));
        handleCloseModalLoading();
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (!openDialog) setmsg('');
  }, [openDialog]);

  return (
    <Box px={2}>
      <Typography variant="h3">Change Password</Typography>

      <Avatar
        sx={{ bgcolor: '#e15f41', width: 80, height: 80, margin: '0 auto', fontSize: '40px' }}
      >
        {user?.name.trim()[0]}
      </Avatar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="password"
          error={errors.password}
          label="Current password"
          name="password"
          register={register}
          rules={{ required: 'Pls enter your old pass' }}
        />

        <InputText
          type="password"
          error={errors.newPassword}
          label="New Password"
          name="newPassword"
          register={register}
          rules={{ required: 'Pls enter new pass' }}
        />
        <InputText
          type="password"
          error={errors.confirmPass}
          label="Confirm new Password"
          name="confirmPass"
          register={register}
          rules={{
            required: 'Pls confirm ur new pass',
            validate: (value) =>
              value === watch('newPassword') || 'Ur confirm pass doesnt match above one',
          }}
        />
        <Button variant="contained" type="submit">
          Ok
        </Button>
        {user?.isSocial ? (
          <ConfirmDialog onClickAction={() => history.goBack()} openDialog={true}>
            You registered account with 3rd party. So you can't change ur password.
          </ConfirmDialog>
        ) : null}
        <ConfirmDialog
          onClickAction={() => {
            if (msg === 'change password successfully') history.push('/');
            else setOpenDialog(false);
          }}
          openDialog={openDialog}
        >
          {msg}
        </ConfirmDialog>
      </form>
    </Box>
  );
};
