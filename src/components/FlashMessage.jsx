import React, { useState } from 'react';
import SnackBar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FlashMessage({ message, severity, closeMessage }) {
    const [open, setOpen] = useState(true);
    const handleClose = (event, reason) => {
        setOpen(false);
        closeMessage()
      };
    return (
        <SnackBar anchorOrigin={{vertical:'top', horizontal:'center'}} open={open} autoHideDuration={3000} onClose={() =>{
            handleClose();
        }}>
            <Alert onClose={() => {
                handleClose();
                closeMessage();
            }} severity={severity} variant='filled' sx={{ width: '100%' }}>
                {message}
            </Alert>
        </SnackBar>
    );
}