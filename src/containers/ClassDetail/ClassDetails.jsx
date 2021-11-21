import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClasses } from '../../services/api';
import Button from '@mui/material/Button';
import "./ClassDetail.css"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ModalAddUser } from '../../components/common';

export const ClassDetail = () => {
    let { id } = useParams();
    const [value, setValue] = useState('1');
    const [openTeacher, setOpenTeacher] = useState(false)
    const [openStudent, setOpenStudent] = useState(false)
    const [data, setData] = useState(null)
    const [members, setMembers] = useState({
        teachers: [
            {
                name: "lương"
            },
            {
                name: "ab"
            },
            {
                name: "cd"
            },
        ],
        students: [
            {
                name: "lương1"
            },
            {
                name: "ab2"
            },
            {
                name: "cd3"
            },
        ]
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getInfor(id);
        setValue("1");
    }, [])

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d && d.data) {
            console.log(d.data);
            setData(d.data)
        }
    }

    const handleOpenAddTeacher = () => {
        setOpenTeacher(true);
    }

    const handleAddTeacher = () => {

    }

    const handleOpenAddStudent = () => {
        setOpenStudent(true);
    }

    const handleAddStudent = () => {

    }



    return (
        <div>
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
            <div className={value !== "1" ? "cl-hidden" : ""}>
                {
                    data ? (
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
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        GKNGRC456
                                    </div>
                                </div>
                                <div className="cl-infor">
                                    <div className="cl-card">
                                        Thông báo nội dung cho lớp học
                                    </div>
                                </div>
                            </div>
                            {/* <img src="https://www.gstatic.com/classroom/themes/Biology.jpg" alt="Girl in a jacket" width="1000" height="250" style={{borderRadius: 15}}></img> */}
                        </div>
                    ) :
                        (
                            <div>
                                Loading
                            </div>
                        )
                }

            </div>
            <div className={value !== "2" ? "cl-hidden" : ""}>
                <div>
                    <div className="cl-head-mem">
                        <div style={{ fontSize: 30 }}>Giáo viên</div>
                        <div className="cl-icon">
                            <Button variant="text" onClick={handleOpenAddTeacher}><PersonAddIcon/></Button>
                        </div>
                    </div>
                    <div>
                        {
                            members.teachers.map(i => (
                                <div className="cl-card-mem">
                                    <div className="cl-icon">
                                        <AccountCircleIcon />
                                    </div>
                                    {i.name}
                                </div>
                            ))
                        }
                    </div>
                    <ModalAddUser open={openTeacher} title="Mời giáo viên" onChange={handleAddTeacher} setOpen={val => setOpenTeacher(val)}/>
                </div>
                <div className="cl-head-mem">
                    <div style={{ fontSize: 30 }}>Học sinh</div>
                    <div className="cl-icon">
                        <Button variant="text" onClick={handleAddStudent}><PersonAddIcon onClick={handleAddTeacher} /></Button>
                    </div>
                </div>
                <div>
                    {
                        members.students.map(i => (
                            <div className="cl-card-mem">
                                <div className="cl-icon">
                                    <AccountCircleIcon />
                                </div>

                                {i.name}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={value !== "3" ? "cl-hidden" : ""}>

            </div>


        </div>
    )
}