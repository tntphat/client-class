import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SpinnerWrapper } from '../../components/common';
import { apiGradeReview } from '../../services/api';

export const RequestReview = () => {

    const { id, gradeItemId } = useParams()
    const history = useHistory()

    const [reqInfor, setReqInfor] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        getInforRequestReview()
    }, [])

    const getInforRequestReview =  () => {
        let param = {
            courseId: id,
            gradeItemId: gradeItemId
        }

        // let res = await apiGradeReview.getStudentGradeReview(param)
        // if (res.data) {
        //     setReqInfor(res.data)
        // }
        setLoading(false)
    }

    return (
        <SpinnerWrapper loading={loading}>
            <div>
                
            </div>
        </SpinnerWrapper>
    )
}