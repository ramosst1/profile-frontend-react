import { Box, Modal } from '@mui/material';
import React from 'react';

export default function ModalWindow(props: {xs?: any , open: boolean, title:string, width:string, onClose:any, children:any}){

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
                sx={[{overflow:'auto'},{...props.xs}]}
                // sx={props.xs} 
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