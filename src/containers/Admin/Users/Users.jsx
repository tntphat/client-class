import React, { useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, Button, Box } from '@mui/material';
import { ConfirmDialog, MenuComp } from '../../../components/common';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { useEffect } from 'react';
import { DialogUser, FormAddUser } from '../../../components/Admin/Users';
import { doBanUser, doClearErrors, doGetAllAdmins, doGetAllUsers } from '../../../redux/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiAdmin } from '../../../services/apiAdmin';
import useStyles from './Users.style';

const columns = (handleClickView, handleClickBan) => [
  {
    field: 'name',
    headerName: 'name',
    flex: 1,
    width: 140,
    minWidth: 140,
  },
  {
    field: 'mail',
    headerName: 'mail',
    flex: 1,
    width: 140,
    minWidth: 140,
  },
  {
    field: 'studentId',
    headerName: 'Student Id',
    flex: 1,
    width: 140,
    minWidth: 140,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    type: 'date',
    flex: 1,
    width: 140,
    minWidth: 140,
    valueGetter: (row) => row.row.createdAt.slice(0, 10),
  },
  {
    field: 'dummy',
    headerName: '',
    renderCell: (row) => (
      <MenuComp
        array={[
          {
            title: 'View profile',
            callback: () => handleClickView(row.row),
          },
          {
            title: 'Lock',
            callback: () => handleClickBan(row.row.id, !!row.row.deletedAt),
          },
        ]}
      />
    ),
    align: 'right',
  },
];

export const Users = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  // const [openDialog, setOpenDialog] = useState(false);
  const [openDetailUser, setOpenDetailUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const refSelectedRows = useRef([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const classes = useStyles();

  useEffect(() => {
    dispatch(doGetAllUsers());
  }, []);

  useEffect(() => {
    refSelectedRows.current = selectedRows;
  }, [selectedRows]);

  const handleClickView = (user) => {
    setSelectedUser(user);
    setOpenDetailUser(true);
  };

  const handleClickBan = (id, isBanned = false) => {
    // setSelectedUser(user);
    console.log('clicked');
    dispatch(doBanUser({ id, isBanned }));
    // apiAdmin.banUser(user.id);
  };

  return (
    <div style={{ height: 0, minHeight: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={2}>
        <Typography variant="h4">Users</Typography>
        {/* <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add User
        </Button> */}
      </Box>
      {selectedRows.length ? (
        <Box sx={{ display: 'flex' }}>
          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => {
              handleClickBan(refSelectedRows.current);
            }}
          >
            Ban all selected
          </Button>
          <Button
            onClick={() => {
              handleClickBan(refSelectedRows.current, true);
            }}
            variant="outlined"
            startIcon={<LockOpenIcon />}
          >
            Unban all selected
          </Button>
        </Box>
      ) : null}
      <DataGrid
        checkboxSelection
        pageSize={10}
        columns={columns(handleClickView, handleClickBan)}
        rows={users}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        autoHeight
        getRowClassName={(row) => row.row.deletedAt && classes.bannedRow}
      />
      {/* <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} textBtn="Ok">
        <FormAddUser setOpenDialog={setOpenDialog} />
      </ConfirmDialog> */}
      <ConfirmDialog openDialog={openDetailUser} setOpenDialog={setOpenDetailUser} textBtn="Ok">
        <DialogUser selectedUser={selectedUser} />
      </ConfirmDialog>
    </div>
  );
};
