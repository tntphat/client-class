import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';

export const ModalAddUser = ({onChange, title, open, setOpen}) => {
    const [listUser, setListUser] = useState([])
    const handleClose = () => setOpen(false);

    const handleOnOk = () => {
        handleClose();
        onChange(listUser);
    }

    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    
                    <Typography variant="body2">
                       <Input></Input>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handleOnOk}>Mời</Button>
                </CardActions>
            </Card>

        </Modal>
    )
}