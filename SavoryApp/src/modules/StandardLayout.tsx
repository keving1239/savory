import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './shared/Navbar';

export const StandardLayout = () => {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{padding: '2vh 2vw'}}>
        {/* Child route components will be rendered here */}
        <Outlet />
      </div>
    </>
  )
}

export default StandardLayout;