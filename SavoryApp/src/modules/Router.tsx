import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './shared/Feed';
import SplashPage from './pages/Splash';
import Profile from './pages/Profile/Profile';
import Login from './pages/Authorize/Login';
import Register from './pages/Authorize/Register';
import ProfileEdit from './pages/Profile/Profile.edit';
import StandardLayout from './StandardLayout';
import PostCreate from './pages/Post/Post.create';
import Settings from './pages/Settings';
import Error404 from './pages/Error404';

const StandardLayoutRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<StandardLayout/>}>
                <Route index element={<SplashPage/>}/>
                <Route path='profile/:username' element={<Profile/>}/>
                <Route path='profile/:username/:post' element={<Profile/>}/>
                <Route path='profile/:username/edit' element={<ProfileEdit/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="feed" element={<Feed/>}/>
                <Route path='feed/:filters' element={<Feed/>}/>
                <Route path='post/new' element={<PostCreate/>}/>
                <Route path='/settings/:username' element={<Settings/>}/>
                <Route path='*' element={<Error404/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default StandardLayoutRouter;