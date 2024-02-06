import { AppBar, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Box, styled } from '@mui/system';
import ResponsiveAppBar from '../shared/Navbar';

const navMenuOptions = [
  { to: '/', text: 'Home' },
  { to: '/heroes', text: 'Heroes' },
  { to: '/powers', text: 'Powers' },
];

const ToolbarFill = styled('div')({ flexGrow: 1});
const PageWrapper = styled('div')((props) => ({ padding: props.theme.spacing(4) }));

export const StandardLayout = () => {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <PageWrapper>
        {/* Child route components will be rendered here */}
        <Outlet />
      </PageWrapper>
    </>
  )
}

export default StandardLayout;