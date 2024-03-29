import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClasses, apiGradeReview } from '../../services/api';
import { RequestReviewCard } from '../../components/RequestReview';
import { SpinnerWrapper } from '../../components/common';
import { useSelector } from 'react-redux';

export const ListRequestReview = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [listReqReview, setListReqReview] = useState(null);
  const [classDetail, setClassDetail] = useState(null);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    getDetail();
  }, []);

  useEffect(() => {
    if (classDetail && classDetail.isTeacher) {
      setLoading(true);
      getListReqReview();
    }
    if (classDetail && !classDetail.isTeacher) {
      setLoading(true);
      getListReqReviewStudent();
    }
  }, [classDetail]);

  const getListReqReview = async () => {
    let res = await apiGradeReview.getAllGradeReview(id);
    if (res.data) {
      console.log('res', res.data);
      setListReqReview(res.data ?? []);
    }
    setLoading(false);
  };

  const getListReqReviewStudent = async () => {
    let res = await apiGradeReview.getAllStudentGradeReview(id);
    if (res.data) {
      console.log('res', res.data);
      setListReqReview(res.data ?? []);
    }
    setLoading(false);
  };

  const getDetail = async () => {
    let res = await apiClasses.getClassDetail(id);
    if (res.data) {
      setClassDetail(res.data);
    }
    setLoading(false);
  };
  console.log(listReqReview);
  return (
    <SpinnerWrapper loading={loading}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {listReqReview &&
            listReqReview.length > 0 &&
            listReqReview.map((req) => <RequestReviewCard key={req.id} reqReview={req} />)}
          {listReqReview && listReqReview.length === 0 && <p>NO REQUEST REVIEW</p>}
        </div>
      </div>
    </SpinnerWrapper>
  );
};
