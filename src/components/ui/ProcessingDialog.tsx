import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material"
import React from "react"
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
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
                  <CachedOutlinedIcon color="info" sx={{ fontSize: 80 }} />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
    )
}
