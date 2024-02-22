import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './shared/Feed';
import SplashPage from './pages/Splash';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/Profile.edit';
import StandardLayout from './StandardLayout';
import Bookmarks from './shared/Bookmarks';
import PostCreate from './pages/Post/Post.create';
import Settings from './pages/Profile/Settings';
import Error404 from './shared/Error404';
import LoadingAccount from './shared/LoadingAccount';

const StandardLayoutRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<StandardLayout/>}>
                <Route index element={<SplashPage/>}/>
                <Route path='profile/:username' element={<Profile/>}/>
                <Route path='profile/:username/:post' element={<Profile/>}/>
                <Route path='profile/edit' element={<ProfileEdit/>}/>
                <Route path="login" element={<LoadingAccount/>}/>
                <Route path="feed" element={<Feed/>}/>
                <Route path='feed/:filters' element={<Feed/>}/>
                <Route path='feed/bookmarks' element={<Bookmarks/>}/>
                <Route path='post/new' element={<PostCreate/>}/>
                <Route path='settings' element={<Settings/>}/>
                <Route path='*' element={<Error404/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default StandardLayoutRouter;