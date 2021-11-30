import React, { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import useStyles from './Grades.styles';
import { CardGrade } from '../../components/Grades/CardGrade/CardGrade';
import { Button } from '@material-ui/core';

export const Grades = () => {
  const [list, setList] = useState([1]);
  // const [listGradeStruct,setListGradeStruct]= useState([])

  const handleAddCard = () => {
    setList(list.length ? [...list, Math.max(...list) + 1] : [1]);
  };
  const classes = useStyles();
  return (
    <Box
      sx={{
        backgroundColor: '#7bed9f',
        overflowX: 'hidden',
        // position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ boxShadow: 5, my: 5, p: 2, borderRadius: 2 }} className={classes.header}>
        <Typography variant="h4">Grade Structure</Typography>
        <Typography variant="body1">Edit your classroom grade structure</Typography>
      </Box>
      {list.map((item, idx) => (
        <CardGrade
          key={item}
          item={item}
          setList={setList}
          list={list}
          idx={idx}
          handleAddCard={handleAddCard}
        />
      ))}
    </Box>
  );
};
