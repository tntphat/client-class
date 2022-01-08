import React, { useRef, useState, useEffect } from 'react';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/material';
import useStyles from './Grades.styles';
import { CardGrade } from '../../components/Grades/CardGrade/CardGrade';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { apiClasses } from '../../services/api';

export const Grades = () => {
  const [list, setList] = useState([{ id: 0, title: '', gradePercentage: '' }]);
  const maxIndex = useRef(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [overview, setOverview] = useState(0);
  const [maxIdFromDb, setmaxIdFromDb] = useState(0);
  const [lengthStructFromDb, setLengStructFromDb] = useState(0);
  const history = useHistory();
  let { id } = useParams();

  const CheckIsTeacher = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    if (d.data.isTeacher) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(async () => {
    let per = await CheckIsTeacher(id);
    if (per) {
      apiClasses.getGradeStructure(id).then(({ data }) => {
        if (data.message) return;
        maxIndex.current = data.maxId || 0;
        setmaxIdFromDb(data.maxId || 0);
        const currStruct = JSON.parse(data.gradeStructure);
        setLengStructFromDb(currStruct.length);
        const listIdx = currStruct.map((ele) => ele.id);
        maxIndex.current = Math.max(...listIdx);
        setList([...currStruct, { id: maxIndex.current + 1, title: '', gradePercentage: '' }]);
        setIsPosted(true);
      });
    } else {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (list.length > 1) {
      const cloneList = [...list];
      cloneList.splice(-1);
      setOverview(cloneList.reduce((prev, cur) => prev + +cur.gradePercentage, 0));
    } else setOverview(0);
  }, [list]);

  const handleAddCard = (data) => {
    const listIdx = list.map((ele) => ele.id);
    list[list.length - 1].title = data.title;
    list[list.length - 1].gradePercentage = data.gradePercentage;

    setList(
      listIdx.length
        ? [...list, { id: Math.max(...listIdx, maxIndex.current) + 1 }]
        : [{ id: 0, title: '', gradePercentage: '' }],
    );
  };
  const handleUpdateCard = (data, index) => {
    list[index].title = data.title;
    list[index].gradePercentage = data.gradePercentage;

    setList([...list]);
  };

  const handleDltCard = () => {
    const cloneList = [...list];
    cloneList.splice(-1);
    const listIdx = cloneList.map((ele) => ele.id);
    list[list.length - 1].id = Math.max(...listIdx, maxIndex.current) + 1;
    setList([...list]);
  };
  const classes = useStyles();

  const handleSubmit = () => {
    setIsUpdating(true);
    let gradeStructure;
    let maxIndex;
    list.splice(-1);
    // const maxIndex = Math.max.apply(
    //   Math,
    //   list.map(function (o) {
    //     return o.id;
    //   }),
    // );

    if (!isPosted) {
      gradeStructure = list.map(({ id, ...rest }, index) => ({
        ...rest,
        id: index,
      }));
      maxIndex = gradeStructure.length - 1;
    } else {
      // let clone = [...list];
      // const delta = list.length - lengthStructFromDb.length;
      let count = maxIdFromDb;
      gradeStructure = list.map((item) =>
        item.id > maxIdFromDb ? ++count && { ...item, id: count } : item,
      );
      maxIndex = Math.max.apply(
        Math,
        list.map(function (o) {
          return o.id;
        }),
      );
    }

    apiClasses
      .updateGradeStructure({
        courseId: +id,
        gradeStructure: JSON.stringify(gradeStructure),
        maxId: maxIndex,
      })
      .then(() => {
        history.push(`/course/${id}/infor`);
      })
      .catch(() => {
        history.push('/');
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffcccc',
        overflowX: 'hidden',
        // position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!isUpdating ? (
          <IconButton disabled={isUpdating} onClick={handleSubmit}>
            <CheckCircleOutlineSharpIcon style={{ color: '#1DD1A1', fontSize: '40px' }} />
          </IconButton>
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Box sx={{ boxShadow: 5, my: 5, p: 2, borderRadius: 2 }} className={classes.header}>
        <Typography variant="h4">Grade Structure</Typography>
        <Typography variant="body1">Edit your classroom grade structure</Typography>
        <Typography variant="body2">
          Overview: <b> {overview} </b>
        </Typography>
      </Box>
      {list.map((item, idx) => (
        <CardGrade
          key={item.id}
          item={item}
          setList={setList}
          list={list}
          idx={idx}
          handleAddCard={handleAddCard}
          handleUpdateCard={handleUpdateCard}
          handleDltCard={handleDltCard}
        />
      ))}
    </Box>
  );
};
