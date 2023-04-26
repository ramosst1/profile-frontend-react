
import React from 'react'
import ModalWindow from '../../components/ui/windowsModals/ModalWindow';
import { Box, Button, Grid, TextField } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
export default function LoginForgotModal(props: {onCancel:any, onSentPasswordReset:any}) {

    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSendRestPassword(){
        props.onSentPasswordReset();
    }

    return (
        <>
            <ModalWindow title='Forgot Password' width='30%' onClose={handleCancelModal} >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={0} textAlign='center' xs={12}>
                        <Grid container spacing={1} >
                            <Grid item xs={12} textAlign='left'>
                                <TextField required type="email" label="Email" id="uxEmail" variant="standard"/>
                            </Grid>

                            <Grid item xs={6} textAlign='right' >
                                <Button variant='contained' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleCancelModal} 
                                    startIcon={<CancelOutlinedIcon/>} 
                                >cancel</Button>
                            </Grid>
                            <Grid item xs={6} textAlign='left' >
                                <Button variant='contained' onClick={handleOnSendRestPassword } style={{ padding: 4, margin: 10, borderRadius: 25 }} 
                                    startIcon={<MailOutlineOutlinedIcon/>}
                                >send password reset</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </ModalWindow>
        </>
    );
}