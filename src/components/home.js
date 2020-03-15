import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from "@material-ui/core";

  class Home extends Component {

    
    state = {  }
    render() { 
        return (
          <Grid item xs={12} >
            <div style={{textAlign:"center"}}>
                Welcome to the home page. The page will be available soon.

            </div>
          </Grid>
        );
    }

    handleSubmit = (event) => {


        event.preventDefault() ;
        this.testConfirm();

        let test = event;

        return false;

    }
    testConfirm = (event) => {


//        event.stopPropagation();
        return false;

    }
}
 
export default Home;