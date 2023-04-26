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
      main: '#3f51b5',
      dark: '#2c387e',
      light: '#6573c3',
    },
    secondary: {
      main: '#1b5e20',
      dark: '#124116',
      light: '#487e4c'
    }, 
    error:{
      main: '#d32f2f'
    }  
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <>
          <NavBar/>
          <main className="container, float-md-right" style={mystyle}>
          </main>
        </>
    </ThemeProvider>    
  );
}