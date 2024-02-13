import { Typography, Card, CardContent, CardMedia } from '@mui/material';

export interface TileProps {
    username: string;
    img?: string;
    bio: string;
}

const ProfileTile = ({username, img, bio}: TileProps) => {
    return (
        <Card elevation={5}>
            <CardMedia component='img' src={img || '/logo512.png'} alt={username || 'Jane Doe'} sx={{height: '30vh'}}/>
            <CardContent>
                <Typography variant='h5' align='left'>{username || 'Jane Doe'}</Typography>
                <Typography variant='body2' align='left'>{bio || '...'}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileTile;