import { useEffect, useRef, useState } from 'react';
import XLSX from 'xlsx';
import { useFnState } from '.';

export const useXlsx = (nameFile, initialDataExport, initialCallbackImport) => {
  const refInput = useRef(null);
  const refFile = useRef(null);
  const [isImported, setIsImported] = useState(false);
  const [dataExport, setDataExport] = useState(initialDataExport);
  const [callbackImport, setCallbackImport] = useFnState(initialCallbackImport);

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.hidden = true;
    input.accept = SheetJSFT;
    refInput.current = input;
    input.addEventListener('change', (e) => {
      refFile.current = e.target.files[0];
      setIsImported(!!refFile.current);
    });
    return () => {
      input.remove();
    };
  }, []);

  const onChooseFile = () => {
    refInput.current && refInput.current.click();
  };

  const exportFile = () => {
    const ws = XLSX.utils.aoa_to_sheet(dataExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    const file = (nameFile || 'data') + '.xlsx';
    XLSX.writeFile(wb, file);
  };

  const importFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      callbackImport && callbackImport(data);
    };
    if (rABS) reader.readAsBinaryString(refFile.current);
    else reader.readAsArrayBuffer(refFile.current);
  };

  return { importFile, exportFile, onChooseFile, setDataExport, setCallbackImport, isImported };
};

/* list of supported file types */
const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map(function (x) {
    return '.' + x;
  })
  .join(',');
