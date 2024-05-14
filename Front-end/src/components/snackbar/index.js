import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';

const CustomSnackbar = ({ message }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, 6000);
    }, [message])

    return (
        <div>
            <Snackbar
            sx={{}}
            className='w-fit'
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={5000}
                message={message}
            />
        </div>
    )
}
export default CustomSnackbar;