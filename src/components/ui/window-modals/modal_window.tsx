import { Box, Grid, Modal } from '@mui/material';
import React from 'react';

export default function ModalWindow(props: {open: boolean, title:string, width:string, onClose:any, children:any}){

    const modalWindowStyle = {
        margin: '0',
      };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: props.width,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 0,
        borderRadius: 3,
      };

      const titleStyle = {
        bgcolor: 'primary.dark',
        color: 'white',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        fontSize: 15,
        fontWeight: 600,
        padding: 1
       };

    function handleOnClose() {
        props.onClose();
    }

    return (
        <>
            <Modal 
                open={props.open}
                onClose={handleOnClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={modalWindowStyle}
            >
                <Box sx={modalStyle} >
                    <Box textAlign='center' sx={titleStyle} >
                        <div>{props.title}</div>
                    </Box>

                    {props.children}
                </Box>
            </Modal>
        </>
    );
}