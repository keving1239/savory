import './feed.css'
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StandardLayoutRouter from '../modules/Router';

import Theme from './App.theme';
 
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <StandardLayoutRouter></StandardLayoutRouter>
        </ThemeProvider>
    </div>
  );
}
 
export default App;
 
/*
IF THEME PROVIDER/CSS BASELINE THROWING ERROR
import './feed.css'
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StandardLayoutRouter from '../modules/pages/router';
 
function App() {
  return (
    <div className="App">
        <CssBaseline />
        <StandardLayoutRouter></StandardLayoutRouter>
    </div>
  );
}
 
export default App;
 
*/