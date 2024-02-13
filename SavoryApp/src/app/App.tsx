import { ThemeProvider, CssBaseline } from '@mui/material';
import Theme from './App.theme';
import StandardLayoutRouter from '../modules/Router';
 
const App = () => {
  return (
    <div style={{height: '100%', textAlign: 'center'}}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <StandardLayoutRouter/>
      </ThemeProvider>
    </div>
  );
}
 
export default App;