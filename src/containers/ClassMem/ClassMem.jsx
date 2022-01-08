import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClasses, apiUser } from '../../services/api';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './ClassMem.css';

import Avatar from '@mui/material/Avatar';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { ModalAddUser, SpinnerWrapper } from '../../components/common';
import { Box, sizeHeight } from '@mui/system';
import { Menu, MenuItem, Modal, Typography } from '@mui/material';

export const ClassMem = () => {
  let { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [inforApi, setInforApi] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getInfor2(id);
    setLoading(true);
  }, []);

  const getInfor2 = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    let res = await apiUser.getUserInClass({ courseId: id });

    console.log('cay infor 2');
    if (d && d.data && res) {
      res = res?.data;
      console.log(d.data);
      setData(d.data);
      console.log(res, typeof res);
      setTeachers(res?.users?.filter((i) => i.role !== 'student') ?? []);
      setStudents(res?.users?.filter((i) => i.role === 'student') ?? []);
      setLoading(false);
    }
  };

  const handleAddTeacher = async (email) => {
    try {
      console.log('email', email, user);
      let param = {
        email: email,
        courseId: id,
        teacherId: user.id,
        name: user.name,
        role: 'teacher',
      };
      setLoading(true);
      let res = await apiClasses.inviteByEmail(param);
      if (res) {
        console.log('ré', res);
        setInforApi(res?.data?.message ?? '');
        setOpenNotify(true);
        setLoading(false);
      }
    } catch (error) {
      setInforApi('Đã có lỗi xảy ra');
      setLoading(false);
      setOpenNotify(true);
    }
  };

  const handleAddStudent = async (email) => {
    try {
      console.log('email', email, user);
      let param = {
        email: email,
        courseId: id,
        teacherId: user.id,
        name: user.name,
        role: 'student',
      };
      setLoading(true);
      let res = await apiClasses.inviteByEmail(param);
      console.log('resafa ', res);
      if (res) {
        setInforApi(res?.data?.message ?? '');
        setOpenNotify(true);
        setLoading(false);
      }
    } catch (error) {
      setInforApi('Đã có lỗi xảy ra');
      setLoading(false);
      setOpenNotify(true);
    }
  };

  return (
    <SpinnerWrapper loading={loading}>
      <div>
        <div>
          <div className="cl-head-mem">
            <div style={{ fontSize: 30 }}>Giáo viên</div>
            <div className="cl-icon">
              {data?.isTeacher && (
                <Button
                  variant="text"
                  disabled={!data?.isTeacher ?? false}
                  onClick={() => setOpenTeacher(true)}
                >
                  <PersonAddIcon />
                </Button>
              )}
            </div>
          </div>
          <div>
            {teachers.length === 0 && (
              <div className="cl-card-mem">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Không có giáo viên
                </div>
              </div>
            )}
            {teachers.map((i) => (
              <div className="cl-card-mem-teacher" key={i.id}>
                <div className="cl-icon">
                  <Avatar sx={{ bgcolor: '#e15f41', cursor: 'pointer' }}>
                    {i?.name.trim()[0]}
                  </Avatar>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>{i.name}</div>
              </div>
            ))}
          </div>
          <ModalAddUser
            open={openTeacher}
            title="Mời giáo viên"
            onOk={handleAddTeacher}
            setOpen={(val) => setOpenTeacher(val)}
          />
        </div>
        <div>
          <div className="cl-head-mem">
            <div style={{ fontSize: 30 }}>Học sinh</div>
            <div className="cl-icon">
              {data?.isTeacher && (
                <Button
                  variant="text"
                  disabled={!data?.isTeacher ?? false}
                  onClick={() => setOpenStudent(true)}
                >
                  <PersonAddIcon />
                </Button>
              )}
            </div>
          </div>
          <div>
            {students.length === 0 && (
              <div className="cl-card-mem">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Không có học sinh
                </div>
              </div>
            )}

            {students.map((i) => (
              <div className="cl-card-mem" key={i.id}>
                <div style={{ display: 'flex' }}>
                  <div className="cl-icon">
                    <Avatar sx={{ bgcolor: '#e15f41', cursor: 'pointer' }}>
                      {i?.name.trim()[0]}
                    </Avatar>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>{i.name}</div>
                </div>
                <div style={{ paddingLeft: '15px' }}>
                  {i?.studentId ? <p>{i?.studentId}</p> : <p>____</p>}
                </div>
              </div>
            ))}
          </div>
          <ModalAddUser
            open={openStudent}
            title="Mời học sinh"
            onOk={handleAddStudent}
            setOpen={(val) => setOpenStudent(val)}
          />
        </div>
      </div>
    </SpinnerWrapper>
  );
};
