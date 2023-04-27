
import React, { useState } from 'react'
import ModalWindow from '../../components/ui/windowModals/ModalWindow';
import { Box, Button, Grid, TextField } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
export default function LoginForgotModal(props: {onCancel:any, onSentPasswordReset:any}) {

    const [uxInputs, setUxInputs] = useState({
        email: ''
    });


    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSendRestPassword(){
        props.onSentPasswordReset();
    }

    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        handleOnSendRestPassword()
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;
        setUxInputs({ ...uxInputs, [id]: value });
    
      };

    return (
        <>
            <ModalWindow title='Forgot Password' width='30%' onClose={handleCancelModal} >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={0} textAlign='center' xs={12}>
                        <Grid container spacing={1} >
                            <Grid item xs={12} textAlign='left'>
                                <TextField required type="email" label="Email" variant="standard"
                                    id="email" value={uxInputs.email} onChange={handleChange.bind(this)}
                                />
                            </Grid>

                            <Grid item xs={6} textAlign='right' >
                                <Button type='button' variant='contained' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleCancelModal} 
                                    startIcon={<CancelOutlinedIcon/>} 
                                >cancel</Button>
                            </Grid>
                            <Grid item xs={6} textAlign='left' whiteSpace='nowrap' >
                                <Button type='submit' variant='contained' style={{ padding: 4, margin: 10, borderRadius: 25 }} 
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