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
 