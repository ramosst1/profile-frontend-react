import React, { useState } from 'react';
import './App.css';
import NavBarTop from './nav-bar-top';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
      dark: '#093170',
      light: '#3d6bb3',
    },
    secondary: {
      main: '#00695c',
      dark: '#004940',
      light: '#33877c'
    }, 
    error:{
      main: '#d32f2f'
    }  
  },
});


export default function App() {

  return (
    <>
     <ThemeProvider theme={theme}>
        <AuthProvider>
          <NavBarTop/>
        </AuthProvider>
    </ThemeProvider>
    </>
  );
}