import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { doMarkReadedAll } from '../../../redux/slice';

export const MenuComp = ({ array, icon, isNoti }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    isNoti && dispatch(doMarkReadedAll());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   if (open) {
  //     onOpen && onOpen();
  //   }
  // }, [open]);

  return (
    <div>
      <div
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {icon || (
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {array.map((i) => {
          return (
            <MenuItem
              key={i.id || i.title}
              onClick={(e) => {
                i.callback(e);
                handleClose();
              }}
            >
              {i.title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
