import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ListCourses } from '../../components/Courses/ListCourses/ListCourses';
import { useDispatch } from 'react-redux';
import { doGetClasses } from '../../redux/slice/apiSlice/classesSlice';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ConfirmDialog } from '../../components/common';
import { FormAddCourse } from '../../components/Courses/FormAddCourse/FormAddCourse';
import { CircularProgress } from '@material-ui/core';

export const Courses = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const { listClasses, isLoading } = useSelector((state) => state.classes);
  useEffect(() => {
    dispatch(doGetClasses());
  }, []);

  // const onOkDialog = () => {};

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <Box pt={5} mx={5}>
      <Button variant="outlined" onClick={handleOpenDialog} startIcon={<AddOutlinedIcon />}>
        New Class
      </Button>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ListCourses ListCourses={listClasses} />
      )}

      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} textBtn="Ok">
        <FormAddCourse setOpenDialog={setOpenDialog} />
      </ConfirmDialog>
    </Box>
  );
};
