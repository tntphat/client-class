import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { doAddClass } from '../../../redux/slice/apiSlice/classesSlice';
import { InputText } from '../../common';
import useStyles from './FormAddCourse.styles';

export const FormAddCourse = ({ setOpenDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(doAddClass(data));
    setOpenDialog(false);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        error={errors.name}
        label="name"
        name="name"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        error={errors.subject}
        label="subject"
        name="subject"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        error={errors.description}
        label="description"
        name="description"
        register={register}
      />
      <Button type="submit">Ok</Button>
    </form>
  );
};
