import React from 'react'
import { InputText } from '../InputText/InputText'
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

export const RequestReviewModal = ({ open }) => {

    const onSubmit = (data) => {
        console.log('data', data);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    return (
        <div>
            <Modal
                open={open}

            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        error={errors.name}
                        label="Expectation grade"
                        name="expectationScore"
                        register={register}
                        rules={{ required: true }}
                    />

                    <InputText
                        error={errors.studentId}
                        label="Explanation message"
                        name="explanation"
                        register={register}
                        rules={{ required: true }}
                    />
                    <Button variant="contained" type="submit">
                        Ok
                    </Button>
                </form>

            </Modal>
        </div>
    )
}