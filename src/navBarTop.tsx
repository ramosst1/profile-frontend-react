import React, {useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import {AppBar, Box, Container, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoIcon from '@mui/icons-material/Info';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { makeStyles } from '@material-ui/core/styles';
import LoginModal from './features/Login/login-modal';
import {Home, AboutUs, UserProfiles} from './pages/index'
import LoginSignUpModal from './features/Login/login-signup-modal';

interface PagesObject {
    pageName: string
    url: string,
    icon: any,
}

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

export default function NavBarTop() {

    const classes = useStyles();

    const pageList: PagesObject[] = [
        {
          pageName: 'Home',
          url: '/',
          icon: <HomeIcon className={classes.topNavIcon}/>
        },
        {
          pageName: 'Profiles',
          url: '/profiles/profiles',
          icon: <PeopleIcon className={classes.topNavIcon} />,
        },
        {
          pageName: 'About Us',
          url: '/aboutus',
          icon: <InfoIcon className={classes.topNavIcon} />
        },
      ];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>){
        setAnchorElNav(event.currentTarget);
    };


    function handleCloseNavMenu() {
        setAnchorElNav(null);
    };

    function handleRouteToPageNavMenu(url:string){

        window.location.href = url;   

        setAnchorElNav(null);
    };

    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);

    function handleOnSignIn(){
        setIsOpenLoginModal(true);
    };

    function handleLoginCloseModal(){
        setIsOpenLoginModal(false);
    };

    function handleLoginOnLoginModel(){
        setIsOpenLoginModal(false);
    }


    function handleOnSignUp(){
        setIsOpenSignupModal(true);
    };

    function handleLoginSignupCloseModal(){
        setIsOpenSignupModal(false);
    };

    function handleLoginOnSignupModel(){
        setIsOpenSignupModal(false);
    }

return (
<> 
    <Router>
        <AppBar position="static">
            <Container maxWidth="xl" > 
                <Toolbar disableGutters>
                    {/* <ChildCareIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 900,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        &lt;Sample Website&gt;
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        sx={{ color: '#dbffe0' }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ 
                            display: { xs: 'block', md: 'none' }
                        }}
                        >
                        {pageList.map((page) => (
                            <MenuItem key={page.pageName} onClick={() => handleRouteToPageNavMenu(page.url)}
                            >
                                {page.icon}
                            <Typography textAlign="center">{page.pageName}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    {/* <ChildCareIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        &lt;Sample Website&gt; 
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                        {/* {pageList.map((page) => (
                        <Button
                            key={page.pageName}
                            onClick={() => handleRouteToPageNavMenu(page.url)}
                            sx={{ my: 2, color: '#dbffe0' }}
                            startIcon = {page.icon}
                        >
                            {page.pageName}
                        </Button>

                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button color="inherit"  sx={{color: '#dbffe0'}} onClick={handleOnSignUp}>
                            <SubscriptionsIcon className={classes.topNavIcon}  />
                            Sign Up
                        </Button>

                        <Button color="inherit"  sx={{color: '#dbffe0'}} onClick={handleOnSignIn}>
                            <PeopleOutlineIcon className={classes.topNavIcon}  />
                            Sign In
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
            <Container  maxWidth='xl'>
            <Box sx={{textAlign: 'left', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                        {pageList.map((page) => (
                        <Button
                            key={page.pageName}
                            onClick={() => handleRouteToPageNavMenu(page.url)}
                            sx={{ my: 2, color: '#dbffe0' }}
                            startIcon = {page.icon}
                        >
                            {page.pageName}
                        </Button>

                        ))}
                    </Box>

            </Container>
        </AppBar>

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

        {isOpenLoginModal && <LoginModal onClose={handleLoginCloseModal} onLogIn={handleLoginOnLoginModel} />}

        {isOpenSignupModal && <LoginSignUpModal onCancel={handleLoginSignupCloseModal} onSignup={handleLoginOnSignupModel}/>}

    </Router>
</>
);
};

