import React, { ChangeEvent } from 'react';
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
import { useState } from 'react';
import { Input } from '@mui/material';

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



export default function Post() 
{
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setSelectedFile(file || null)
    };

    const handleUpload = () => {
      if (selectedFile){
        console.log('Uploading file', selectedFile)
      }
      else
      {
        console.log('No file selected.')
      }

    };
    return (
      
<React.Fragment>
<Box sx = {{height: '100vd', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
<Box component="section" sx={{ p: 8, border: '2px solid black', bgcolor: '#606c38', margin: 10, marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}>
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
            Make A Post!
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
  <Input type='file' inputProps={{ accept: 'image/*'}} onChange={handleFileChange} style={{margin: '30px'}} />
</Grid>
<Button variant="contained" color="success" size = "small">
        Post
</Button>
</Box>
</Box>
</React.Fragment>
    );
}