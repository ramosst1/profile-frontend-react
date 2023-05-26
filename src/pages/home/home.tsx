import React, {Component} from 'react'
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

export default function Home() {

  const cardStyle = {
    width: 350, 
    height:350
  }

  const cardActionStyle ={
    padding:1,
    maxWidth: 350, 
    height:350, 
    textAlign:'center',
    background: 'whitesmoke'
  }

  const cardDescriptionStyle = {
    textAlign: 'left',
    color: 'text.secondary'
  }

  return (
      <>
      <Typography variant='h4' padding={5} textAlign='center'>
        The site used the following technologies.
      </Typography>
      <Grid container 
        direction= {{md: 'row', xs: 'column'}}
        alignItems="center"      
        spacing={3} 
        width='90%'
      >
          <Grid item md={4} xs={12}>
          <Card sx={cardStyle}>
            <CardActionArea sx={cardActionStyle} href='https://react.dev/' target='_blank'>
            <img 
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/assets/technologies/react-logo.svg"
                  alt="React Logo"
                  width={100}
                  height={100}
                  
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  React
                </Typography>
                <Typography variant="body2" sx={cardDescriptionStyle}>
                  The sample site use React version 18.2.0. 
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
            
          </Grid>
            <Grid item md={4} xs={12}>
            <Card sx={cardStyle}>
              <CardActionArea sx={cardActionStyle} href='https://mui.com/' target='_blank' >
                <img
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/assets/technologies/material-ui-logo.svg"
                    alt="Mock Server Worker Logo"
                    width={100}
                    height={100}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Material UI
                  </Typography>
                  <Typography variant="body2" sx={cardDescriptionStyle}>
                    Material UI is a React component library to make it easier to build advance user experience websites.
                    The site uses version 5.13.2.  
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={cardStyle}>
              <CardActionArea sx={cardActionStyle} href='https://mswjs.io/' target='_blank'>
                <img
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/assets/technologies/mock-service-worker-logo.svg"
                    alt="Mock Server Worker Logo"
                    width={100}
                    height={100}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Mock Server Worker
                  </Typography>
                  <Typography variant="body2" sx={cardDescriptionStyle}>
                    Mock Server Worker is API interceptor in which provide mock data that can be used during development and testing.
                    One of the benefit is that backed system don't need to be called during development and QA testing life cycle. 
                    Mock Server Work can also be use in conjuction with Jest and Cypress front-end testing tools.
                    The site use version 1.2.1
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
      </Grid>
     </>
    );
}