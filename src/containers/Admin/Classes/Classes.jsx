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
import { doClearErrors, doGetAllAdmins, doGetAllClasses } from '../../../redux/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const columns = (handleClickView) => [
  {
    field: 'name',
    headerName: 'name',
    flex: 1,
    width: 140,
    minWidth: 140,
  },
  {
    field: 'subject',
    headerName: 'subject',
    flex: 1,
    width: 140,
    minWidth: 140,
  },
  {
    field: 'description',
    headerName: 'description',
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
        ]}
      />
    ),
    align: 'right',
  },
];

export const Classes = () => {
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [openDialog, setOpenDialog] = useState(false);
  const [openDetailUser, setOpenDetailUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  // const refSelectedRows = useRef([]);
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(doGetAllClasses());
  }, []);

  // useEffect(() => {
  //   refSelectedRows.current = selectedRows;
  // }, [selectedRows]);

  const handleClickView = (user) => {
    setSelectedUser(user);
    setOpenDetailUser(true);
  };

  return (
    <div style={{ height: 0, minHeight: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={2}>
        <Typography variant="h4">Classes</Typography>
        {/* <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add User
        </Button> */}
      </Box>
      <DataGrid
        pageSize={10}
        columns={columns(handleClickView)}
        rows={classes}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        autoHeight
        disableSelectionOnClick
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
