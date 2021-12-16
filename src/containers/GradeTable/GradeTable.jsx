import React, { useEffect, useState } from 'react'
import { SpinnerWrapper } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses } from '../../services/api';
import { useParams } from 'react-router-dom';

export const GradeTable = () => {
    const [loading, setLoading] = useState(false)
    let { id } = useParams();
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    const [score, setScore] = useState(
        [
            {
                id: 18120458,
                name: "luong",
                grade1: 10,
                grade2: 9
            },
            {
                id: 18120443,
                name: "long",
                grade1: 10,
                grade2: 9
            },
            {
                id: 18120502,
                name: "phat",
                grade1: 10,
                grade2: 9
            },
        ]
    )

    const [col, setCol] = useState([
        { 
            field: 'id', 
            type: 'number', 
            editable: false, 
            width: 200,
            renderCell: ({value}) => (<div>{value}</div>),
            renderHeader: () => (<div> studentId aa</div>)
            // valueGetter: getFullName,
        },
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 200, 
            editable: false
        }
    ])

    useEffect(() => {
        setLoading(true);
        getInfor(id);
    }, [])

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d && d.data) {
            let temp = (JSON.parse(JSON.parse(d.data?.gradeStructure)) ?? []);
            setCol([...col, ...temp])
        }
        setLoading(false);
      };



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

    const rows = [
        {
            id: 1000,
            name: "luong",
            grade1: 10,
            grade2: 9
        }
    ];



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
            <div style={{ width: '100%' }}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        pagination={false}
                        rows={rows}
                        columns={col}
                        editRowsModel={editRowsModel}
                        editMode="row"
                        onEditRowsModelChange={handleEditRowsModelChange}
                        disableColumnMenu
                    />
                </div>
            </div>
        </SpinnerWrapper>
    )
}