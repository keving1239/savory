import React from 'react';
import { Typography, Grid, Button, Stack, Card, CardContent, CardMedia, Box } from '@mui/material';
import ProfileTile from '../shared/Profile.tile';

const Profile = ({username}: {username: string}) => {
    const user = {name: '', imgSrc: '', bio: ''};
    
    return(
        <Box bgcolor={'background'}>
            <Grid container spacing={{ xs: 3 }} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item><ProfileTile {...user}/></Grid>
                <Grid item>
                <Grid container direction = "column" spacing={{ xs: 1 }} justifyContent="flex-start">
                    <Grid item><Typography>Posts: 31</Typography></Grid>
                    <Grid item><Typography>Followers: 103</Typography></Grid>
                    <Grid item><Typography>Following: 46</Typography></Grid>
                </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={{ md: 2 }} justifyContent="flex-start">
                <Grid item><Button variant='contained'>Edit Profile</Button></Grid>
                <Grid item><Button variant='contained'>Show Blog</Button></Grid>
                <Grid item><Button variant='contained'>Share Profile</Button></Grid>
            </Grid>
        </Box>
    );
}



export default Profile;