import { Link } from 'react-router-dom';
import { Typography, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

console.log(process.env.REACT_APP_URL_KEY)
const teamMembers = [
    {username: 'Kevin Galdamez', img: '/img/kevin.png', bio: 'TS Consultant | Atlanta'},
    {username: 'Mark Leonardi', img: '/img/mark.jpg', bio: 'TS Consultant | Chicago'},
    {username: 'Adhrik Chethan', img: '/img/adhrik.jpg', bio: 'TS Consultant | Houston'},
    {username: 'Sanjit Muthineni', img: '/img/sanjit.jpg', bio: 'TS Consultant | Atlanta'}];

const SplashPage = () => {
    const savoryAuth = useSelector((state: RootState) => state.userReducer.isAuthenticated);
    return (
        <Grid container direction='column' justifyContent='space-evenly' alignItems='center' rowSpacing={2}>
        <Grid item>
            <Typography variant='h3'>WELCOME TO SAVORY</Typography>
        </Grid>
        <Grid item>
            <Typography variant='h6' maxWidth='80vw'>
                Hi! Savory is a foodie's social media! Discover recipes, share 
                your meals, and connect with other food lovers! 
                <br></br>
                Create an account, and you can create, like, save, and share recipe posts.
            </Typography>
        </Grid>
        <Grid container item justifyContent='space-around' rowSpacing={4}>
            {teamMembers.map((member, index) => (
                <Grid item key={index} xs={4.5} md={2}>
                    <Card elevation={5}>
                        <CardMedia component='img' src={member.img} alt={member.username} sx={{height: '30vh'}}/>
                        <CardContent>
                            <Typography variant='h5' align='left'>{member.username}</Typography>
                            <Typography variant='body2' align='left'>{member.bio}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        <Grid item>
            {savoryAuth ?             
            <Link to='/feed'>
                <Button variant='contained' color='primary'>Continue</Button>
            </Link> 
            :
            <Link to='/login'>
                <Button variant='contained' color='primary'>Log In</Button>
            </Link>}
        </Grid>
        </Grid>
    );
};

export default SplashPage;