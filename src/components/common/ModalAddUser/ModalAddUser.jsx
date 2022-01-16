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
        else {
            setWarning(true);
        }

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
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
                        <div style={{ fontSize: 25, marginBottom: 15, fontWeight: "bold", color: 'rgb(99,99,99)' }}>
                            {title}
                        </div>

                        <div>
                            <label style={{ marginRight: 15 }}>Email</label>
                            <Input style={{ width: 400 }} onChange={val => setEmail(val.target.value)} ></Input>
                        </div>
                        <div>
                            {
                                warning && (
                                    <div style={{ color: "red" }}>Email incorrect</div>
                                )
                            }
                        </div>

                    </CardContent>
                    <div style={{ display: 'flex', justifyContent: 'end', marginTop: 25 }}>
                        <Button variant='outlined' style={{ marginRight: 15 }} onClick={handleOnOk}>Send</Button>
                        <Button variant='outlined' color="error" onClick={handleClose}>Cancel</Button>
                    </div>
                </Card>
            </Modal>
        </div>
    )
}