import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';

export const SpinnerWrapper = ({ loading, children }) => {
    return (
        <div style={{marginTop: "100px"}}>
            {
                loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "250px" }}>
                        <CircularProgress />
                    </Box> :
                    children
            }
        </div>
    )
}