import { useEffect, useRef, useState } from 'react';
import XLSX from 'xlsx';
import { useFnState } from '.';

export const useXlsx = (initialNameFile, initialDataExport, initialCallbackImport) => {
  const refInput = useRef(null);
  const [isImported, setIsImported] = useState(false);
  const [nameFile, setNameFile] = useState(initialNameFile);
  const [xlsxFile, setXlsxFile] = useState(null);
  const [dataExport, setDataExport] = useState(initialDataExport);

  const refDataExport = useRef(null);
  const [callbackImport, setCallbackImport] = useFnState(initialCallbackImport);

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.hidden = true;
    input.accept = SheetJSFT;
    refInput.current = input;
    input.addEventListener('change', (e) => {
      setXlsxFile(e.target.files[0]);
      setIsImported(!!e.target.files[0]);
    });
    return () => {
      input.remove();
    };
  }, []);

  useEffect(() => {
    refDataExport.current = dataExport;
  }, [dataExport]);

  useEffect(() => {
    console.log('hi');
    if (!xlsxFile) return;
    importFile();
    setXlsxFile(null);
    refInput.current.value = null;
  }, [xlsxFile]);

  const exportFile = () => {
    const ws = XLSX.utils.aoa_to_sheet(refDataExport.current);
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
    if (rABS) reader.readAsBinaryString(xlsxFile);
    else reader.readAsArrayBuffer(xlsxFile);
  };

  const setDataThenExport = (data) => {
    setDataExport(data);
    setTimeout(exportFile, 50);
  };

  const setCbThenImport = (data) => {
    setCallbackImport(data);
    refInput.current && refInput.current.click();
  };

  return {
    exportFile,
    setDataExport,
    isImported,
    setNameFile,
    setDataThenExport,
    setCbThenImport,
  };
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
