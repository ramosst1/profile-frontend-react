import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress } from "@mui/material"
import React from "react"
export default function ProcessingDialog( props: {message:string}){

    return (
        <>
          <Dialog
            open={true}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            
            >
            <DialogContentText id="alert-dialog-slide-title" color="white" bgcolor="primary.main" align="center">
                Processing....
            </DialogContentText>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <strong>{props.message}</strong>
              </DialogContentText>
              <DialogContentText align="center">
                <CircularProgress color="info" sx={{ fontSize: 200 }} />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
    )
}
