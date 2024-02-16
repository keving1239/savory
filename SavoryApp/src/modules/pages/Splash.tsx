import { Link, useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import ProfileTile from './Profile/Profile.tile';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUser } from '../../redux/User/user-slice';
import { useEffect } from 'react';

const teamMembers = [
    {username: 'Kevin Galdamez', img: '/img/kevin.png', bio: 'TS Consultant | Atlanta'},
    {username: 'Mark Leonardi', img: '/img/mark.jpg', bio: 'TS Consultant | Chicago'},
    {username: 'Adhrik Chethan', img: '/img/adhrik.jpg', bio: 'TS Consultant | Houston'},
    {username: 'Sanjit Muthineni', img: '/img/sanjit.jpg', bio: 'TS Consultant | Atlanta'}];

const SplashPage = () => {
    const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // useEffect(() => {
        // try {
            // if(!isAuthenticated || !user) return;
            // getAccessTokenSilently().then((token) => {
                // const email = (user ? user?.email : '') as string;
                // dispatch(fetchUser({ email, isAuthenticated, token })).then((action) => {
                    // if(action.type === `${fetchUser.fulfilled}`) navigate('/feed');
                // });
            // });
        // } catch(error){console.error("Error Logging in: ", error)} 
    // },[isAuthenticated, user]);
    return (
        <Grid container direction='column' justifyContent='space-evenly' alignItems='center' rowSpacing={2}>
        <Grid item>
            <Typography variant='h3'>WELCOME TO SAVORY</Typography>
        </Grid>
        <Grid item>
            <Typography variant='h6' maxWidth='80vw'>
                Hi! Savory is a foodie's social media! Discover recipes, share 
                your meals, and connect with other food lovers! Create an account,
                and you can create, like, comment on, save, and share recipe posts.
            </Typography>
        </Grid>
        <Grid container item justifyContent='space-around' rowSpacing={4}>
            {teamMembers.map((member, index) => (
                <Grid item key={index} xs={4.5} md={2}><ProfileTile {...member}/></Grid>
            ))}
        </Grid>
        <Grid item>
            {isAuthenticated ?             
            <Link to='/feed'>
                <Button variant='contained' color='primary'>Continue</Button>
            </Link> 
            :
            <Button variant='contained' color='primary' onClick={() => loginWithRedirect()}>
                Log in
            </Button>}
        </Grid>
        </Grid>
    );
};

export default SplashPage;