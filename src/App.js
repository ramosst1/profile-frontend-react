import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './navBarTop';

const mystyle = {
  backgroundColor: "whitesmoke",
  margins: "100px",
  
};  

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <main className="container, float-md-right" style={mystyle}>
      </main>
    </React.Fragment>
  );
}

export default App;
