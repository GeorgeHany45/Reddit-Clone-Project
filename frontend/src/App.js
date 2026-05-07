import './App.css';
import AuthPage from './loginpage/Authpage';
import Layout from './Layout/layout';
import HomePage from './Feedpage/homefeed';
import ExplorePage from './Feedpage/explore';
import CreatePost from './Posts/createpost';
import ProfilePage from './pages/profile';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageCommunities from './Feedpage/managecommunities';
import CommunityPage from './community/communitypage';
import PostDetails from './community/postdetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/reddit" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="communities" element={<ManageCommunities />} />
            <Route path="community/:name" element={<CommunityPage />} />
            <Route path="community/:name/createpost" element={<CreatePost />} />
            <Route path="community/:name/post/:postId" element={<PostDetails />} />
            <Route path="createpost" element={<CreatePost />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;