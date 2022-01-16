import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiClasses, apiGradeReview } from '../../services/api';
import { RequestReviewCard } from '../../components/RequestReview'
import { SpinnerWrapper } from '../../components/common';
import { useSelector } from 'react-redux';

export const ListRequestReview = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [listReqReview, setListReqReview] = useState(null)

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        setLoading(true)
        getListReqReview()
    }, [])

    const getListReqReview = async () => {
        let res = await apiGradeReview.getAllGradeReview(id)
        if (res.data) {
            console.log('res', res.data);
            setListReqReview(res.data ?? [])
        }
        setLoading(false)
    }

    return (
        <SpinnerWrapper loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    {
                        listReqReview && listReqReview.length>0 && listReqReview.map(req => (
                            <RequestReviewCard reqReview={req} />
                        ))
                    }
                    {
                        listReqReview && listReqReview.length===0 && <p>NO REQUEST REVIEW</p>
                    }

                </div>
            </div>

        </SpinnerWrapper>
    )

}