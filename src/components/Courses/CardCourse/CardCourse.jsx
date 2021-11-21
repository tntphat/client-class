import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useStyles from './CardCourse.styles';

export default function CardClass({ name, subject, id }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://picsum.photos/id/${id}/300/200`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {/* {subject} */}
          Tên giáo viên
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subject}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained" size="small">
          go to class
        </Button>
      </CardActions>
    </Card>
  );
}
