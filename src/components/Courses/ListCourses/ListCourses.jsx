import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CardCourse from '../CardCourse/CardCourse';

export const ListCourses = ({ listCourses }) => {
  return (
    <Box
      mt={5}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        // width: '100%',
      }}
    >
      {listCourses.length === 0 ? (
        <Typography variant="h5">You haven't joined any class</Typography>
      ) : (
        listCourses?.map((course) => (
          <CardCourse
            id={course.id}
            name={course.name}
            key={course.id}
            teacherName={course.teacherName}
            subject={course.subject}
            isTeacher={course.role !== 'student'}
          />
        ))
      )}
    </Box>
  );
};
