import React, { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, SpinnerWrapper, MenuComp } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses, apiGrade } from '../../services/api';
import { useParams } from 'react-router-dom';
import './GradeTable.css';
import { useXlsx } from '../../hooks';
import { dataTemplate } from '../../constants';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const GradeTable = () => {
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  // const [editRowsModel, setEditRowsModel] = React.useState({});
  // const handleEditRowsModelChange = React.useCallback((model) => {
  //     setEditRowsModel(model);
  // }, []);
  const [isTeacher, setIsTeacher] = useState(null);

  const [gradeStructure, setGradeStructure] = useState([]);

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
      width: 200,
      renderCell: (row) => <div>{row.value}</div>,
      renderHeader: (row) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 500 }}>
          <p>StudentId</p>
        </div>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 200,
      renderCell: (row) => handleCalScore(row.row),
    },
  ]);

  useEffect(() => {
    refScore.current = score;
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

      let scoreTemp = JSON.parse(JSON.stringify(refScore.current));
      setScore(scoreTemp.concat(listInportedStudent));
    };

    setCbThenImport(cb);
  };

  const handleCalScore = (row) => {
    let temp = '';
    let sum = 0;

    let m = refGrade.current.reduce((pre, cur) => {
      sum += +cur.gradePercentage;
      return Number.isNaN(row[`${cur.id}`].score)
        ? pre
        : pre + cur.gradePercentage * +row[`${cur.id}`].score;
    }, 0);

    let res = m / sum;

    return <div>{res}</div>;
  };

  const handleMarkAll = (field) => {
    let scoreTemp = JSON.parse(JSON.stringify(refScore.current));

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
  };

  const handleSetScore = (id, field, val) => {
    let value = val;
    if (isNaN(value)) {
      value = '';
    } else {
      value = parseInt(val);
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
          isFinal: true,
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

    for (let i = 0; i < score.length; i++) {
      arr.push([score[i].id.toString(), score[i].name]);
    }

    setNameFile('Diem ' + `${title}`);
    setDataThenExport(arr);
  };

  const handleExportStudentList = () => {
    let arr = [['MSSV', 'Ten']];

    for (let i = 0; i < score.length; i++) {
      arr.push([score[i].id.toString(), score[i].name]);
    }
    setDataThenExport(arr);
  };

  const handleUpdateClassGrade = async () => {
    let param = {
      courseId: id,
      gradeList: score.map(({ id, name, ...i }) => ({
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

    let data = res.data?.map(({ student_id, student_name, id, ...i }) => ({
      ...i,
      id: student_id,
      name: student_name,
    }));

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

  const getInfor = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    if (d && d.data) {
      setIsTeacher(d.data.isTeacher);
      let temp = JSON.parse(JSON.parse(d.data?.gradeStructure).gradeStructure) ?? [];
      setGradeStructure(temp);
      setCol([
        ...col,
        ...temp.map((i) => ({
          field: i.id.toString(),
          headerName: i.title,
          width: 250,
          renderCell: (row) => (
            <div>
              {/* <input value={row.value.score} onChange={e => handleSetScore(row.id, row.field, e.target.value.replace(/\D/,''))}/> */}

              <div className="c-input">
                <input
                  type="number"
                  value={row.value?.score}
                  className="input-score"
                  onChange={(e) => handleSetScore(row.id, row.field, e.target.value)}
                />
                <div onClick={(_) => handleMarkASpecificAssignment(row.id, row.field)}>
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
                      handleMarkAll(row.field);
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
        })),
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

      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            paddingRight: '50px',
            paddingBottom: '50px',
          }}
        >
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
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
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            autoHeight
            hideFooter
            rows={score}
            columns={col}
            editMode="row"
            disableColumnMenu
          />
        </div>
      </div>
    </SpinnerWrapper>
  );
};
