import React from 'react';
import UserProfiles from './components/profiles/userProfiles';
import Home from './components/home';
import AboutUs from './components/aboutUs';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SideNavBar from './navBarSide';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topNavIcon: {
    margin: "0px 5px 0px 0px",
    padding: 0,
    color: "#21a631"
  },
  topNavButton: {
    color:"#dbffe0",
    padding: "0px 30px 0px 00px"
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Button href="/" className={classes.topNavButton}><HomeIcon className={classes.topNavIcon} />Home</Button>
              <Button href="/profiles/profiles/" className={classes.topNavButton} ><PeopleIcon className={classes.topNavIcon} />Profiles</Button>
              <Button href="/aboutus" className={classes.topNavButton} > <FiberManualRecordIcon className={classes.topNavIcon} />About Us</Button>
             </Typography>
              <Button color="inherit" className={classes.topNavButton} disabled>
                <PeopleOutlineIcon className={classes.topNavIcon}  />
              Sign In</Button>
          </Toolbar>
        </AppBar>
        <SideNavBar/>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/profiles/profiles">
            <UserProfiles />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
