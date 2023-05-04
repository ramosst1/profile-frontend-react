
import React, { useEffect, useState } from 'react'
import ModalWindow from '../../components/ui/window-modals/modal_window';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ISignInForgotRequest from './interfaces/signin-forgot/signin-forgot-requests';
import ISignInForgotResponse from './interfaces/signin-forgot/signin-forgot-response';
import useServiceApiResponse from '../../hooks/use-service-api-response';
import IErrorMessageModel from '../../interfaces/api-error-message';
import ErrorMessagesDisplay from '../../components/ui/error_displays/error-messages-display';
import ProcessingDialog from '../../components/ui/dialogs/processing-dialog';
import signinForgotService from './services/signin-forgot-service';


export default function LoginForgotModal(props: {onCancel:any, onSentPasswordReset:any}) {

    const [signInForgotResponse, setSignInForgotResponse] = useState<Promise<ISignInForgotResponse>>();
    const { apiResponse:apiSignInForgotResponse, messages:apiSignInForgotMessage, loading:apiSignInForgotLoading} = useServiceApiResponse<ISignInForgotResponse>(signInForgotResponse);

    const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);

    useEffect(() => {

        setErrorMessages(apiSignInForgotMessage);

    }, [apiSignInForgotResponse])

    const [uxInputs, setUxInputs] = useState({
        email: ''
    });

    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        handleOnSendRestPassword()
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;
        setUxInputs({ ...uxInputs, [id]: value });
    
    };

    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSendRestPassword(){

        const requestSignInForgot: ISignInForgotRequest = {
            userName: uxInputs.email
        }

        setSignInForgotResponse(signinForgotService.signInForgotAsync(requestSignInForgot));

    }

    return (
        <>
            <ModalWindow open={true} title='Forgot Password' width='40%' onClose={handleCancelModal} >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={0} xs={12}>
                        <Grid item xs={12} >
                            <ErrorMessagesDisplay errorMessages={errorMessages} />
                        </Grid>
                        <Grid item xs={12} textAlign='center'>
                            <Typography>
                                <TextField required type="email" label="Email" variant="standard"
                                    id="email" value={uxInputs.email} onChange={handleChange.bind(this)}
                                />

                            </Typography>
                        </Grid>

                        <Grid item xs={12} textAlign='center' whiteSpace='nowrap' >
                            <Typography>
                                <Button type='button' variant='contained' style={{ padding: 4, margin: 10, borderRadius: 25 }} onClick={handleCancelModal} 
                                    startIcon={<CancelOutlinedIcon/>} 
                                >close</Button>
                                <Button type='submit' variant='contained' style={{ padding: 4, margin: 10, borderRadius: 25 }} 
                                    startIcon={<MailOutlineOutlinedIcon/>}
                                >send password reset</Button>

                            </Typography>
                        </Grid>
                    </Grid>
                     <ProcessingDialog open={apiSignInForgotLoading} message='Profiles are loading...' />
                 </Box>
                
            </ModalWindow>
        </>
    );
}