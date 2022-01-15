import React, { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, SpinnerWrapper, MenuComp } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses, apiGrade, apiNotification } from '../../services/api';
import { useParams } from 'react-router-dom';
import './GradeTable.css';
import { useXlsx } from '../../hooks';
import { dataTemplate } from '../../constants';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const GradeTable = () => {
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  // const [editRowsModel, setEditRowsModel] = React.useState({});
  // const handleEditRowsModelChange = React.useCallback((model) => {
  //     setEditRowsModel(model);
  // }, []);
  const [isTeacher, setIsTeacher] = useState(null);

  const [gradeStructure, setGradeStructure] = useState([]);

  useEffect(() => {
    console.log('gradeStructure', gradeStructure);
  }, [gradeStructure]);

  const { exportFile, setDataExport, isImported, setNameFile, setDataThenExport, setCbThenImport } =
    useXlsx('name-file', dataTemplate, (_) => {});
  // } = useXlsx('name-file', dataTemplate, data => { handleImportStudent(data) });

  const [openDialog, setOpenDialog] = useState(false);
  const [messNotification, setMessNotification] = useState('');

  const refScore = useRef([]);
  const refGrade = useRef([]);
  const [score, setScore] = useState([]);

  const [col, setCol] = useState([
    {
      field: 'id',
      type: 'number',
      editable: false,
      flex: 1,
      width: 0,
      minWidth: 100,
      headerName: 'Student Id',
      align: 'left',
      renderHeader: (row) => (
        <div style={{ width: '100%' }}>
          <p>StudentId</p>
        </div>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
      width: 0,
      minWidth: 150,
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      minWidth: 100,
      width: 0,
      // renderCell: (row) => handleCalScore(row.row),
      valueGetter: (cell) => handleCalScore(cell.row),
    },
  ]);

  useEffect(() => {
    refScore.current = score;
    // console.log(score);
  }, [score]);

  useEffect(() => {
    refGrade.current = gradeStructure;
  }, [gradeStructure]);

  const onCloseDialog = () => {
    setOpenDialog(false);
    setMessNotification('');
  };

  const onOpenDialog = (mess) => {
    setMessNotification(mess);
    setOpenDialog(true);
  };

  const handleImportStudent = () => {
    const cb = (data) => {
      // console.log('data', data);
      let listInportedStudent = [];
      for (let i = 1; i < data.length; i++) {
        let id = data[i][0];
        let name = data[i][1];
        let IsExistedStudent = score.filter((i) => i.id == id);

        let obj = {};

        for (let i = 0; i < gradeStructure.length; i++) {
          obj[`${gradeStructure[i].id}`] = {
            score: '',
            isFinal: false,
          };
        }

        if (!(IsExistedStudent.length > 0)) {
          listInportedStudent.push({
            id: id,
            name: name,
            ...obj,
          });
        } else {
          continue;
        }
      }

      console.log('listInportedStudent', listInportedStudent);

      let scoreTemp = JSON.parse(JSON.stringify(refScore.current));
      setScore(scoreTemp.concat(listInportedStudent));
    };

    setCbThenImport(cb);
  };

  const handleCalScore = (row) => {
    let temp = '';
    // console.log('gradeStructure', gradeStructure);

    let sum = 0;
    // console.log(refGrade, row);
    let m = refGrade.current.reduce((pre, cur) => {
      // console.log('asdfa',cur.gradePercentage, row[`${cur.id}`]);
      sum += +cur.gradePercentage;
      return Number.isNaN(row[`${cur.id}`]?.score)
        ? pre
        : pre + cur.gradePercentage * +row[`${cur.id}`]?.score;
    }, 0);

    // console.log('sum', sum);
    let res = m / sum;

    return res.toFixed(2);
  };

  const handleMarkAll = (field, titleCol) => {
    setLoading(true);
    let scoreTemp = JSON.parse(JSON.stringify(refScore.current));
    console.log('field', field);
    let missScore = scoreTemp.filter((i) => {
      let t = { ...i };

      if (
        t[`${field}`].score === '' ||
        t[`${field}`].score === null ||
        t[`${field}`].score === undefined
      ) {
        return true;
      }
      return false;
    });
    // console.log("missScore,missScore", missScore);

    if (missScore.length > 0) {
      onOpenDialog('Cột điểm chưa đủ');
      return;
    }

    let temp = scoreTemp.map((i) => {
      let t = { ...i };

      t[`${field}`] = {
        score: t[`${field}`].score,
        isFinal: true,
      };

      return t;
    });
    setScore([...temp]);
    setTimeout(() => {
      Promise.all([
        apiNotification.createFinalizedNotifications({ courseId: id, title: titleCol }),
        handleUpdateClassGrade(),
      ]);
    }, 50);
  };

  const handleSetScore = (id, field, val) => {
    let value = val;
    if (isNaN(value)) {
      value = '';
    }

    let scoreTemp = JSON.parse(JSON.stringify(refScore.current));
    let temp = scoreTemp.map((i) => {
      if (i.id == id) {
        let t = { ...i };

        // if(t[`${filed}`].score === undefined)

        t[`${field}`] = {
          isFinal: false,
          score: value,
        };
        return t;
      } else {
        return { ...i };
      }
    });
    setScore([...temp]);
  };

  const handleMarkASpecificAssignment = (id, field) => {
    let scoreTemp = JSON.parse(JSON.stringify(refScore.current));
    let temp = scoreTemp.map((i) => {
      if (i.id == id) {
        let t = { ...i };

        // if(t[`${filed}`].score === undefined)

        t[`${field}`] = {
          isFinal: !t[`${field}`].isFinal,
          score: t[`${field}`].score,
        };
        return t;
      } else {
        return { ...i };
      }
    });
    setScore([...temp]);
  };

  const handleDownloadTemplate = (title) => {
    let arr = [['MSSV', 'Ten', 'Diem ' + `${title}`]];

    let scoreTemp = JSON.parse(JSON.stringify(refScore.current));

    for (let i = 0; i < scoreTemp.length; i++) {
      arr.push([scoreTemp[i].id.toString(), scoreTemp[i].name]);
    }

    setNameFile('Diem ' + `${title}`);
    setDataThenExport(arr);
  };

  const handleExportStudentList = () => {
    let arr = [['MSSV', 'Ten']];

    for (let i = 0; i < score.length; i++) {
      arr.push([score[i].id.toString(), score[i].name]);
    }
    console.log(arr);
    setDataThenExport(arr);
  };

  const handleUpdateClassGrade = async () => {
    let param = {
      courseId: id,
      gradeList: refScore.current.map(({ id, name, ...i }) => ({
        ...i,
        studentId: id.toString(),
        studentName: name,
      })),
    };
    let res = await apiGrade.updateClassGrade(param);
    setLoading(false);
    if (res) {
      onOpenDialog('Update successfully');
    } else {
      onOpenDialog('Update error');
    }
  };

  const getClassGrade = async () => {
    let res = await apiGrade.getClassGrade(id);
    console.log('res', res, gradeStructure);

    let data = res.data?.map(({ student_id, student_name, id, ...i }) => ({
      ...i,
      id: student_id,
      name: student_name,
    }));
    console.log('data', data);
    setScore(data ?? []);
  };

  const handleImportScore = (field) => {
    const cb = (data) => {
      let scoreTemp = JSON.parse(JSON.stringify(refScore.current));

      let temp = scoreTemp.map((i) => {
        let t = { ...i };
        let scoreTemp = t[`${field}`]?.score ?? '';

        for (let i = 1; i < data.length; i++) {
          if (t.id == data[i][0]) {
            if (data[i].length === 3) scoreTemp = data[i][2];
            break;
          }
        }

        t[`${field}`] = {
          score: scoreTemp,
          isFinal: false,
        };

        return t;
      });
      setScore([...temp]);
    };

    setCbThenImport(cb);
  };

  const handleExportEntireBoard = () => {
    let title = ['MSSV', 'Ten'];
    for (let i = 0; i < gradeStructure.length; i++) {
      title.push('Diem ' + `${gradeStructure[i].title}`);
    }
    let arr = [title];

    for (let i = 0; i < score.length; i++) {
      arr.push([
        score[i].id.toString(),
        score[i].name,
        ...gradeStructure.map((j) => {
          return score[i][`${j.id.toString()}`]?.score ?? '';
        }),
      ]);
    }

    setDataThenExport(arr);
  };

  useEffect(() => {
    setLoading(true);
    getInfor(id);
    getClassGrade();
  }, []);
  console.log(gradeStructure, 'gradeeeeee');
  const getInfor = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    if (d && d.data) {
      setIsTeacher(d.data.isTeacher);
      let temp = [];
      if (d.data?.gradeStructure) {
        temp = JSON.parse(JSON.parse(d.data?.gradeStructure)?.gradeStructure) ?? [];
        setGradeStructure(temp);
      }

      setCol([
        ...col,
        ...temp.map((i) => {
          const propsWidth = i === 0 ? { width: 250 } : { flex: 1, minWidth: 100, width: 0 };
          return {
            field: i.id.toString(),
            headerName: i.title,
            ...propsWidth,
            renderCell: (row) => (
              <div>
                {/* <input value={row.value.score} onChange={e => handleSetScore(row.id, row.field, e.target.value.replace(/\D/,''))}/> */}

                <div className="c-input">
                  <div className="input-score-container">
                    <input
                      type="number"
                      value={row.value?.score}
                      className="input-score"
                      step="any"
                      onChange={(e) =>
                        +e.target.value <= 10 && handleSetScore(row.id, row.field, e.target.value)
                      }
                    />
                    <div>/10</div>
                  </div>
                  <div
                    className="checkbox-wrapper"
                    onClick={(_) => handleMarkASpecificAssignment(row.id, row.field)}
                  >
                    {row.value?.isFinal ? (
                      <CheckBoxIcon style={{ color: 'green' }} />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </div>
                </div>

                {/* <button onClick={_ => console.log(row)}> a</button> */}
              </div>
            ),
            renderHeader: (row) => (
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>{i.title}</div>
                <MenuComp
                  array={[
                    {
                      title: 'Mark all',
                      callback: (e) => {
                        e.stopPropagation();
                        // console.log('row: ', );
                        handleMarkAll(row.field, row.colDef.headerName);
                      },
                    },
                    {
                      title: 'Export grades',
                      callback: (e) => {
                        e.stopPropagation();
                        handleDownloadTemplate(i.title);
                      },
                    },
                    {
                      title: 'Import grades',
                      callback: (e) => {
                        e.stopPropagation();
                        handleImportScore(row.field);
                      },
                    },
                  ]}
                />
              </div>
            ),
            sortable: false,
          };
        }),
      ]);
    }
    setLoading(false);
  };

  const CheckIsTeacher = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    if (d.data.isTeacher) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <SpinnerWrapper loading={loading}>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onClickAction={onCloseDialog}
        textBtn="Ok"
      >
        {messNotification}
      </ConfirmDialog>

      <div className="grade-table-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '10px',
          }}
        >
          <div>
            <Button
              style={{ textTransform: 'none', marginRight: '5px' }}
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExportStudentList}
            >
              Download template list
            </Button>
            <Button
              style={{ textTransform: 'none' }}
              variant="outlined"
              startIcon={<UploadIcon />}
              color="info"
              onClick={handleImportStudent}
            >
              Upload list student
            </Button>
          </div>

          <Button
            onClick={handleExportEntireBoard}
            style={{ textTransform: 'none' }}
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Export grade board
          </Button>
          {/* <div className="dropdown">
            <button className="dropbtn">Action</button>
            <div className="dropdown-content">
              <a href="#" onClick={handleExportEntireBoard}>
                Export board
              </a>
              <a
                href="#"
                onClick={(e) => {
                  setLoading(true);
                  handleUpdateClassGrade();
                }}
              >
                Update
              </a>
              <a href="#" onClick={(e) => handleExportStudentList()}>
                Export template
              </a>
              <a href="#" onClick={(e) => handleImportStudent()}>
                Import student
              </a>
            </div>
          </div> */}
        </div>
        <Button
          onClick={(e) => {
            setLoading(true);
            handleUpdateClassGrade();
          }}
          style={{ textTransform: 'none', margin: '10px 0 20px' }}
          variant="contained"
          startIcon={<CheckCircleIcon />}
          color="success"
        >
          Save Grade Board
        </Button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            autoHeight
            hideFooter
            rows={score}
            columns={col}
            editMode="row"
            disableColumnMenu
            disableSelectionOnClick
          />
        </div>
      </div>
    </SpinnerWrapper>
  );
};
