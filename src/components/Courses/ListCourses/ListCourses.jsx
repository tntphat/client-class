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
      {ListCourses?.map((a) => (
        <CardCourse id={a.id} name={a.name} key={a.id} subject={a.subject} />
      ))}
    </Box>
  );
};
