import React, {useState} from 'react';
import {Home, AboutUs, UserProfiles} from './pages/index'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
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
import LoginModal from './features/Login/login-modal';

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

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const classes = useStyles();

  function handleOnSignup(){
    setIsOpenLoginModal(true);
  };

  function handleLoginCloseModal(){
    setIsOpenLoginModal(false);
  };

  function handleLoginOnLoginModel(){
    setIsOpenLoginModal(false);
  }

  return (
    <>
      <Router>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" bgcolor='primary.main' className={classes.title}>
              <Button href="/" className={classes.topNavButton}><HomeIcon className={classes.topNavIcon} />Home</Button>
              <Button href="/profiles/profiles/" className={classes.topNavButton} ><PeopleIcon className={classes.topNavIcon} />Profiles</Button>
              <Button href="/aboutus" className={classes.topNavButton} > <FiberManualRecordIcon className={classes.topNavIcon} />About Us</Button>
             </Typography>
              <Button color="inherit" className={classes.topNavButton} onClick={handleOnSignup}>
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

      {isOpenLoginModal && (
        <LoginModal onClose={handleLoginCloseModal} onLogIn={handleLoginOnLoginModel} />
      )}
    </>
  );
}
