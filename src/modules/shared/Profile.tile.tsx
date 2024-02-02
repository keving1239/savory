import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

interface TileProps {
    name: string;
    imgSrc?: string;
    bio: string;
}

const ProfileTile = ({name, imgSrc, bio}: TileProps) => {
    return (
        <Card sx={{ maxWidth: 500, minWidth: 220 }}>
            <CardMedia component='img' height='200' src={imgSrc || '/logo512.png'} alt={name || 'Jane Doe'}/>
            <CardContent>
                <Typography variant='h5' align='left'>{name || 'Jane Doe'}</Typography>
                <Typography variant='body2' align='left'>{bio || '...'}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileTile;