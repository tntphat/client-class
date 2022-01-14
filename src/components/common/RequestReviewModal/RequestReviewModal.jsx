import React from 'react'
import { InputText } from '../InputText/InputText'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

export const RequestReviewModal = ({ open, onClose, onOk }) => {

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            error={errors.expectationScore}
                            label="Expectation grade"
                            name="expectationScore"
                            register={register}
                            type='number'
                            rules={{ required: true, validate: val => val <= 10 || 'Value must be less than 10' }}
                        />

                        <InputText
                            error={errors.explanation}
                            label="Explanation message"
                            name="explanation"
                            register={register}
                            rules={{ required: true }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: 25 }}>
                            <Button variant="outlined" style={{marginRight: 15}} type="submit">
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