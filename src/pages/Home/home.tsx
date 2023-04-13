import React, {Component} from 'react'
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
}
 
export default Home;