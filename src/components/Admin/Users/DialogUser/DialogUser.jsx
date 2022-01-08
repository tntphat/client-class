import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import SubjectIcon from '@mui/icons-material/Subject';
import BlockIcon from '@mui/icons-material/Block';
import useStyles from './DialogUser.style';
import { apiAdmin } from '../../../../services/apiAdmin';
export const DialogUser = ({ selectedUser }) => {
  const classes = useStyles();
  const isAdmin = !!selectedUser.username;
  useEffect(() => {
    // apiAdmin.getUserDetail(1).then(console.log);
    // apiAdmin.getAdminDetail(selectedUser.userName).then((res) => console.log(res.data));
  });
  return (
    <Box className={classes.root}>
      <Avatar
        sx={{ bgcolor: '#e15f41', width: 80, height: 80, margin: '0 auto', fontSize: '40px' }}
      >
        {selectedUser.name[0]}
      </Avatar>

      <Typography align="center" variant="h5" sx={{ margin: '10px 0 20px' }}>
        {selectedUser.name}
      </Typography>
      {!Number.isNaN(selectedUser.countIsStudent) ? (
        <div className={classes.userCourses}>
          <div>
            <p>Studying {selectedUser.countIsStudent}</p>
            <MenuBookIcon />
          </div>
          <div className={classes.dividerVertical} />
          <div>
            <p>Teaching {selectedUser.countIsTeacher}</p>
            <CastForEducationIcon />
          </div>
        </div>
      ) : null}
      {selectedUser.mail ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <EmailIcon />
          </Box>
          <Typography className={classes.text}>{selectedUser.mail || 'undefined'}</Typography>
        </Box>
      ) : null}

      {selectedUser.subject ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <SubjectIcon />
          </Box>
          <Typography className={classes.text}>{selectedUser.subject || 'undefined'}</Typography>
        </Box>
      ) : null}

      {selectedUser.description ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <DescriptionIcon />
          </Box>
          <Typography className={classes.text}>
            {selectedUser.description || 'undefined'}
          </Typography>
        </Box>
      ) : null}
      {selectedUser.userName || selectedUser.studentId ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <BadgeIcon />
          </Box>
          <Typography className={classes.text}>
            {selectedUser.userName || selectedUser.studentId}
          </Typography>
        </Box>
      ) : null}
      {selectedUser.phoneNumber ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <PhoneIcon />
          </Box>
          <Typography className={classes.text}>{selectedUser.phoneNumber}</Typography>
        </Box>
      ) : null}

      {selectedUser.deletedAt ? (
        <Box className={classes.gridRow}>
          <Box className={classes.iconWrapper}>
            <BlockIcon />
          </Box>
          <Typography className={classes.text}>{selectedUser.deletedAt?.slice(0, 10)}</Typography>
        </Box>
      ) : null}

      <Box className={classes.gridRow}>
        <Box className={classes.iconWrapper}>
          <AccessTimeFilledIcon />
        </Box>
        <Typography className={classes.text}>{selectedUser.createdAt?.slice(0, 10)}</Typography>
      </Box>
    </Box>
  );
};
