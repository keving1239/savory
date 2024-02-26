import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, Card, CardContent, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../../redux/store';
import { updateUser } from '../../../redux/User/user-slice';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const isAuthenticated = useSelector((state: RootState) => state.persistedReducer.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    const [blogUsername, setBlogUsername] = useState(user?.username || '');
    const [blogImg, setBlogImg] = useState(user?.img || '');
    const [blogBio, setBlogBio] = useState(user?.bio || '');
    const [usernameError, setUsernameError] = useState({error: false, helperText: ''});

    const handleProfileEdits = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user) return;
        // ensure username is unique
        if(!user.username) {
            const checkUsername = await fetch(`http://localhost:8080/api/person/usernameAvailable/${blogUsername}`, fetchOptions({
                method: 'GET',
            }));
            const isAvailable = await checkUsername.json();
            if(!isAvailable) return setUsernameError({error: true, helperText: 'Username is already in use.'})
            const isValid = /^[a-zA-Z0-9_.]{3,20}$/.test(blogUsername);
            if(!isValid) return setUsernameError({error: true, helperText: 'Only use letters, numbers, or "." and 3-20 characters'});
            setUsernameError({error: false, helperText: ''});
        }
        await dispatch(updateUser({id: user.id, username: user.username || blogUsername, 
            email: user.email, img: blogImg, bio: blogBio}));
        navigate(`/profile/${user.username}`);
    }

    return (
        <Grid container justifyContent='center' alignItems='stretch' >
            <Grid container item xs={7} sx={{bgcolor: '#acb493'}} alignItems='center' justifyContent='space-around'>
                <Grid item xs={8}>
                    <Paper 
                    component='img'
                    alt={blogUsername}
                    src={user?.img}
                    sx={{minHeight: '37vh', minWidth: '34vw', 
                    maxHeight: '37vh', maxWidth: '34vw', objectFit: 'cover'}}/>
                </Grid>
                <Grid item xs={4}><Grid container direction={'column'} justifyContent={'space-between'}>
                    <Typography maxWidth='100%' variant='h4' noWrap>{blogUsername}</Typography>
                    <br></br>
                    <Typography maxWidth='100%' maxHeight='37vh' overflow='hidden'>{blogBio}</Typography>
                </Grid></Grid>
            </Grid>
        <Grid item xs={5} sx={{bgcolor: '#acb493'}}>
            <Card style={{ maxWidth: 400, margin: '0 auto', marginTop: 50, marginBottom: 50, padding: 10 }}>
                <CardContent>
                    <form onSubmit={(e) => handleProfileEdits(e)}>
                    {!user?.username ? <TextField
                        type='text'
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        {...usernameError}
                        margin= 'normal'
                        value={blogUsername}
                        onChange={(e) => {setBlogUsername(e.target.value)}}
                    /> : <></>}
                    <TextField 
                        type="text"
                        label="Image URL"
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        placeholder='https://images.unsplash.com/...'
                        value = {blogImg}  
                        onChange={(e) => {setBlogImg(e.target.value)}}
                    />
                    <TextField
                        type='text'
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={5}
                        maxRows={5}
                        margin="normal"
                        value={blogBio}
                        onChange={(e) => {setBlogBio(e.target.value)}}/>    
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
        </Grid>
    );
}

export default ProfileEdit;
