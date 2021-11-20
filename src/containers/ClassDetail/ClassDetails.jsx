import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClasses } from '../../services/api';
import Button from '@mui/material/Button';
import "./ClassDetail.css"
import Tab from '@mui/material/Tab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

export const ClassDetail = () => {
    let { id } = useParams();
    const [value, setValue] = React.useState('1');

    const [data, setData] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getInfor(id);
    }, [])

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);
        if (d && d.data) {
            console.log(d.data);
            setData(d.data)
        }
    }

    return (
        <div>
            <div>
                {/* <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList> */}
            </div>
            <div value="1">
                <div>
                    <div className="cld-card">
                        <div className="cld-infor">
                            <h2>{data.name}</h2>
                            <p>{data.description}</p>
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
            </div>


        </div>
    )
}