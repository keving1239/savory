import React from 'react';
import ResponsiveAppBar from '../modules/shared/Navbar';
import Posts from '../modules/shared/Feed';
import './feed.css'

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
