import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, MenuItem, Menu, Paper, Box, IconButton, Button } from '@mui/material';
import {Edit, Share, Group} from '@mui/icons-material'
import ProfileTile from './Profile.tile';
import Feed from '../../shared/Feed';

const Profile = () => {
    const {username, postString} = useParams()
    var post: number = Number(postString);
    const isPostOpen = Boolean(post);
    // **************************************************************************    
    return(
        <Box sx={{ mt: 5 }}>
            <ProfileOverview username = {username || ''}/>                        
            {isPostOpen ? <Feed id={post}/> : <Feed/>}
        </Box>
    );
}

export const ProfileOverview = ({username}: {username: string}) => {
    // To be retrieved by REST API and use state *******************************
    const tile = {username: username, img: '', bio: 'Welcome to my food blog!'};  
    const stats = {likes: 189, followers: 18, following: 42};
    const isOwner = true;
    const [ownerOptions, setOwnerOptions] = useState(isOwner) // Will need to raise level to change on logout/login/session user
    // *************************************************************************
    // LOGIC FROM NAVBAR - TO CHANGE *******************************************
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [copySuccess, setCopySuccess] = useState('');
    useEffect(() => {
        console.log(copySuccess);
    }, [copySuccess]);
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopySuccess('Copy Link Successful');
        } catch (err) {setCopySuccess('Copy Link Failed');}
    } 
    const followOptions = ['Follow', 'Block'];
    return (
        <Paper
            sx={{
                p: '1.5vh',
                margin: '4vh auto',
                minWidth: '40vw',
                maxWidth: '70vw',
                flexGrow: 1,
                backgroundColor: 'primary.light'
            }}
        >
        <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'}>
                    <Grid item xs={6}><ProfileTile {...tile}/></Grid>
                    <Grid item xs={3}><ProfileStats {...stats}/></Grid>
                    <Grid item xs={1}><Grid container direction={'column'} justifyContent={'space-between'}>
                        {ownerOptions && <Grid item>
                            <Link to={`/profile/${username}/edit`}><IconButton><Edit sx={{ color: 'primary.dark' }}/></IconButton></Link>
                        </Grid>}
                        {!ownerOptions && <Grid item><IconButton onClick={handleOpenUserMenu}><Group sx={{ color: 'primary.dark' }}></Group></IconButton>
                            <Menu keepMounted
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                                {followOptions.map((option) => (
                                    <MenuItem key={option} onClick={handleCloseUserMenu} sx={{p: 0, m: '.25vw'}}>
                                        <Button variant='text' fullWidth sx={{p: 0}}>
                                            <Typography textAlign="center">{option}</Typography>
                                        </Button>
                                    </MenuItem>
                                ))}
                            </Menu></Grid>}
                        <Grid item><IconButton onClick={handleShare}><Share sx={{ color: 'primary.dark' }}></Share></IconButton></Grid>
                        {/* <Grid item><Button variant='contained' sx={{color: 'primary.dark'}} onClick={() => setOwnerOptions(!ownerOptions)}>L</Button></Grid> */}
                    </Grid></Grid>
            </Grid></Paper>
    );
}

interface ProfileStatsProps {
    likes?: number,
    followers?: number,
    following?: number
}

const ProfileStats = ({likes, followers, following}: ProfileStatsProps) => {
    return (
    <Grid container direction ={'column'} justifyContent={'space-between'} rowSpacing={6}>
        <Grid container item justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Likes</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{likes || 0}</Typography></Grid>
        </Grid>
        <Grid container item justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Followers</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{followers || 0}</Typography></Grid>
        </Grid>
        <Grid container item justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Following</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{following || 0}</Typography></Grid>
        </Grid>
    </Grid>
    );
}


export default Profile;