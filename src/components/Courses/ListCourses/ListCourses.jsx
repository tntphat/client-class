import { Box } from '@mui/system';
import React from 'react';
import CardCourse from '../CardCourse/CardCourse';

export const ListCourses = ({ ListCourses }) => {
  return (
    <Box
      mt={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridGap: 20,
        // width: '100%',
      }}
    >
      {ListCourses?.map((course) => (
        <CardCourse
          id={course.id}
          name={course.name}
          key={course.id}
          teacherName={course.teacherName}
          subject={course.subject}
          isTeacher={course.isTeacher}
        />
      ))}
    </Box>
  );
};
