import './App.css';
import AuthPage from './loginpage/Authpage';
import Layout from './Layout/layout';
import ExplorePage from './Feedpage/explore';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/reddit" element={<Layout />}>
            <Route path="explore" element={<ExplorePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;