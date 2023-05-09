import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModalWindow from "../../components/ui/window-modals/modal_window";
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

    const [uxInputs, setUxInputs] = useState({     
        firstName: '',
        lastName: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
    });

    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    
    const [emailConfirmError, setEmailConfirmError] = useState(false);
    const [emailConfirmMessage, setEmailConfirmMessage] = useState('');

    useEffect(() => {


        apiSignUpMessages && setErrorMessages(apiSignUpMessages);     

        if(apiSignUpResponse?.success !== true) return;
        
         props.onSignup(apiSignUpResponse);

    }, [apiSignUpResponse])
      

     function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        if(!formValid) return;

        setErrorMessages([]);        

        handleOnSignup();
        
    };

    const [formValid, setFormValid] = useState(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;

        setFormValid(false);

        setPasswordConfirmError(false);                    
        setPasswordConfirmMessage('');                    

        setEmailConfirmError(false);                    
        setEmailConfirmMessage('');                    

        setUxInputs({ ...uxInputs, [id]: value });

        switch(id){
            case 'passwordConfirm':
                if(!validateCompareValues(uxInputs.password, value)){

                    setPasswordConfirmError(true);                    
                    setPasswordConfirmMessage('The confirm password don\'t match');                    
                    return;
                }
                console.log(true);
            break;
            case 'emailConfirm':
                if(!validateCompareValues(uxInputs.email, value)){

                    setEmailConfirmError(true);                    
                    setEmailConfirmMessage('The confirm email don\'t match');                    

                    return;
                }
            break;
        }

        setFormValid(true);

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

    function validateCompareValues(value1:string, value2:string){

        if(value1 === value2) return true;

        return false;

    }

    return (
        <>

            <ModalWindow open={true} title='Sign Up' width='50%' onClose={handleCancelModal} >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                autoComplete="off" 
                onSubmit={handleSubmit}
                
            >
                <Grid container spacing={0} textAlign='center' xs={12}>
                    <Grid item xs={12} >
                        <ErrorMessagesDisplay errorMessages={errorMessages} />
                    </Grid>
                    <Grid item xs={12} md={6} direction='column' textAlign='left'>
                        <TextField required type="text" label="First Name" variant="standard" fullWidth
                            id="firstName" value={uxInputs.firstName} onChange={handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} direction='column' textAlign='left'>
                        <TextField required type="text" label="Last Name" variant="standard" fullWidth
                            id="lastName" value={uxInputs.lastName} onChange={handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='left'>
                        <TextField required type="email" label="Email" variant="standard" fullWidth
                            id="email" value={uxInputs.email} onChange={handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='left'>
                        <TextField required type="email"  label="Email Confirm" variant="standard" fullWidth
                            error={emailConfirmError} helperText={emailConfirmMessage}
                            id="emailConfirm" value={uxInputs.emailConfirm} onChange={handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='left'>
                            <TextField required type="password" label="Password" variant="standard" fullWidth
                                id="password" value={uxInputs.password} onChange={handleChange.bind(this)}
                            />
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='left'>
                        <TextField required type="password" label="Password Confirm" variant="standard"  fullWidth
                            error={passwordConfirmError} helperText={passwordConfirmMessage}
                            id="passwordConfirm" value={uxInputs.passwordConfirm} onChange={handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={6} textAlign='right' display={apiSignUpResponse?.success !== true?'':'none'} >
                        <Button variant="contained" type="button" 
                        onClick={handleCancelModal} 
                        style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<CancelOutlinedIcon/>} >cancel</Button>
                    </Grid>
                    <Grid item xs={6} textAlign='left' display={apiSignUpResponse?.success !== true?'':'none'}>
                        <Button variant="contained" type="submit"
                            style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<PersonOutlineOutlinedIcon/>} >sign up</Button>
                    </Grid>
                    <Grid item xs={12} textAlign='center' display={apiSignUpResponse?.success === true?'':'none'}>
                        <Button variant="contained" type="button" 
                            onClick={handleCancelModal} 
                            style={{ padding: 4, margin: 10, borderRadius: 25 }} startIcon={<CancelOutlinedIcon/>} >close</Button>

                    </Grid>
                </Grid>
                <ProcessingDialog open={apiSignUpLoading} message='Signing up is processing...' />
            </Box>

            </ModalWindow>
        </>
    );
};