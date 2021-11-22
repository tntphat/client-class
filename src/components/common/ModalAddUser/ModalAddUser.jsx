import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';

export const ModalAddUser = ({ onOk, title, open, setOpen }) => {
    const [email, setEmail] = useState(null);
    const [warning, setWarning] = useState(false);
    const handleClose = () => setOpen(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const handleOnOk = () => {
        if (validateEmail(email)) {
            console.log("truoc", email);
            onOk(email);
            setWarning(false);
            setEmail(null);
            handleClose();
        }
        else{
            setWarning(true);
        }

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <CardContent>
                        <div style={{ fontSize: 25, marginBottom: 15, fontWeight: "bold" }}>
                            {title}
                        </div>

                        <div>
                            <label style={{marginRight: 15}}>Email</label>
                            <Input onChange={val => setEmail(val.target.value)} ></Input>
                        </div>
                        <div>
                            {
                                warning && (
                                    <div style={{ color: "red" }}>Email không đúng</div>
                                )
                            }
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleOnOk}>Mời</Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    )
}