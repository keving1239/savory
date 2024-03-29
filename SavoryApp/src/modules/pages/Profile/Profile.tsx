import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import {Report, Link, Edit, Star, Block} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState, fetchOptions } from '../../../redux/store';
import Feed from '../../shared/Feed';

const Profile = () => {
    const navigate = useNavigate();
    const {username} = useParams();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const isAdmin = useSelector((state: RootState) => state.userReducer.isAdmin); 
    const isOwner = user?.username === username;
    const [profile, setProfile] = useState({id: 105, username: '', img: '', bio: ''});
    const [metrics, setMetrics] = useState(0);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    // viewed profile retrieval
    async function retrieveUser() {
        if(user && username === user?.username) return setProfile({...user});
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/person/byUsername/${username}`, fetchOptions({
                method: 'GET'
            }));
            const data = await response.json();
            setProfile({id: data.id, username: data.username, img: data.img, bio: data.bio});
        } catch(error) {console.error(error);}
    }
    async function retrieveMetrics() {
        const fetchMetrics = await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/profile/interactions/${profile.id}`, 
            fetchOptions({method:'GET'}));
        const total = await fetchMetrics.json() || 0;
        setMetrics(total);
    }
    useEffect(() => {
        if(username === profile.username) return;
        setProfile({id: 0, username: '', img: '', bio: ''});
        retrieveUser();
    }, [username]);
    useEffect(() => {
        retrieveMetrics();
    },[profile]);

    function handleProfileAction() {
        if(isOwner) return navigate(`/profile/edit`);
        if(isAdmin) return navigate(`/report/${username}`);
        setReportDialogOpen(true);
    }

    return(
        <Box>
            <Paper sx={{p: '1.5vh', margin: '3vh auto 1vh auto', maxWidth: '75vw', backgroundColor: 'primary.light'}}>
                <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'}>
                    <Grid item xs={6}>
                    <Paper 
                            component='img'
                            alt={profile?.username}
                            src={profile?.img}
                            sx={{minHeight: '40vh', minWidth: '34vw', 
                            maxHeight: '40vh', maxWidth: '34vw', objectFit: 'cover'}}/>
                    </Grid>
                    <Grid item xs={5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Typography maxWidth='100%' variant='h4' noWrap>{profile?.username}</Typography>
                        <br></br>
                        <Typography maxWidth='100%' maxHeight='40vh' overflow='hidden'>{profile?.bio}</Typography>
                    </Grid></Grid>
                    <Grid item xs={0.5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Grid item>
                            <Tooltip title='Social Reach' placement='right'>
                            <IconButton><Star/></IconButton>
                            </Tooltip>
                            <Typography variant='h6' noWrap>{metrics}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {navigator.clipboard.writeText(window.location.href);}}>
                            <Tooltip title='Share' placement='right'>
                                <Link/>
                            </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {handleProfileAction();}}>
                                {isOwner ? 
                                <Tooltip title='Edit' placement='right'>
                                    <Edit/>
                                </Tooltip>
                                : isAdmin ? 
                                <Tooltip title='Remove' placement='left'>
                                    <Block/>
                                </Tooltip>  
                                : <Tooltip title='Report' placement='right'>
                                    <Report/>
                                </Tooltip>}
                            </IconButton>
                        </Grid>
                    </Grid></Grid>
                </Grid>
            </Paper>                      
            {profile?.username ? <Feed/> : <></>}
            <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)}>
                <DialogTitle>{"Report this account?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to report this account to Savory administrators. 
                        Are you sure you want to report this account? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReportDialogOpen(false)} variant='outlined'>Cancel</Button>
                    <Button onClick={() => {
                        setReportDialogOpen(false);
                        navigate(`/report/${username}`);
                    }} variant='outlined' color='error'>Report</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Profile;