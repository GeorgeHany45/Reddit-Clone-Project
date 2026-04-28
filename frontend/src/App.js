import './App.css';
import AuthPage from './loginpage/Authpage';
import FeedPage from './Feedpage/Feedpage';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/reddit" element={<FeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;