import React from 'react'
import { useHistory } from 'react-router-dom'
import './RequestReview.css'

export const RequestReviewCard = ({ reqReview }) => {
    const { courseId, expectationScore, gradeItemId, status, studentId, explanation, name } = reqReview
    const history = useHistory()

    const handelRedirect = () => {
        history.push('/request-review/' + courseId + '/' + gradeItemId)
    }

    return (
        <div className='card-review' onClick={handelRedirect}>
            <div className= {`header-review  ${status}`}>
                <p className='content-header'>{studentId} - {name}</p>
                <div className='status'>
                    {status}
                </div>
            </div>
            <div className='content-container'>
                <div className='field-review'>
                    <p>Expectation grade</p>
                    <div className='content-review'>
                        {
                            expectationScore
                        }
                    </div>
                </div>
                <div className='field-review'>
                    <p>Explanation message</p>
                    <div className='content-review'>
                        {
                            explanation
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}