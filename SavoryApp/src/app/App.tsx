import { ThemeProvider, CssBaseline } from '@mui/material';
import createAppTheme from './App.theme';
import StandardLayoutRouter from '../modules/Router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
 
const App = () => {
  const mode = useSelector((state: RootState) => state.persistedReducer.themeReducer.mode);
  return (
    <div style={{height: '100%', textAlign: 'center'}}>
      <ThemeProvider theme={createAppTheme(mode)}>
        <CssBaseline />
        <StandardLayoutRouter/>
      </ThemeProvider>
    </div>
  );
}
 
export default App;