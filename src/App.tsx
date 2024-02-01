import React from 'react';
import './App.css';
import ResponsiveAppBar from './modules/nav_bar/nav_bar2';
import Posts from './modules/feed/posts';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <div className="App-posts">
        <Posts></Posts>

      
      </div>
    </div>
  );
}

export default App;
