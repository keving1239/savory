import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, TextField, Card, CardContent } from '@mui/material';
import ProfileTile from './Profile.tile';

const ProfileEdit = () => {
    const tile = {img: '', bio: 'Welcome to my food blog!'}
    const id = '1';                                         // HARDCODED ID FOR NOW
    const {username} = useParams(); 
    const navigate = useNavigate();
    const [blogImg, setBlogImg] = useState(tile.img);
    const [blogBio, setBlogBio] = useState(tile.bio);

    const handleProfileEdits = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/person/${id}/edit/img`, {
          method: 'PUT',
          headers: {'Content-type':'application/json'},
          body: blogImg
        }).then(() => {
            console.log('Updated ' + username + "'s image.");
            fetch(`http://localhost:8080/api/person/${id}/edit/bio`, {
              method: 'PUT',
              headers: {'Content-type':'application/json'},
              body: blogBio
            }).then(() => {
              console.log('Updated ' + username + "'s bio.");
              navigate(`/profile/${username}`);
            });
        });
    }

    return (
        <Grid container justifyContent='center' alignItems='stretch' >
        <Grid container item xs={4} sx={{bgcolor: '#acb493'}} alignItems='center' justifyContent='center'>
            <ProfileTile {...{username: username || '', img: tile.img, bio: tile.bio}}/>
        </Grid>
        <Grid item xs={5} sx={{bgcolor: '#acb493'}}>
            <Card style={{ maxWidth: 400, margin: '0 auto', marginTop: 50, marginBottom: 50, padding: 10 }}>
                <CardContent>
                    <form onSubmit={(e) => handleProfileEdits(e)}>
                    <TextField 
                        type="file"
                        label="Blog Image"
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{ shrink: true }}  
                        onChange={(e) => {setBlogImg(e.target.value)}}
                    />
                    <TextField
                        label="Blog Bio"
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