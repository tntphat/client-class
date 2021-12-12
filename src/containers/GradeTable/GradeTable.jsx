import React, { useState } from 'react'
import { SpinnerWrapper } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses } from '../../services/api';

export const GradeTable = () => {
    const [loading, setLoading] = useState(false)

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    // const getFullName = (params) => {
    //     return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
    //   }


    const columns = [
        { 
            field: 'id', 
            type: 'number', 
            editable: false, 
            renderCell: ({value}) => (<div>{value}</div>),
            renderHeader: () => (<div> studentId aa</div>)
            // valueGetter: getFullName,
        },
        { field: 'name', headerName: 'Name', width: 180, editable: false },
        { field: 'grade1', headerName: 'bt1', width: 180, editable: true },
        { field: 'grade2', headerName: 'bt2', width: 180, editable: true }
    ];

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
                        rows={rows}
                        columns={columns}
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