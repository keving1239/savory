import React from 'react';
import { Typography, Grid, Button, Stack, Card, CardContent, CardMedia, Container } from '@mui/material';
import ProfileTile from './Profile/Profile.tile';

const SplashPage = () => {
    const teamMembers = [
        {name: 'Kevin Galdamez', imgSrc: '/img/kevin.png', bio: 'TS Consultant | Atlanta'},
        {name: 'Mark Leonardi', imgSrc: '/img/mark.jpg', bio: 'TS Consultant | Chicago'},
        {name: 'Adhrik Chethan', imgSrc: '/img/adhrik.jpg', bio: 'TS Consultant | Houston'},
        {name: 'Sanjit Muthineni', imgSrc: '/img/sanjit.jpg', bio: 'TS Consultant | Atlanta'}];
       return (
            <Grid container direction='column' justifyContent='space-evenly' alignItems='center' rowSpacing={2}>
            <Grid item><Typography variant='h3'>WELCOME TO SAVORY</Typography></Grid>
            <Grid item>
                <Typography variant='h6' maxWidth={950}>
                    Hi! Savory is a foodie's social media! Discover recipes, share 
                    your meals, and connect with other food lovers! Create an account,
                    and you can create, like, comment on, save, and share recipe posts.
                </Typography>
            </Grid>
            <Grid item>
                <Stack direction='row' spacing={5}>
                    {teamMembers.map((member) => (<ProfileTile {...member}/>))}
                </Stack>
            </Grid>
            <Grid item><Button variant='contained' color='primary'>Continue</Button></Grid>
            </Grid>
       );
};

export default SplashPage;