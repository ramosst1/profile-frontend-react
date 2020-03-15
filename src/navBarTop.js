import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserProfiles from './components/profiles/userProfiles';
import Home from './components/home';
import AboutUs from './components/aboutUs';
import SideNavBar from './navBarSide';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuNavigationButton: {
    marginRight: theme.spacing(2),
     color: "white"
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
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
            <Button href="/" className={classes.menuNavigationButton} >Home</Button>
            <Button href="/profiles/profiles/" className={classes.menuNavigationButton}>Profiles</Button>
            <Button href="/aboutus" className={classes.menuNavigationButton} >About Us</Button>
            </Typography>
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
