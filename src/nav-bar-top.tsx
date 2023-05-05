import React, {useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import {AppBar, Box, Container, Toolbar, Typography, Button, IconButton, Menu, MenuItem, CssBaseline, linearProgressClasses } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoIcon from '@mui/icons-material/Info';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { makeStyles } from '@material-ui/core/styles';
import LoginModal from './features/Login/signin-modal';
import {Home, AboutUs, UserProfiles} from './pages/index'
import LoginSignUpModal from './features/Login/signup-modal';
import { ISignUpResponse } from './features/Login/interfaces/signup/signup-responses';
import { ISignInResponse } from './features/Login/interfaces/signin/signin-responses';
import useAuthUser from './features/Login/hooks/auth-user';
import useLogout from './features/Login/hooks/auth-logout';
import MoreIcon from '@mui/icons-material/MoreVert';

interface IPagesObject {
    pageName: string,
    url: string,
    icon: any,
}

interface IRightMenuObject {
    menuName: string,
    icon: any,
    event: React.MouseEventHandler<HTMLLIElement>,
    eventButton: React.MouseEventHandler<HTMLButtonElement>,
    color: string,
}


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    topNav: {
        // background: 'linear-gradient(90deg, #0d47a1 10%, #06224e 90%)',
        background: 'linear-gradient(90deg, #06224e 10%, #0d47a1 45%, #06224e 95%)'
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

    const {user} = useAuthUser();

    const {logout,setLogout} = useLogout();

    const classes = useStyles();

    const pageList: IPagesObject[] = [
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

    const rightMenuObjects: IRightMenuObject [] = [
        {
            menuName: 'Sign Up',
            icon: <SubscriptionsIcon sx={{color: '#ef6694'}} />,
            event: handleOnSignUp,
            eventButton: handleOnSignUp,
            color:'#fce4ec'
        },        
        {
            menuName: 'Sign In',
            icon: <PeopleOutlineIcon className={classes.topNavIcon}  />,
            event: handleOnSignIn,
            eventButton: handleOnSignIn,
            color:'#dbffe0'
        },        
        {
            menuName: 'Sign Out',
            icon: <PeopleOutlineIcon className={classes.topNavIcon}  />,
            event: handleOnSignOut,
            eventButton: handleOnSignOut,
            color:'#dbffe0'
        },        
    ]

    const [rightMenus, setRightMenus] = useState<IRightMenuObject []>(rightMenuObjects);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElNavRight, setAnchorElNavRight] = React.useState<null | HTMLElement>(null);

    useEffect(() => {

        if(user?.userName !== undefined) {

               const newList = [...rightMenuObjects]
                .filter(item => item.menuName !== 'Sign In' )
            
                setRightMenus(newList);

        } else {
            const newList = [...rightMenuObjects]
            .filter(item => item.menuName !== 'Sign Out' )

            setRightMenus(newList);
        }

    }, [user])

    function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>){
        setAnchorElNav(event.currentTarget);
    };

    function handleOpenNavMenuRight(event: React.MouseEvent<HTMLElement>){
        setAnchorElNavRight(event.currentTarget);
    };


    function handleCloseNavMenu() {
        setAnchorElNav(null);
    };

    function handleCloseNavMenuRight() {
        setAnchorElNavRight(null);
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

    function handleOnSignOut(){
        setLogout(true);
    };

    function handleLoginCloseModal(){
        setIsOpenLoginModal(false);
    };

    function handleLoginOnLoginModel(event:ISignInResponse){
        setIsOpenLoginModal(false);
    };

    function handleOnSignUp(){
        setIsOpenSignupModal(true);
        handleCloseNavMenuRight();
    };

    function handleLoginSignupCloseModal(){
        setIsOpenSignupModal(false);
    };

    function handleLoginOnSignupModel(event:ISignUpResponse){
        event.success ?? setIsOpenSignupModal(false);
    };

    return (
    <> 
        <Router>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar component="nav" className={classes.topNav}  >
                    <Container maxWidth="xl" > 
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
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

                            <Typography
                                variant="body2"
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

                            <Box sx={{ textAlign:'right', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            </Box>
                            <Box sx={{flexGrow: 0, display: { xs: 'none', md: 'flex' } }} >

                                <Typography style={{padding:10}}>
                                    {user?.userName && 'Welcome Back:'}  {user?.firstName}  {user?.lastName}
                                </Typography>

                                {rightMenus.map((menuItem) => (
                                    <Button color="inherit"  sx={{color: menuItem.color, fontSize: 'small'}} 
                                        onClick={menuItem.eventButton}
                                    >
                                        {menuItem.icon}
                                        {menuItem.menuName}
                                    </Button>
                            ))}

                            </Box>


                            <Box sx={{ flexGrow: 1,  display: { xs: 'flex', md: 'none' } }}
                            >
                                <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenuRight}
                                sx={{ color: '#dbffe0' }}
                                
                                >
                                <MoreIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNavRight}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNavRight)}
                                    onClose={handleCloseNavMenuRight}
                                    sx={{ 
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    <MenuItem sx={{fontWeight:'bold', display:user?.userName??'none'}}>
                                        {user?.firstName}  {user?.lastName}
                                    </MenuItem>
                                    {rightMenus.map((menuItem) => (
                                        <MenuItem key={menuItem.menuName} 
                                        onClick= {menuItem.event} 
                                        >
                                            {menuItem.icon}
                                        <Typography textAlign="center">{menuItem.menuName}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                    <Container  maxWidth='xl'>
                    <Box sx={{textAlign: 'left', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                                {pageList.map((page) => (
                                <Button
                                    size='small'
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
                <Box component="main" margin={{md:2,xs:1}}
                    // sx={{ padding:10, width:'100%'}}
                    sx={{ width:'100%'}}
                >
                    <Toolbar />
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
                </Box>
            </Box>

            {isOpenLoginModal && <LoginModal onClose={handleLoginCloseModal} onSignIn={handleLoginOnLoginModel} />}

            {isOpenSignupModal && <LoginSignUpModal onCancel={handleLoginSignupCloseModal} onSignup={handleLoginOnSignupModel}/>}

        </Router>
    </>
    );
};