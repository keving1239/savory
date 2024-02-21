import { Link } from 'react-router-dom';
import { Typography, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const teamMembers = [
    {username: 'Kevin Galdamez', img: '/img/kevin.png', bio: 'TS Consultant | Atlanta'},
    {username: 'Mark Leonardi', img: '/img/mark.jpg', bio: 'TS Consultant | Chicago'},
    {username: 'Adhrik Chethan', img: '/img/adhrik.jpg', bio: 'TS Consultant | Houston'},
    {username: 'Sanjit Muthineni', img: '/img/sanjit.jpg', bio: 'TS Consultant | Atlanta'}];

const SplashPage = () => {
    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

    const handleLoginJWT = async () => {

        if (!isAuthenticated) {
            await loginWithRedirect();
        }
        const domain = "dev-t6vspuc8qrssaarc.us.auth0.com";

        try {
            // If user is authenticated

            // Begin to fetch data after authentication
            const token = await getAccessTokenSilently({
                authorizationParams: {
                  audience: `https://${domain}/api/v2/`,
                  scope: "read:current_user",
                },
              });
            const response = await fetch(`https://${domain}/api/v2/users/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Failed login/fetch', error);
        }
    };
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
            {isAuthenticated ?             
            <Link to='/feed'>
                <Button variant='contained' color='primary'>Continue</Button>
            </Link> 
            :
            <Button variant='contained' color='primary' onClick={() => handleLoginJWT()}>
                Log in
            </Button>}
        </Grid>
        </Grid>
    );
};

export default SplashPage;