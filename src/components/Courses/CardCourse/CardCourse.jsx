import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useStyles from './CardCourse.styles';
import { useHistory } from 'react-router';

export default function CardClass({ name, subject, id, teacherName, isTeacher }) {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Card className={classes.root} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="50"
        image={
          isTeacher
            ? 'https://gstatic.com/classroom/themes/Geography.jpg'
            : `https://gstatic.com/classroom/themes/img_read.jpg`
        }
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {teacherName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subject}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained" size="small" onClick={() => history.push("/course/" + id + "/infor")} color={isTeacher ? 'primary' : 'secondary'}>
          go to class
        </Button>
      </CardActions>
    </Card>
  );
}
