import { Box, Modal } from '@mui/material';
import React from 'react';

export default function ModalWindow(props: {xs?: any , open: boolean, title:string, width:string, onClose:any, children:any}){

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: {md:'30%', xs:'50%'},
        left: {md:'50%', xs:'50%'},
        transform: 'translate(-50%, -50%)',
        // transform: {md:'translate(-90%, -90%)', xs:'translate(-50%, -50%)'},
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 0,
        borderRadius: 3,
        width:{md:'auto', xs:'90%'},
      };

      const titleStyle = {
        bgcolor: 'primary.main',
        
        color: 'white',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        fontSize: 15,
        fontWeight: 600,
        padding: 1,
        background: 'linear-gradient(90deg, #06224e 10%, #0d47a1 45%, #06224e 95%)'        
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