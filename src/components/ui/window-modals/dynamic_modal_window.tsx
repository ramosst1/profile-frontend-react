'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export function DynamicModalWindow(props: {open: boolean,title?:string, modalWidth?:string, onClose?:any, children:any}) {
 
    useEffect(() => {
        setDisplayModal(props.open ===true?'block': 'none')

    },[props.open])

    const modalStyle = {
        display: 'none', 
        position: {md: 'relative', xs:'fixed'}, 
        paddingTop: {md:0, xs:20},
        zIndex: 'modal',
        left: 0,
        top: 0,
        width: {md: 'auto', xs:'100%'},
        height: {md: 'auto', xs: '100%'}, 
        overflow: {md: 'hidden', xs:'auto'},
        backgroundColor: {md:'rgba(0,0,0,0.0)', xs:'rgba(0,0,0,0.4)'}
      };

    const mobalContent = {
        backgroundColor: {md: 'inherit', xs:'#fefefe'},
        margin: 'auto',
        padding: '0px',
        border: {md: '0px',xs:'1px solid #888'},
        width: {md: 'auto', xs: props.modalWidth? props.modalWidth : ''},
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
    }

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

     const closeStyle = {
        color: 'white',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        paddingRight: '5px',
        '&:hover': {
            color: '#aaaaaa',
            textDecoration: 'none',
            cursor: 'pointer'
        }
      }
      
    const [displayModal, setDisplayModal] = useState(props.open ===true?'block': 'none')

    function openModal(){
        setDisplayModal('block')
    }
    
    function closeModal(){
        props.onClose && props.onClose();
    }
 
    return (
        <div style={{textAlign:"center"}}>
        <Box id="myModal" 
            sx= {modalStyle} 
            style={{display: displayModal}}
        >
            <Box sx={mobalContent}>
                <Typography  variant='button' sx={closeStyle} onClick={closeModal}>&times;</Typography>
                <Box  textAlign='center' sx={titleStyle} display={props.title? '': 'none'} >
                    <div>{props.title}</div>
                </Box>
                {props.children}
            </Box>
        </Box>
    </div>
    )
}