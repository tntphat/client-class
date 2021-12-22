import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useXlsx } from '../../hooks';
import { dataTemplate } from '../../constants';

export const Home = () => {
  const { exportFile, isImported, setDataExport, setNameFile, setDataThenExport, setCbThenImport } =
    useXlsx('name-file', dataTemplate, console.log);

  const handleChangeCbOne = () => {
    const cb = (data) => {
      console.log('cb changed:', { data });
    };
    setCbThenImport(cb);
  };

  const handleChangeCbTwo = (field) => {
    const cb = (data) => {
      console.log('CHANGED CB 2:', field, { data });
    };
    setCbThenImport(cb);
  };

  return (
    <Box>
      <Button onClick={exportFile}>Click export</Button>
      {/* <Button disabled={!isImported} onClick={importFile}>
        Click import file
      </Button> */}
      <Button
        onClick={() => {
          handleChangeCbOne();
        }}
      >
        test change cb
      </Button>

      <Button
        onClick={() => {
          handleChangeCbTwo(2);
        }}
      >
        callback change 2
      </Button>
      <Button
        onClick={() => {
          setDataThenExport([
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
