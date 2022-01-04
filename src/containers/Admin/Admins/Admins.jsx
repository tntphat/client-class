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
import { FormAddUser } from '../../../components/Admin/Users';
const columns = [
  {
    field: 'first',
    headerName: 'First',
    flex: 1,
    width: 140,
  },
  {
    field: 'last',
    headerName: 'Last',
    flex: 1,
    width: 140,
  },
  {
    field: 'dummy',
    headerName: '',
    renderCell: () => <Typography>Hhihhi</Typography>,
    align: 'right',
  },
];

const initialRows = [
  {
    id: 1,
    name: 'Jane',
    mail: 'Carter@gmail.com',
    date: '01-01-2022',
  },
  {
    id: 2,
    name: 'Jack',
    mail: 'Smith@gmail.com',
    date: '01-01-2022',
  },
  {
    id: 3,
    name: 'Gill',
    mail: 'Martin@gmail.com',
    date: '01-01-2022',
  },
];

export const Admins = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);
  const refSelectedRows = useRef([]);
  const columns = [
    {
      field: 'name',
      headerName: 'name',
      flex: 1,
      width: 140,
    },
    {
      field: 'mail',
      headerName: 'mail',
      flex: 1,
      width: 140,
    },
    {
      field: 'date',
      headerName: 'date',
      flex: 1,
      width: 140,
    },
    {
      field: 'dummy',
      headerName: '',
      renderCell: () => (
        <MenuComp
          array={[
            {
              title: 'View profile',
              callback: () => {
                console.log('hi');
              },
            },
            {
              title: 'Lock',
              callback: () => {
                console.log('hi');
              },
            },
          ]}
        />
      ),
      align: 'right',
    },
  ];

  useEffect(() => {
    refSelectedRows.current = selectedRows;
  }, [selectedRows]);
  return (
    <div style={{ height: 0, minHeight: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={2}>
        <Typography variant="h4">Admins</Typography>
        <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add User
        </Button>
      </Box>
      {selectedRows.length ? (
        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" startIcon={<LockIcon />}>
            Ban all selected
          </Button>
          <Button variant="outlined" startIcon={<LockOpenIcon />}>
            Unban all selected
          </Button>
        </Box>
      ) : null}
      <DataGrid
        checkboxSelection
        pageSize={10}
        columns={columns}
        rows={initialRows}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} textBtn="Ok">
        <FormAddUser setOpenDialog={setOpenDialog} />
      </ConfirmDialog>
    </div>
  );
};
