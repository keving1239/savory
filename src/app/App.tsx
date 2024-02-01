import React from 'react';
import './App.css';
import Theme from './App.theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ResponsiveAppBar from '../modules/shared/nav_bar/nav_bar2';
import SplashPage from '../modules/pages/Splash';
import Profile from '../modules/pages/Profile';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>
        <Profile username='janedoe1'></Profile>
        {/* <SplashPage></SplashPage> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
