import React, { useState } from 'react';
import { Typography, Grid, Button, TextField, Card, CardContent, CardMedia, Container } from '@mui/material';

const ProfileEdit = () => {
    const tile = {name: 'Johe Doe', imgSrc: '', bio: 'ajl;fdkja;lsdfkjas;ldfksjal;sdkfjal;skdfjl;aksfdj;lakdfjsl;aksdjfl;afkdjl;afsdjkjfadlk;ajdfkl;ajdfkaoldf;jfads'};
    const [blogName, setBlogName] = useState(tile.name);
    const [blogImg, setBlogImg] = useState(tile.imgSrc);
    const [blogBio, setBlogBio] = useState(tile.bio);
    const handleProfileEdits = () => {
        tile.name = blogName;
        tile.imgSrc = blogImg;
        tile.bio = blogBio;
        console.log(tile);
    }


    return (
        <Card style={{ maxWidth: 400, margin: '0 auto', marginTop: 50, marginBottom: 50, padding: 10 }}>
            <CardContent>
            <form onSubmit={handleProfileEdits}>
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
                label="Blog Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={blogName}
                onChange={(e) => {setBlogName(e.target.value)}}/>
            <TextField
                label="Blog Bio"
                variant="outlined"
                fullWidth
                margin="normal"
                value={blogBio}
                onChange={(e) => {setBlogBio(e.target.value)}}/>    
            </form>
            </CardContent>
            <Button type="submit" variant="contained" color="primary" onClick={handleProfileEdits}>Update</Button>
        </Card>
    );
}

export default ProfileEdit;