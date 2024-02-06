import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from '../shared/Feed';
import SplashPage from './Splash';
import BookmarkedPosts from './BookmarkedPosts';
import Profile from './Profile/Profile';
import Login from './Authorize/Login';
import Register from './Authorize/Register';
import ProfileEdit from './Profile/Profile.edit';
import StandardLayout from './standard-layout.component';
import Post from '../shared/Post.create';

// React Router Tutorial: https://reactrouter.com/docs/en/v6/getting-started/tutorial
export const StandardLayoutRouter = () => (
    <BrowserRouter>
        <Routes>
            {/* A parent route (e.g. StandardLayout) renders child routes (e.g. HomePage) 
      as children via the <Outlet /> element */}
            <Route path="/" element={<StandardLayout></StandardLayout>}>
                <Route index element={<SplashPage></SplashPage>}></Route>
                <Route path="profile" element={<Profile username="kevin"></Profile>}>
                </Route>
                <Route path="bookmarks" element={<BookmarkedPosts></BookmarkedPosts>}>
                </Route>
                <Route path="login" element={<Login></Login>}>
                </Route>
                <Route path="register" element={<Register></Register>}>
                </Route>
                <Route path="feed" element={<Posts></Posts>}>
                </Route>
                <Route path="post" element={<Post></Post>}>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default StandardLayoutRouter;