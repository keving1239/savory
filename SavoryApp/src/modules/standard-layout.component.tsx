import { Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import ResponsiveAppBar from './shared/Navbar';

export const StandardLayout = () => {
  const PageWrapper = styled('div')((props) => ({ padding: props.theme.spacing(4) }));
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