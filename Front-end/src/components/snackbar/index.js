import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';

const CustomSnackbar = ({ message }) => {
    const [open, setOpen] = useState(false);
    const [messageState, setMessageState] = useState('');

    useEffect(() => {
        if (message !== messageState) {
            setMessageState(message);
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    }, [message, messageState]);

    return (
        <Snackbar
            sx={{mt:'40px'}}
            className='w-fit'
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={5000}
            message={message}
        />
    );
};

export default CustomSnackbar;