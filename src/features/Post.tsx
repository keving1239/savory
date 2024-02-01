import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      light: '#7f895f',
      main: '#606c38',
      dark: '#283618',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});



export default function Post() {
    return (
      
<React.Fragment>
  <Box sx = {{bgcolor: 'beige', margin: 5}}>
<Box component="section" sx={{ p: 8, border: '2px solid black', bgcolor: '#606c38', margin: 10, marginLeft: 30, marginRight: 30}}>
<Grid container spacing={8} direction = "column" justifyContent = "space-between">
<Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              textAlign: "center"
            }}
          >
            Make A Post
</Typography>
  <Grid item xs={8} sm={6}>
    <TextField
      id = "headline"
      name = "headline"
      label = "Headline"
      sx = {{bgcolor: 'white', border: '2px solid black'}}
      
    />
  </Grid>
  <Grid item xs={8} sm={6}>
    <TextField
      id = "ingredients"
      name =  "ingredients"
      label = "Ingredients"
      multiline
      rows = {4}
      sx = {{bgcolor: 'white', border: '2px solid black'}}
      
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      id = "recipe"
      name =  "recipe"
      label = "Recipe"
      multiline
      rows = {4}
      sx = {{bgcolor: 'white', border: '2px solid black', width: 500}}
      margin='dense'
    />
  </Grid>
</Grid>
<Button variant="contained" color="success" size = "small">
        Post
</Button>
    </Box>
</Box>
</React.Fragment>
    );
}