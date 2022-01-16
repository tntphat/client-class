import React from 'react'
import { InputText } from '../../common/InputText/InputText'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

export const UpdateReviewModal = ({ open, onClose, onOk, status, oldScore }) => {

    const onSubmit = (data) => {
        console.log('data', data);
        onOk(data)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #808080',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <div style={{ fontWeight: 500, color: 'grey', fontSize: 20, paddingBottom: 15 }}>
                        UPDATE STATUS
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            error={errors.status}
                            label="STATUS"
                            name="status"
                            register={register}
                            value={status?.toUpperCase()}
                            disabled
                        />

                        {
                            status === 'accept' && <InputText
                                error={errors.newScore}
                                label="New score"
                                name="newScore"
                                register={register}
                                type='number'
                                rules={{ required: true, validate: val => val <= 10 || 'Value must be less than 10' }}
                            />
                        }
                        {
                            status === 'reject' && <InputText
                                error={errors.newScore}
                                label="New score"
                                name="newScore"
                                register={register}
                                value={oldScore}
                                disabled
                            />
                        }

                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: 25 }}>
                            <Button variant="outlined" style={{ marginRight: 15 }} type="submit">
                                Ok
                            </Button>
                            <Button variant="outlined" color="error" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Box>

            </Modal>
        </div>
    )
}