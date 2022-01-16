import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { apiClasses } from '../../services/api';
import { useSelector } from 'react-redux';
import './ClassInfor.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Menu, MenuItem } from '@mui/material';
import { SpinnerWrapper } from '../../components/common';

export const ClassInfor = () => {
  let { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElGrade, setAnchorElGrade] = useState(null);
  const [linkInvite, setLinkInvite] = useState(null);
  const [gradeStructure, setGradeStructure] = useState([{ title: '', gradePercentage: '' }]);
  const open = Boolean(anchorEl);
  const openGrade = Boolean(anchorElGrade);

  useEffect(() => {
    getInfor(id);
    setLoading(true);
  }, []);

  const getInfor = async (id) => {
    let d = await apiClasses.getClassDetail(id);
    if (d && d.data) {
      setData(d.data);
      console.log(d.data?.gradeStructure);
      if (d.data?.gradeStructure)
        setGradeStructure(JSON.parse(JSON.parse(d.data?.gradeStructure).gradeStructure) ?? []);
    }
    setLoading(false);
  };

  const handleGenLink = () => {
    if (linkInvite) {
      navigator.clipboard.writeText(linkInvite);
      setAnchorEl(null);
    }
  };

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (linkInvite === null) {
      let linkInvite = await apiClasses.getLinkInvite({ courseId: id, teacherId: user.id });
      setLinkInvite(linkInvite?.data?.invitationLink ?? null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseGrade = () => {
    setAnchorElGrade(null);
  };

  const handleClickGrade = async (event) => {
    setAnchorElGrade(event.currentTarget);
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
          <div>
            <div className="cl-code">
              <div className="cl-code-header">
                <p style={{ fontWeight: 'bold' }}>Code</p>
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
                          <ContentCopyIcon /> <p style={{ paddingRight: 15 }}>Copy link</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 15 }}>
                          <p style={{ paddingRight: 15 }}>Creating link</p>
                          <CircularProgress size={24} />
                        </div>
                      )}
                    </div>
                  </MenuItem>
                </Menu>
              </div>
              <div style={{ marginLeft: 15 }}>{id}</div>
            </div>
            <div className="cl-grade-infor">
              <div className="cl-code-header">
                <p style={{ fontWeight: 'bold' }}>Grade structure</p>
                {data?.isTeacher ? (
                  <IconButton aria-label="settings" onClick={handleClickGrade}>
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                  <div></div>
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElGrade}
                  open={openGrade}
                  onClose={handleCloseGrade}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem>
                    <div style={{ display: 'flex' }} onClick={(_) => history.push('/grades/' + id)}>
                      Edit grade structure
                    </div>
                  </MenuItem>
                </Menu>
              </div>
              <div style={{ marginBottom: 10, marginLeft: '10px', marginRight: '30px' }}>
                {gradeStructure.length > 0 ? (
                  gradeStructure.map((i, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{i.title}</p>
                      <p>{i.gradePercentage}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ marginLeft: 5, fontSize: 12 }}>No grade structure</p>
                )}
              </div>
            </div>
          </div>
          <div className="cl-card-contain">
            <div className="cl-card">
              <p style={{ marginLeft: 15 }}>Information classroom</p>
            </div>
          </div>
        </div>
      </div>
    </SpinnerWrapper>
  );
};
