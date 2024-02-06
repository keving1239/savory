import React from 'react';
import './App.css';
import Theme from './App.theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ResponsiveAppBar from '../modules/shared/Navbar';
import SplashPage from '../modules/pages/Splash';
import Profile from '../modules/pages/Profile/Profile';
import Post from '../modules/shared/Post.create';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        {/* REPLACE BELOW WITH ROUTER*/}
        <ResponsiveAppBar></ResponsiveAppBar>
        {/* <SplashPage></SplashPage> */}
        <Profile username='janedoe1'></Profile>
      </ThemeProvider>
    </div>
  );
}

export default App;
