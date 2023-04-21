import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export default function ConfirmationDialog(props: {title: string, message: string,openDialog:boolean, onConfirm:any, onClose:any}) {

  function handleOnClickNo(event: any){
    props.onClose();    
  };

  function handleOnClickYes(){
    props.onConfirm();
  };

  return (
      <>
        <Dialog
          open={true}
          keepMounted
          onClose={handleOnClickNo}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
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