import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import { CircularProgress } from '@mui/material';

const Error404 = () => {
  // return home after 2.5s
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 2500);
    return () => clearTimeout(timeout);
  },[]);
  return(
    <Box>
      <Typography variant='h3' mt='10vh'>Nothing Here</Typography>
      <Typography mb='10vh'>Navigating home...</Typography>
      <CircularProgress />
    </Box>
  );
}

export default Error404;