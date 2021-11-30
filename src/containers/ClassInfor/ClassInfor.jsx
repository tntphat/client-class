import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClasses } from '../../services/api';
import { useSelector } from 'react-redux'
import "./ClassInfor.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Menu, MenuItem } from '@mui/material';
import { SpinnerWrapper } from '../../components/common';

export const ClassInfor = () => {
    let { id } = useParams();
    const user = useSelector(state => state.user.user)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [linkInvite, setLinkInvite] = useState(null)

    const open = Boolean(anchorEl);

    useEffect(() => {
        getInfor(id);
        setLoading(true)
    }, [])

    const getInfor = async (id) => {
        let d = await apiClasses.getClassDetail(id);

        if (d && d.data) {
            console.log(d.data);
            setData(d.data)
            setLoading(false)
        }
    }

    const handleGenLink = () => {
        if (linkInvite) {
            navigator.clipboard.writeText(linkInvite)
            setAnchorEl(null);
        }
    }

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
        if (linkInvite === null) {
            let linkInvite = await apiClasses.getLinkInvite({ courseId: id, teacherId: user.id })
            console.log("linkInvite", linkInvite);
            setLinkInvite(linkInvite?.data?.invitationLink ?? null);
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <SpinnerWrapper loading={loading}>
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
                            {
                                data?.isTeacher ?
                                    <IconButton aria-label="settings" onClick={handleClick}>
                                        <MoreVertIcon />
                                    </IconButton> :
                                    <div></div>
                            }

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

                                        {
                                            linkInvite ?
                                                <div style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                                                    <p style={{ paddingRight: 15 }}>Copy link mời</p> <ContentCopyIcon /> {linkInvite}
                                                </div> :
                                                <div style={{ display: "flex", alignItems: "center", paddingLeft: 15 }}>
                                                    <p style={{ paddingRight: 15 }}>Đang tạo link mời </p><CircularProgress size={24} />
                                                </div>
                                        }
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
        </SpinnerWrapper>

    )
}