import React, { useEffect, useState } from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import ModalWindow from "../../components/ui/windowModals/ModalWindow";
import LoginRegisterModal from "./login-signup-modal";
import LoginForgotModal from "./login-forgot-modal";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function LoginModal(
    props: {onClose:any, onLogIn:any}
){

    const ACTION_LOGIN = 'LOGIN';
    const ACTION_FORGOT_PASSWORD = 'FORGOT PASSWORD';
    const ACTION_LOGIN_SIGNUP = 'LOGIN REGISTRATION';
    const ACTION_CANCEL = 'CANCEL';

    const [isLoginScreen, setIsLoginScreen] = useState(true);
    const [isRegisterScreen, setIsRegisterScreen] = useState(false);
    const [isForgotPasswordScreen, setIsForgotPasswordScreen] = useState(false);

    // const [showPassword, setShowPassword] = React.useState(false);

    useEffect(() => {

        return() => {
            toggleFeatures(ACTION_LOGIN);
        };
    }, [])

    function handleCancelModal(){
        toggleFeatures(ACTION_LOGIN);

        props.onClose();
    };

    function handleOnSignIn(){
        toggleFeatures(ACTION_LOGIN);

        props.onLogIn();
    }

    function handleOnSignupCloseModal(){
        toggleFeatures(ACTION_LOGIN);
    }
    
    function handleOnSignupModal(){
        toggleFeatures(ACTION_LOGIN);
    };

    function handleForgotPasswordOpenModal(){
        toggleFeatures(ACTION_FORGOT_PASSWORD);
    }

    function handleSignupOpenModal(){
        toggleFeatures(ACTION_LOGIN_SIGNUP);
    }


    function toggleFeatures(area: string){
        switch(area) {
            case ACTION_LOGIN: 
                setIsLoginScreen(true);
                setIsRegisterScreen(false);
                setIsForgotPasswordScreen(false);
                break;
            case ACTION_FORGOT_PASSWORD :
                setIsLoginScreen(false);
                setIsForgotPasswordScreen(true);
                setIsRegisterScreen(false);
                break;
            case ACTION_LOGIN_SIGNUP:
                setIsLoginScreen(false);
                setIsForgotPasswordScreen(false);
                setIsRegisterScreen(true);
                break;
            case ACTION_CANCEL:
                setIsLoginScreen(true);
                setIsForgotPasswordScreen(false);
                setIsRegisterScreen(false);
        };
    };

    function handleOnForgotPasswordCloseModal(){
        toggleFeatures(ACTION_LOGIN);
    };

    function handleOnForgotPasswordSentPasswordReset() {
        toggleFeatures(ACTION_LOGIN);
    }

    return (
        <>
            {isLoginScreen && (
                <ModalWindow title='Login Screen' width='40%' onClose={handleCancelModal} >
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
                                <Grid item xs={12} textAlign='center'>
                                    <TextField required type="email" label="Email" id="uxEmail" variant="standard"/>
                                </Grid>
                                <Grid item xs={12} textAlign='center'>
                                    <TextField type="text" label="Password" id='uxPassword' variant="standard" />
                                </Grid>
                                <Grid item xs={6} textAlign='right' >
                                    <Button variant='text' color='secondary' onClick={handleForgotPasswordOpenModal}>forgot password</Button>
                                    <Button variant='text' color='secondary' onClick={handleSignupOpenModal}>sign up</Button>
                                    <Button variant='contained' color='primary' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleCancelModal}
                                        startIcon={<CancelOutlinedIcon/>}
                                    >cancel</Button>
                                </Grid>
                                <Grid item xs={6} textAlign='left' >
                                    <Button variant='contained' color='primary' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleOnSignIn }
                                        startIcon={<LockOpenIcon/>}
                                    >sign in </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>                    
                </ModalWindow>
            )}

            {isForgotPasswordScreen && <LoginForgotModal onCancel={handleOnForgotPasswordCloseModal} onSentPasswordReset={handleOnForgotPasswordSentPasswordReset}/> }

            {isRegisterScreen && <LoginRegisterModal onCancel={handleOnSignupCloseModal} onSignup={handleOnSignupModal} /> }
        </>
    );
};