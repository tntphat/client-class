import React, { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, SpinnerWrapper, MenuComp, RequestReviewModal } from '../../components/common';
import { DataGrid } from '@mui/x-data-grid';
import { apiClasses, apiGrade, apiGradeReview } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const GradeTableForStudent = () => {
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const history = useHistory()

    const [gradeStructure, setGradeStructure] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [messNotification, setMessNotification] = useState('');

    const [openReq, setOpenReq] = useState(false);
    const [requestReviewInfor, setRequestReviewInfor] = useState({})

    const { user } = useSelector((state) => state.user);

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
        console.log("score", score);
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

    const handleRequestReview = (field) => {
        let m = refScore.current;
        setOpenReq(true)
        setRequestReviewInfor({ gradeItemId: m[0][field].grade_item_id})
    };

    const onCloseReqReview = () => {
        setOpenReq(false)
        setRequestReviewInfor({})
    }

    const submitRequestReview = async (param) => {
        let res = await apiGradeReview.addGradeReview(param)
        console.log('res', res);
        if(res.data)
        {
            onOpenDialog('Create request review successfully')
        }
        setLoading(false);
    }
    
    const handleOkReqReview = ({ explanation, expectationScore }) => {
        console.log('explanation', explanation,expectationScore);
        setOpenReq(false)
        let param = {
            gradeItemId: requestReviewInfor.gradeItemId,
            explanation: explanation,
            expectationScore: expectationScore,
            courseId: id,
            studentId: user.studentId
        }
        submitRequestReview(param)
        setLoading(true)
    }


    useEffect(() => {
        setLoading(true);
        getInfor(id);
    }, []);

    useEffect(() => {
        if (user) {
            console.log('user', user);
            setLoading(true);
            getClassGrade();
        }
    }, [user]);



    const getClassGrade = async () => {
        // console.log('userid', user.studentId); 
        let userId = user.studentId;
        if (userId === null) {
            onOpenDialog("You have not mapped the student Id")
        }
        else {
            let res = await apiGrade.getStudentGrade({ courseId: id });
            if (res.data?.length === 0) {
                onOpenDialog("StudentId is not in the grade table")
            }
            else {
                let data = res.data?.map(({ student_id, student_name, id, ...i }) => ({
                    ...i,
                    id: student_id,
                    name: student_name,
                }));
                console.log('data', data);
                setScore(data ?? []);
            }
        }
        setLoading(false);
    };

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d && d.data) {
            let temp = JSON.parse(JSON.parse(d.data?.gradeStructure).gradeStructure) ?? [];
            setGradeStructure(temp);
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
                                            readOnly
                                        />
                                        <div>/10</div>
                                    </div>

                                </div>
                            </div>
                        ),
                        renderHeader: (row) => (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>{i.title}</div>
                                {refScore.current.length > 0 && refScore.current[0][row.field] && <MenuComp
                                    array={[
                                        {
                                            title: 'Create Request review',
                                            callback: (e) => {
                                                e.stopPropagation();
                                                handleRequestReview( row.field);
                                            },
                                        }
                                    ]}
                                />}
                                
                            </div>
                        ),
                        sortable: false,
                    };
                }),
            ]);
        }
        setLoading(false);
    };

    return (
        <SpinnerWrapper loading={loading}>
            <RequestReviewModal
                open={openReq}
                onClose={onCloseReqReview}
                onOk={ handleOkReqReview}
            />
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

                </div>
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
