import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClasses, apiGrade, apiUser } from '../../services/api';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './ClassDetail.css';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircularProgress from '@mui/material/CircularProgress';

import { ModalAddUser } from '../../components/common';
import { Box, sizeHeight } from '@mui/system';
import { Menu, MenuItem, Modal, Typography } from '@mui/material';

export const ClassDetail = () => {
  let { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [value, setValue] = useState('1');
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [inforApi, setInforApi] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [linkInvite, setLinkInvite] = useState(null);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    if (newValue == '2' && teachers.length === 0 && students.length === 0) {
      setLoading(true);
      getStudentAndTeacher(id);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (linkInvite === null) {
      let linkInvite = await apiClasses.getLinkInvite({ courseId: id, teacherId: user.id });
      console.log('linkInvite', linkInvite);
      setLinkInvite(linkInvite?.data?.invitationLink ?? null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getInfor(id);
    getStudentGrade(id);
    setLoading(true);
    setValue('1');
  }, []);

  const getStudentAndTeacher = async (id) => {
    try {
      let res = await apiUser.getUserInClass({ courseId: id });
      res = res?.data ?? [];
      if (res) {
        console.log(res, typeof res);
        setTeachers(res?.users?.filter((i) => i.isTeacher) ?? []);
        setStudents(res?.users?.filter((i) => !i.isTeacher) ?? []);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getInfor = async (id) => {
    let d = await apiClasses.getClassDetail(id);

    if (d && d.data) {
      console.log(d.data);
      setData(d.data);
      setLoading(false);
    }
  };

  const getStudentGrade = async (id) => {
    console.log('getting student grade');
    let d = await apiGrade.getStudentGrade({ courseId: id });
    console.log(d.data, 'ok');
    // if (d && d.data) {
    //   console.log(d.data);
    //   setData(d.data);
    //   setLoading(false);
    // }
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

  const handleGenLink = () => {
    if (linkInvite) {
      navigator.clipboard.writeText(linkInvite);
      setAnchorEl(null);
    }
  };

  const handleCloseNotify = () => {
    setOpenNotify(false);
  };

  return (
    <div>
      <Modal
        open={openNotify}
        onClose={handleCloseNotify}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            width: 250,
            height: 150,
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông tin
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {inforApi}
          </Typography>
        </Box>
      </Modal>
      <div className="cl-nav">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab value="1" label="BẢNG TIN" />
          <Tab value="2" label="THÀNH VIÊN" />
          <Tab value="3" label="BẢNG ĐIỂM" />
        </Tabs>
      </div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <div className={value !== '1' ? 'cl-hidden' : ''}>
            <div>
              <div className="cld-card">
                <div className="cld-infor">
                  <h2>{data?.name}</h2>
                  <p>{data?.description}</p>
                </div>
              </div>
              <div className="cl-body">
                <div className="cl-code">
                  <div className="cl-code-header">
                    <p>Mã lớp</p>
                    {data?.isTeacher ? (
                      <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                    ) : (
                      <div></div>
                    )}

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleGenLink}>
                        <div style={{ display: 'flex' }}>
                          {linkInvite ? (
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 15 }}>
                              <p style={{ paddingRight: 15 }}>Copy link mời</p> <ContentCopyIcon />{' '}
                              {linkInvite}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 15 }}>
                              <p style={{ paddingRight: 15 }}>Đang tạo link mời </p>
                              <CircularProgress size={24} />
                            </div>
                          )}
                        </div>
                      </MenuItem>
                    </Menu>
                  </div>
                  <div style={{ marginLeft: 15 }}>{id}</div>
                </div>
                <div className="cl-card">
                  <p style={{ marginLeft: 15 }}>Thông báo nội dung cho lớp học</p>
                </div>
              </div>
            </div>
          </div>
          <div className={value !== '2' ? 'cl-hidden' : ''}>
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
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
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
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
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
          <div className={value !== '3' ? 'cl-hidden' : ''}></div>
        </div>
      )}
    </div>
  );
};
