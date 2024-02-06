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
import { Margin } from '@mui/icons-material';

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

  export default function Error404()
  {
    return(
        <React.Fragment>
            <Box sx = {{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Typography sx = {{fontFamily: 'montseratt', color: 'black', fontSize: 50}}>
                    Error 404: Not Found
                </Typography>

            </Box>
        </React.Fragment>

    );
  }