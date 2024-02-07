import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './shared/Feed';
import SplashPage from './pages/Splash';
import BookmarkedPosts from './pages/BookmarkedPosts';
import Profile from './pages/Profile/Profile';
import Login from './pages/Authorize/Login';
import Register from './pages/Authorize/Register';
import ProfileEdit from './pages/Profile/Profile.edit';
import StandardLayout from './standard-layout.component';
import PostCreate from './pages/Post/Post.create';
import Post from './pages/Post/Post';
import Error404 from './pages/Error404';

// React Router Tutorial: https://reactrouter.com/docs/en/v6/getting-started/tutorial
export const StandardLayoutRouter = () => (
    <BrowserRouter>
        <Routes>
            {/* A parent route (e.g. StandardLayout) renders child routes (e.g. HomePage) 
      as children via the <Outlet /> element */}
            <Route path="/" element={<StandardLayout/>}>
                <Route index element={<SplashPage/>}></Route>
                <Route path="profile" element={<Profile/>}/>
                <Route path='profile/:username' element={<Profile/>}/>
                <Route path='profile/edit' element={<ProfileEdit/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="feed" element={<Posts/>}/>
                <Route path='feed/:filter' element={<BookmarkedPosts/>}/>
                <Route path='post/:id' element={<Post/>}/>
                <Route path='post/new' element={<PostCreate/>}></Route>
                <Route path='*' element={<Error404/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default StandardLayoutRouter;