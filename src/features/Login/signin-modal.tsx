import React, { useEffect, useState } from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import ModalWindow from "../../components/ui/window-modals/modal_window";
import LoginSignUpModal from "./signup-modal";
import LoginForgotModal from "./signin-forgot-modal";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import signinService from "./services/signin-service";
import { ISignInResponse } from "./interfaces/signin/signin-responses";
import { ISignInRequest } from "./interfaces/signin/signin-requests";

import ISignInForgotResponse from "./interfaces/signin-forgot/signin-forgot-response";
import useServiceApiResponse from "../../hooks/use-service-api-response";
import IErrorMessageModel from "../../interfaces/api-error-message";
import ErrorMessagesDisplay from "../../components/ui/error_displays/error-messages-display";
import ProcessingDialog from "../../components/ui/dialogs/processing-dialog";

export default function LoginModal(
    props: {onClose:any, onSignIn:any}
){

    const ACTION_LOGIN = 'LOGIN';
    const ACTION_FORGOT_PASSWORD = 'FORGOT PASSWORD';
    const ACTION_LOGIN_SIGNUP = 'LOGIN REGISTRATION';
    const ACTION_CANCEL = 'CANCEL';

    const [isLoginScreen, setIsLoginScreen] = useState(true);
    const [isRegisterScreen, setIsRegisterScreen] = useState(false);
    const [isForgotPasswordScreen, setIsForgotPasswordScreen] = useState(false);

    const [signInResponse, setSignInResponse] = useState<Promise<ISignInResponse> | undefined>();
    const {apiResponse:apiSignInResponse, messages: apiSignInMessages, loading:apiSignInLoading} = useServiceApiResponse<ISignInResponse>(signInResponse);

    const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);


    const [uxInputs, setUxInputs] = useState({
        email:'',
        password: ''
    });
    
    useEffect(() => {

        return() => {
            toggleFeatures(ACTION_LOGIN);
        };
    }, [])

    useEffect(() =>{

        apiSignInMessages && setErrorMessages(apiSignInMessages);

        if(apiSignInResponse?.success !== true) return;

        toggleFeatures(ACTION_LOGIN);

        props.onSignIn(apiSignInResponse);

        // const aSigninUser: ISignInModel = {
        //     loginId: 1,
        //     userName: requestSignInUser.userName,
        //     firstName: "Joe",
        //     lastName: "Smith"
        // }

        // const response: ISignInResponse ={
        //     success: true,
        //     messages: [],
        //     signInUser: aSigninUser
        // }


    }, [apiSignInResponse])

    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        handleOnSignIn()

    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;
        setUxInputs({ ...uxInputs, [id]: value });
    
      };

    function handleCancelModal(){
        toggleFeatures(ACTION_LOGIN);

        props.onClose();
    };

    function handleOnSignIn(){


        const requestSignInUser: ISignInRequest = {
            userName: uxInputs.email,
            password: uxInputs.password
        }

        setSignInResponse(signinService.SignInAsync(requestSignInUser));
    };

    function handleOnSignupCloseModal(){
        toggleFeatures(ACTION_LOGIN);
    };
    
    function handleOnSignupModal(){
        toggleFeatures(ACTION_LOGIN);
    };

    function handleForgotPasswordOpenModal(){
        toggleFeatures(ACTION_FORGOT_PASSWORD);
    };

    function handleSignupOpenModal(){
        toggleFeatures(ACTION_LOGIN_SIGNUP);
    };

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

    function handleOnForgotPasswordSentPasswordReset(event: ISignInForgotResponse) {
        event.success && toggleFeatures(ACTION_LOGIN);
    };

    return (
        <>
            {/* {isLoginScreen && ( */}
                <ModalWindow open={isLoginScreen} title='Sign In' width='50%' onClose={handleCancelModal} >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={0} xs={12}>
                            <Grid item xs={12} >
                                    <ErrorMessagesDisplay errorMessages={errorMessages} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} textAlign='center' xs={12}>
                            <Grid container spacing={1} >
                                <Grid item xs={12} textAlign='center'>
                                    <TextField required type="email" label="Email" variant="standard" fullWidth
                                        id="email" value={uxInputs.email} onChange={handleChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} textAlign='center'>
                                    <TextField type="text" label="Password" variant="standard" fullWidth
                                        id="password" value={uxInputs.password} onChange={handleChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={6} textAlign='right' whiteSpace='nowrap' >
                                    <Button variant='text' color='secondary' onClick={handleForgotPasswordOpenModal}>forgot password</Button>
                                    <Button variant='text' color='secondary' onClick={handleSignupOpenModal}>sign up</Button>
                                    <Button type="button" variant='contained' color='primary' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleCancelModal}
                                        startIcon={<CancelOutlinedIcon/>}
                                    >cancel</Button>
                                </Grid>
                                <Grid item xs={6} textAlign='left' >
                                    <Button type='submit' variant='contained' color='primary' style={{ padding: 4, margin: 10, borderRadius: 25 }}
                                        startIcon={<LockOpenIcon/>}
                                    >sign in </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>                    
                </ModalWindow>
            {/* )} */}

            <ProcessingDialog open={apiSignInLoading} message='Signing up is processing...' />

            {isForgotPasswordScreen && <LoginForgotModal onCancel={handleOnForgotPasswordCloseModal} onSentPasswordReset={handleOnForgotPasswordSentPasswordReset}/> }

            {isRegisterScreen && <LoginSignUpModal onCancel={handleOnSignupCloseModal} onSignup={handleOnSignupModal} /> }

        </>
    );
};