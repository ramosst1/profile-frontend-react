import React from 'react';
import './App.css';
import NavBar from './navBarTop';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mystyle = {
  backgroundColor: "whitesmoke",
  margins: "100px",
  
};  

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
            <NavBar/>
      </ThemeProvider>    
    </>
  );
}