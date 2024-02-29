import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, IconButton } from '@mui/material';
import {FavoriteBorder, Link, Edit} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState, fetchOptions } from '../../../redux/store';
import Feed from '../../shared/Feed';

const Profile = () => {
    const navigate = useNavigate();
    const {username} = useParams();
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const isOwner = user?.username === username;
    const [profile, setProfile] = useState(user ? user : {id: 0, username: 'savory', img: '', bio: 'Welcome to Savory!'});

    // viewed profile retrieval
    async function retrieveUser() {
        try {
            const response = await fetch(`http://localhost:8080/api/person/byUsername/${username}`, fetchOptions({
                method: 'GET'
            }));
            const data = await response.json();
            setProfile({id: data.id, username: data.username, img: data.img, bio: data.bio});
        } catch(error) {console.error(error);}
    }
    useEffect(() => {
        if(username != user?.username) retrieveUser();
    }, [username])

    function handleProfileAction() {
        if(isOwner) return navigate(`/profile/edit`);
        console.log(`Liked ${username}'s blog`);
    }

    return(
        <Box>
            <Paper sx={{p: '1.5vh', margin: '4vh auto', maxWidth: '70vw', backgroundColor: 'primary.light'}}>
                <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'}>
                    <Grid item xs={6}>
                    <Paper 
                            component='img'
                            alt={profile?.username}
                            src={profile?.img}
                            sx={{minHeight: '37vh', minWidth: '34vw', 
                            maxHeight: '37vh', maxWidth: '34vw', objectFit: 'cover'}}/>
                    </Grid>
                    <Grid item xs={5.5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Typography maxWidth='100%' variant='h4' noWrap>{profile?.username}</Typography>
                        <br></br>
                        <Typography maxWidth='100%' maxHeight='37vh' overflow='hidden'>{profile?.bio}</Typography>
                    </Grid></Grid>
                    <Grid item xs={0.5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Grid item>
                            <IconButton onClick={() => {handleProfileAction();}}>
                                {isOwner ? <Edit/> : <FavoriteBorder/>}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {navigator.clipboard.writeText(window.location.href);}}>
                                <Link/>
                            </IconButton>
                        </Grid>
                    </Grid></Grid>
                </Grid>
            </Paper>                      
            <Feed/>
        </Box>
    );
}

export default Profile;