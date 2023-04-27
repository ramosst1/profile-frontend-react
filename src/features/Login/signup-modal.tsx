import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Hidden, TextField } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModalWindow from "../../components/ui/window-modals/modal_window";
import { ISignUpModel } from "./interfaces/signup/signup-models";
import { ISignUpRequest } from "./interfaces/signup/signup-requests";
import { ISignUpResponse } from "./interfaces/signup/signup-responses";
import useServiceApiResponse from "../../hooks/use-service-api-response";
import IErrorMessageModel from "../../interfaces/api-error-message";
import ErrorMessagesDisplay from "../../components/ui/error_displays/error-messages-display";
import SignUpService from "./services/signup-service";
import ProcessingDialog from "../../components/ui/dialogs/processing-dialog";

export default function LoginSignUpModal(    props: {onCancel:any, onSignup:any}){

    const [signUpResponse, setSignUpResponse] = useState<Promise<ISignUpResponse> | undefined>();
    const {apiResponse:apiSignUpResponse, messages: apiSignUpMessages, loading:apiSignUpLoading} = useServiceApiResponse<ISignUpResponse>(signUpResponse);

    const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);

    useEffect(() => {

        apiSignUpMessages && setErrorMessages(apiSignUpMessages);     

        if(apiSignUpResponse?.success !== true) return;
        
        // const aSignuModel: ISignUpModel ={
        //     signInId: 1,
        //     firstName: signUpRequest.firstName,
        //     lastName: signUpRequest.lastName,
        //     userName: signUpRequest.userName,
        //     password: signUpRequest.password
        // }

        // const response: ISignUpResponse = {
        //     success: true,
        //     messages: [],
        //     signupUser: aSignuModel
        // }

        // setSignupResponse({ ...signupResponse, 
        //     signInId: 0, 
        //     firstName: response.signup.firstName,
        //     lastName: response.signup.lastName
        // })

         props.onSignup(apiSignUpResponse);

    }, [apiSignUpResponse])
      
    const [uxInputs, setUxInputs] = useState({     
        firstName: '',
        lastName: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
    });

    //  const [signupResponse, setSignupResponse] = useState({
    //     signInId: 0,
    //     firstName: '',
    //     lastName: '',
    // });

     function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        handleOnSignup()
        
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;
        setUxInputs({ ...uxInputs, [id]: value });
    
    };

    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSignup(){


        const signUpRequest: ISignUpRequest = {
            firstName: uxInputs.firstName,
            lastName: uxInputs.lastName,
            userName: uxInputs.email,
            password: uxInputs.password
        }

        setSignUpResponse(SignUpService.SignUpAsync(signUpRequest));

    };

      return (
        <>

            <ModalWindow title='Sign Up' width='50%' onClose={handleCancelModal} >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                autoComplete="off" 
                onSubmit={handleSubmit}
                noValidate
            >
                <Grid item xs={12} >
                    <ErrorMessagesDisplay errorMessages={errorMessages} />
                </Grid>
                <Grid container spacing={0} textAlign='center' xs={12}>

                    <Grid container spacing={1} >
                        <Grid item xs={6} textAlign='left'>
                        <TextField required type="text" label="First Name" variant="standard" fullWidth
                            id="firstName" value={uxInputs.firstName} onChange={handleChange.bind(this)}
                        />
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="text" label="Last Name" variant="standard" fullWidth
                                id="lastName" value={uxInputs.lastName} onChange={handleChange.bind(this)}
                            />
                        </Grid>

                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="email" label="Email" variant="standard" fullWidth
                                id="email" value={uxInputs.email} onChange={handleChange.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="password" label="Password" variant="standard" fullWidth
                                id="password" value={uxInputs.password} onChange={handleChange.bind(this)}
                            />
                        </Grid>

                        <Grid item xs={6} textAlign='left'>
                            <TextField required type="email" label="Email Confirm" variant="standard" fullWidth
                                id="emailConfirm" value={uxInputs.emailConfirm} onChange={handleChange.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={5} textAlign='left'>
                            <TextField required type="password" label="Password Confirm" variant="standard"  fullWidth
                                id="passwordConfirm" value={uxInputs.passwordConfirm} onChange={handleChange.bind(this)}
                            />
                        </Grid>

                        <Grid item xs={6} textAlign='right' >
                            <Button variant="contained" type="button" 
                            onClick={handleCancelModal} 
                            style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<CancelOutlinedIcon/>} >cancel</Button>
                        </Grid>
                        <Grid item xs={6} textAlign='left' >
                            <Button variant="contained" type="submit" 
                                style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<PersonOutlineOutlinedIcon/>} >sign up</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {apiSignUpLoading && (
                    <>
                    <strong>test</strong>
                    <ProcessingDialog message='Signing up is processing...' />
                    </>
                )}

                </Box>

            </ModalWindow>
        </>
    );
};