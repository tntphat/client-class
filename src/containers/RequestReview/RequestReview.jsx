import { Avatar, Button, Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { InputText, MenuComp, SpinnerWrapper } from '../../components/common';
import { UpdateReviewModal } from '../../components/RequestReview';
import { apiGradeReview, apiClasses } from '../../services/api';

export const RequestReview = () => {

    const { id, courseId } = useParams()
    const history = useHistory()

    const [reqInfor, setReqInfor] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [valueComment, setValueComment] = useState("")
    const [openModel, setOpenModel] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)
    const [status, setStatus] = useState("")
    const [classDetail, setClassDetail] = useState({})

    useEffect(() => {
        setLoading(true)
        getInforRequestReview()
        getDetail(id)
    }, [])

    const getDetail = async (id) => {
        let res = await apiClasses.getClassDetail(id)
        if(res.data)
        {
            setClassDetail(res.data)
        }
    }
    

    const getInforRequestReview = async () => {
        let res = await apiGradeReview.getGradeReviewDetail(id)
        if (res.data) {
            let temp = res.data.gradeReview[0] ?? {}
            setReqInfor(temp)
            setComments(res.data.comments)
        }
        setLoading(false)
    }

    const handleAccept = () => {
        setOpenModel(true)
        setStatus('accept')
    }

    const handleReject = () => {
        setOpenModel(true)
        setStatus('reject')
    }

    const handleSetValueComment = (val) => {
        console.log('val', val);
        setValueComment(val)
    }

    const onClose = () => {
        setOpenModel(false)
        setStatus('')
    }

    const sendUpdateStatus = async (param) => {
        let res = await apiGradeReview.updateScoreAndStatus(param)
        console.log('res', res);
        if (res.data) {
            setStatus("")
        }
    }


    const handleUpdateStatus = ({ newScore }) => {
        console.log('newScore', newScore);
        let param = {
            status: status,
            newScore: newScore,
            courseId: courseId,
            gradeReviewId: id
        }
        sendUpdateStatus(param)
        setOpenModel(false)
    }



    const sendComment = async () => {
        let param = {
            courseId: courseId,
            gradeReviewId: id,
            comment: valueComment
        }
        let res = await apiGradeReview.addComment(param)
        if (res.data) {
            console.log('res', res);
            setValueComment("")
        }
    }

    return (
        <SpinnerWrapper loading={loading}>
            <UpdateReviewModal
                open={openModel}
                onClose={onClose}
                onOk={handleUpdateStatus}
                status={status}

            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 800 }}>
                    <div>
                        <div style={{ display: "flex", justifyContent: 'space-between', borderBottom: "1px solid grey", paddingBottom: 10 }}>
                            <div>
                                <p style={{ fontSize: 25, fontWeight: '500', color: "#2e2eb8" }}>
                                    REQUEST REVIEW - {reqInfor.title?.toUpperCase()}
                                </p>
                                <p>
                                    {reqInfor.studentId} - {reqInfor.name}
                                </p>
                            </div>
                            <div style={{ display: 'flex' }} >
                                <p style={{ fontSize: 18, fontWeight: '500', color: "#2e2eb8", display: 'flex', alignItems: 'center' }}>
                                    {
                                        reqInfor.status?.toUpperCase()
                                    }
                                </p>
                                <MenuComp
                                    array={[
                                        {
                                            title: 'Accept',
                                            callback: (e) => {
                                                e.stopPropagation();
                                                handleAccept()

                                            },
                                        },
                                        {
                                            title: 'Reject',
                                            callback: (e) => {
                                                e.stopPropagation();
                                                handleReject()
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div style={{ padding: 15, borderBottom: "1px solid grey", paddingBottom: 10 }}>

                            <p style={{ fontSize: 20 }}>Expectation grade</p>
                            <div>
                                {
                                    reqInfor.expectationScore
                                }
                            </div>
                            <p style={{ fontSize: 20 }}>Explanation message</p>
                            <div >
                                {
                                    reqInfor.explanation
                                }
                            </div>
                        </div >
                        <div>
                            <p>{comments.length} Comments</p>
                            <div>
                                {
                                    comments.map(i => 
                                        (<div style={{ display: 'flex', marginTop: 15}}>
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <Avatar sx={{ bgcolor: '#e15f41' }}>
                                                    {i.name?.trim()[0]}
                                                </Avatar>
                                            </div>
                                            <div style={{ paddingLeft: 15, minHeight: 50  }}>
                                                <div>
                                                    <span style={{fontSize: 10, marginRight: 10}}>{i.name}</span>
                                                    <span style={{fontSize: 10, marginRight: 10}}>{i.createdAt}</span>
                                                </div>
                                                <div>
                                                    {i.comment}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    )
                                }
                            </div>
                            <div style={{ display: 'flex', marginTop: 15 }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: '#e15f41' }}>
                                        {reqInfor.name?.trim()[0]}
                                    </Avatar>
                                </div>
                                <div style={{ paddingLeft: 15, display: 'flex', justifyContent: 'space-between', width: 780 }}>
                                    <TextField id="outlined-basic" value={valueComment} label="Write comment" variant="outlined" onChange={e => handleSetValueComment(e.target.value)} style={{ width: 600 }} />
                                    <Button variant="outlined" style={{ marginRight: 15 }} onClick={sendComment}>
                                        SEND
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </SpinnerWrapper >
    )
}