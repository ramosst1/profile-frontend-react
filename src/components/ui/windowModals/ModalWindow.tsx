import { Box, Modal } from '@mui/material';
import React from 'react';

export default function ModalWindow(props: {title:string, width:string, onClose:any, children:any}){

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


    function handleOnClose() {
        props.onClose();
    }

    return (
        <>
            <Modal 
                open={true}
                onClose={handleOnClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={modalWindowStyle}
            >
                <Box sx={modalStyle} >
                    <Box textAlign='center' bgcolor={'whitesmoke'} >
                        <h1>{props.title}</h1>
                    </Box>

                    {props.children}
                </Box>
            </Modal>
        </>
    );
}