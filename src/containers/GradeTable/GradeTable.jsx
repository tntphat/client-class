import React, { useEffect, useRef, useState } from 'react'
import { ConfirmDialog, SpinnerWrapper } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses } from '../../services/api';
import { useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import './GradeTable.css'
import { useXlsx } from '../../hooks';
import { dataTemplate } from '../../constants';

export const GradeTable = () => {
    const [loading, setLoading] = useState(false)
    let { id } = useParams();
    // const [editRowsModel, setEditRowsModel] = React.useState({});
    // const handleEditRowsModelChange = React.useCallback((model) => {
    //     setEditRowsModel(model);
    // }, []);

    const {
        importFile,
        exportFile,
        onChooseFile,
        isImported,
        setCallbackImport,
        setDataExport,
        setNameFile,
    } = useXlsx('name-file', dataTemplate, data => {handleImportStudent(data)});

    
    const [openDialog, setOpenDialog] = useState(false)
    const [messNotification, setMessNotification] = useState('')

    const refScore = useRef([])
    const [score, setScore] = useState(
        [
            {
                id: 18120458,
                name: "luong",
                "1": {
                    score: 10,
                    isFinal: true
                },
                "0": {
                    score: 10,
                    isFinal: true
                }
            },
            {
                id: 18120443,
                name: "long",
                "1": {
                    score: '',
                    isFinal: false
                },
                "0": {
                    score: 10,
                    isFinal: true
                }

            }
        ]
    )
    const [col, setCol] = useState([
        {
            field: 'id',
            type: 'number',
            editable: false,
            width: 300,
            renderCell: (row) => (
                <div>
                    {row.value}
                    <button onClick={_ => console.log(row)}> log</button>
                </div>),
            renderHeader: row => (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 500 }}>
                    <p>StudentId</p>
                    <button onClick={e => { e.stopPropagation(); console.log(row); }}>loghead</button>
                    <button onClick={e => { e.stopPropagation(); exportFile(e) }}>export template</button>
                    <button onClick={e => { e.stopPropagation(); onChooseFile(e) }}>import template</button>
                </div>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 100,
            editable: false,
            renderHeader: row => headerMenuStudent(row)
        },
        {
            field: "total",
            headerName: 'total',
            width: 100,
            renderCell: (row) => (
                <div>
                    
                </div>
            ),
            renderHeader: row => (
                <button onClick={e => { e.stopPropagation(); handleMarkAll(row.field);  }}>markall</button>
            )
        },
        {
            field: "2",
            headerName: 'Grade1',
            width: 250,
            renderCell: (row) => (
                <div>
                    {/* <input value={row.value.score} onChange={e => handleSetScore(row.id, row.field, e.target.value.replace(/\D/,''))}/> */}

                    <div className='c-input'>
                        <input type='number' value={row.value?.score} className='input-score' onChange={e => handleSetScore(row.id, row.field, e.target.value)} />
                        <p>{row.value?.isFinal ? "marked" : 'nhap'}</p>
                    </div>


                    {/* <button onClick={_ => console.log(row)}> a</button> */}
                </div>
            ),
            renderHeader: row => (
                <button onClick={e => { e.stopPropagation(); handleMarkAll(row.field);  }}>Grade1</button>
            )
        },
        // {
        //     field: "2",
        //     headerName: 'Grade2',
        //     width: 250,
        //     renderCell: (row) => (
        //         <div>
        //             {/* <input value={row.value.score} onChange={e => handleSetScore(row.id, row.field, e.target.value.replace(/\D/,''))}/> */}

        //             <div className='c-input'>
        //                 <input type='number' value={row.value.score} className='input-score' onChange={e => handleSetScore(row.id, row.field, e.target.value)} />
        //                 <p>{row.value.isFinal ? "marked" : 'nhap'}</p>
        //             </div>


        //             {/* <button onClick={_ => console.log(row)}> a</button> */}
        //         </div>
        //     ),
        //     renderHeader: row => (
        //         <button onClick={e => { console.log(row); handleMarkAll(row.field); e.stopPropagation(); }}>Grade2</button>
        //     )
        // },
    ])

    useEffect(() => {
        refScore.current = score
        console.log(score);
    }, [score])

    useEffect(() => {
        if(isImported)
        importFile()
    }, [isImported])

    const onCloseDialog = () => {
        setOpenDialog(false)
        setMessNotification('')
    }

    const onOpenDialog = mess => {
        setMessNotification(mess)
        setOpenDialog(true)
    }

    const handleImportStudent = (data) => {
        console.log('data', data);
        let listInportedStudent = []
        for( let i = 1; i < data.length -1 ; i++)
        {
            let id = data[i][0]
            let name = data[i][1]
            let IsExistedStudent = score.filter( i => i.id === id).length > 0
            if(!IsExistedStudent) {
                listInportedStudent.push({
                    id: id,
                    name: name
                })
            }
            else {
                continue
            }
        }

        let scoreTemp = JSON.parse(JSON.stringify(refScore.current))
        setScore(scoreTemp.concat(listInportedStudent));
    }


    const headerMenuStudent = (row) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <p>StudentId</p>
            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </div>
    )

    const handleMarkAll = (field) => {
        let scoreTemp = JSON.parse(JSON.stringify(refScore.current))

        let missScore = scoreTemp.filter(i => {
            let t = { ...i };

            if (t[`${field}`].score === '' || t[`${field}`].score === null || t[`${field}`].score === undefined) {
                return true
            }
            return false
        })
        console.log("missScore,missScore", missScore);

        if (missScore.length > 0) {
            onOpenDialog('Cột điểm chưa đủ')
            return
        }

        let temp = scoreTemp.map(i => {
            let t = { ...i };

            if (t[`${field}`].score === '' || t[`${field}`].score === null || t[`${field}`].score === undefined) {
                isFullScore = false
            }

            t[`${field}`] = {
                score: t[`${field}`].score,
                isFinal: true
            }

            return t
        })
        setScore([...temp]);
    }

    const handleSetScore = (id, filed, val) => {
        let value = val;
        if (isNaN(value)) {
            value = ''
        }
        else {
            value = parseInt(val);
        }

        let scoreTemp = JSON.parse(JSON.stringify(refScore.current))
        let temp = scoreTemp.map(i => {
            if (i.id == id) {
                let t = { ...i };

                // if(t[`${filed}`].score === undefined)

                t[`${filed}`] = {
                    isFinal: false,
                    score: value
                }
                return t
            }
            else {
                return { ...i }
            }
        })
        setScore([...temp]);
    }


    useEffect(() => {
        console.log('col', col);
    }, [col])

    useEffect(() => {
        setLoading(true);
        getInfor(id);
    }, [])

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d && d.data) {
            let temp = (JSON.parse(JSON.parse(d.data?.gradeStructure)) ?? []);
            // setCol([...col, ...temp.map(i => ({
            //         field: i.index, 
            //         headerName: i.title, 
            //         width: 200, 
            //         type: 'number',
            //         editable: true
            // }))])
            console.log(temp);
            setCol([...col, ...temp.map(i => ({
                field: i.index.toString(),
                headerName: i.title,
                width: 250,
                renderCell: (row) => (
                    <div>
                        {/* <input value={row.value.score} onChange={e => handleSetScore(row.id, row.field, e.target.value.replace(/\D/,''))}/> */}
    
                        <div className='c-input'>
                            <input type='number' value={row.value?.score} className='input-score' onChange={e => handleSetScore(row.id, row.field, e.target.value)} />
                            <p>{row.value?.isFinal ? "marked" : 'nhap'}</p>
                        </div>
    
    
                        {/* <button onClick={_ => console.log(row)}> a</button> */}
                    </div>
                ),
                renderHeader: row => (
                    <button onClick={e => { e.stopPropagation(); handleMarkAll(row.field);  }}>{i.title}</button>
                )
            }))])
        }
        setLoading(false);
    };


    const handelClickMenu = (row) => {
        console.log(row);
    }




    // const getFullName = (params) => {
    //     return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
    //   }


    // const columns = [
    //     { 
    //         field: 'id', 
    //         type: 'number', 
    //         editable: false, 
    //         width: 200,
    //         renderCell: ({value}) => (<div>{value}</div>),
    //         renderHeader: () => (<div> studentId aa</div>)
    //         // valueGetter: getFullName,
    //     },
    //     { field: 'name', headerName: 'Name', width: 200, editable: false },
    //     { field: 'grade1', headerName: 'bt1', width: 200, editable: true },
    //     { field: 'grade2', headerName: 'bt2', width: 200, editable: true }
    // ];




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
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={score}
                        columns={col}
                        // editRowsModel={editRowsModel}
                        editMode="row"
                        // onEditRowsModelChange={handleEditRowsModelChange}
                        disableColumnMenu
                    />
                </div>
            </div>
        </SpinnerWrapper>
    )
}