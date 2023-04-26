import React from "react";
import ModalWindow from "../../components/ui/windowModals/ModalWindow";
import { Box, Button, Grid, TextField } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function LoginSignupModal(    props: {onCancel:any, onSignup:any}){

    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSignup(){
        props.onSignup();
    }

    return (
        <>
            <ModalWindow title='Sign Up' width='50%' onClose={handleCancelModal} >
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
                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="text" label="First Name" id="uxFirstName" variant="standard"/>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="text" label="Last Name" id="uxLastName" variant="standard"/>
                        </Grid>

                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="email" label="Email" id="uxEmail" variant="standard"/>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField type="password" label="Password" id="uxPassword" variant="standard" />
                        </Grid>

                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="email" label="Email Confirm" id="uxEmailConfirm" variant="standard"/>
                        </Grid>
                        <Grid item xs={5} textAlign='left'>
                            <TextField type="password" label="Password Confirm" id="uxPasswordConfirm" variant="standard" />
                        </Grid>

                        <Grid item xs={6} textAlign='right' >
                            <Button variant="contained" type="button" onClick={handleCancelModal} style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<CancelOutlinedIcon/>} >cancel</Button>
                        </Grid>
                        <Grid item xs={6} textAlign='left' >
                            <Button variant="contained" type="button" onClick={handleOnSignup} style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<PersonOutlineOutlinedIcon/>} >register</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
            </ModalWindow>
        </>
    );

};