import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useXlsx } from '../../hooks';
import { dataTemplate } from '../../constants';

export const Home = () => {
  const {
    importFile,
    exportFile,
    onChooseFile,
    isImported,
    setCallbackImport,
    setDataExport,
    setNameFile,
  } = useXlsx('name-file', dataTemplate, console.log);

  return (
    <Box>
      <Button onClick={exportFile}>Click export</Button>
      <Button onClick={onChooseFile}>Click choose file</Button>
      <Button disabled={!isImported} onClick={importFile}>
        Click import file
      </Button>
      <Button
        onClick={() => {
          const cb = (data) => {
            console.log('cb changed:', { data });
          };
          setCallbackImport(cb);
        }}
      >
        test change cb
      </Button>
      <Button
        onClick={() => {
          setDataExport([
            ['MSSV', 'Ten', 'Grade'],
            ['18120502', 'Tô Ng~ Tấn Pát', 10],
            ['18120443', 'Fat', 9],
            ['18120458', 'Phát Tô', 8],
          ]);
        }}
      >
        test change data
      </Button>

      <Button onClick={() => setNameFile('other')}>test change file name</Button>
    </Box>
  );
};
