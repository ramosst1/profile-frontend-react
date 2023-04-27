import React from "react";
import IErrorMessageModel from '../../../interfaces/api-error-message';
import { Box } from "@mui/material";

export default function ErrorMessagesDisplay(props: {errorMessages: IErrorMessageModel[]}){

    return (
        <>
              <Box color="error.main">
                <ul >
                  {props.errorMessages.map(errorMessage => (
                    <li>{errorMessage.message}</li>
                  ))}
                </ul>
              </Box>
        </>
    );
}
