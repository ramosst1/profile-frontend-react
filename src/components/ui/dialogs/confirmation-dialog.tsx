import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
export default function ConfirmationDialog(props: {open: boolean, title: string, message: string,openDialog:boolean,  onConfirm:any, onClose:any}) {

  function handleOnClickNo(event: any){
    props.onClose();    
  };

  function handleOnClickYes(){
    props.onConfirm();
  };

  return (
      <>
        <Dialog
          open={props.open}
          keepMounted
          onClose={handleOnClickNo}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" >
            {props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnClickNo} color="primary">
              No
            </Button>
            <Button onClick={handleOnClickYes} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}