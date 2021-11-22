import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClasses, apiUser } from '../../services/api';
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import "./ClassDetail.css"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';

import { ModalAddUser } from '../../components/common';
import { Box, sizeHeight } from '@mui/system';
import { Menu, MenuItem, Modal, Typography } from '@mui/material';

export const ClassDetail = () => {
    let { id } = useParams();
    const user = useSelector(state => state.user.user)
    const [value, setValue] = useState('1');
    const [openTeacher, setOpenTeacher] = useState(false)
    const [openStudent, setOpenStudent] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [waitApi, setwaitApi] = useState(false)
    const [inforApi, setInforApi] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        if (newValue == "2") {
            setLoading(true);
            getStudentAndTeacher(id)
        }

    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getInfor(id);
        setLoading(true)
        setValue("1");
    }, [])

    const getStudentAndTeacher = async (id) => {
        try {
            let res = await apiUser.getUserInClass({ courseId: id })
            res = res?.data ?? []
            if (res) {
                console.log(res, typeof res);
                setTeachers(res?.users?.filter(i => i.isTeacher) ?? [])
                setStudents(res?.users?.filter(i => !i.isTeacher) ?? [])
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
        }
    }

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);

        if (d && d.data) {
            console.log(d.data);
            setData(d.data)
            setLoading(false)
        }
    }

    const handleAddTeacher = async (email) => {
        try {
            console.log("email", email, user);
            let param = {
                email: email,
                courseId: id,
                teacherId: user.id,
                name: user.name,
                role: "teacher"
            }
            setLoading(true);
            let res = await apiClasses.inviteByEmail(param);
            if (res) {
                setwaitApi(false)
                setLoading(false)
            }
        } catch (error) {
            console.log("ádga", error);
            setInforApi(error.message);
            setLoading(false)
        }

    }

    const handleAddStudent = async (email) => {
        try {
            console.log("email", email, user);
            let param = {
                email: email,
                courseId: id,
                teacherId: user.id,
                name: user.name,
                role: "student"
            }
            setLoading(true);
            let res = await apiClasses.inviteByEmail(param);
            if (res) {
                setwaitApi(false)
                setLoading(false)
            }
        } catch (error) {
            setInforApi(error.message);
            setLoading(false)
        }
    }

    const handleGenLink = () => {

    }


    return (
        <div>
            {/* <Modal
                open={loading}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    waitApi ?
                        (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (

                            <Box sx={style} >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Thông tin
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {inforApi}
                                </Typography>
                            </Box>
                        )
                }

            </Modal> */}
            <div className="cl-nav">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab value="1" label="BẢNG TIN" />
                    <Tab value="2" label="THÀNH VIÊN" />
                    <Tab value="3" label="BẢNG ĐIỂM" />
                </Tabs>
            </div>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
                    <CircularProgress />
                </Box> :

                <div>

                    <div className={value !== "1" ? "cl-hidden" : ""}>
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
                                        <IconButton aria-label="settings" onClick={handleClick}>
                                            <MoreVertIcon />
                                        </IconButton>
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
                                                <div style={{ display: "flex" }}>
                                                    <p>Link mời</p>
                                                    <div style={{display:"flex", alignItems:"center"}}>
                                                        <CircularProgress size={24} />
                                                    </div>

                                                </div>
                                            </MenuItem>


                                        </Menu>
                                    </div>
                                    <div style={{ marginLeft: 15 }}>
                                        {id}
                                    </div>
                                </div>
                                <div className="cl-card">
                                    <p style={{ marginLeft: 15 }}>Thông báo nội dung cho lớp học</p>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className={value !== "2" ? "cl-hidden" : ""}>
                        <div>
                            <div className="cl-head-mem">
                                <div style={{ fontSize: 30 }}>Giáo viên</div>
                                <div className="cl-icon">
                                    <Button variant="text" onClick={() => setOpenTeacher(true)}><PersonAddIcon /></Button>
                                </div>
                            </div>
                            <div>
                                {
                                    teachers.map(i => (
                                        <div className="cl-card-mem" key={i.id}>
                                            <div className="cl-icon">
                                                <AccountCircleIcon />
                                            </div>
                                            {i.name}
                                        </div>
                                    ))
                                }
                            </div>
                            <ModalAddUser open={openTeacher} title="Mời giáo viên" onOk={handleAddTeacher} setOpen={val => setOpenTeacher(val)} />
                        </div>
                        <div>
                            <div className="cl-head-mem">
                                <div style={{ fontSize: 30 }}>Học sinh</div>
                                <div className="cl-icon">
                                    <Button variant="text" onClick={() => setOpenStudent(true)}><PersonAddIcon /></Button>
                                </div>
                            </div>
                            <div>
                                {
                                    students.map(i => (
                                        <div className="cl-card-mem" key={i.id}>
                                            <div className="cl-icon">
                                                <AccountCircleIcon />
                                            </div>
                                            {i.name}
                                        </div>
                                    ))
                                }
                            </div>
                            <ModalAddUser open={openStudent} title="Mời học sinh" onOk={handleAddStudent} setOpen={val => setOpenStudent(val)} />
                        </div>
                    </div>
                    <div className={value !== "3" ? "cl-hidden" : ""}>
                    </div>
                </div>
            }

        </div>
    )
}