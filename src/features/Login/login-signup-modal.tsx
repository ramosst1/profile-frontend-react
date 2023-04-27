import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModalWindow from "../../components/ui/windowModals/ModalWindow";
import { ISignupResponse } from "./interfaces/signup/signup-responses";
import { ISignUpModel } from "./interfaces/signup/signup-models";
import { ISignupRequest } from "./interfaces/signin/signin-requests";

export default function LoginSignUpModal(    props: {onCancel:any, onSignup:any}){

    const [uxInputs, setUxInputs] = useState({     
        firstName: '',
        lastName: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
     })

    function handleCancelModal(){
        props.onCancel();
    };

    function handleOnSignup(){

        props.onSignup();

        const response: ISignupResponse = {
            success: false,
            messages: [],
            signup: undefined
        }

        return response;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement> ){
        const { id, value } = event.target;
        setUxInputs({ ...uxInputs, [id]: value });
    
      };
    
    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()

        handleOnSignup()
        
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
            >
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
                </Box>
            </ModalWindow>
        </>
    );
};