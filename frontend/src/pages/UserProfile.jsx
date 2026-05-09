import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/user/${username}`);
        setUser(response.data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <h2>User not found</h2>
          <p>The user "{username}" doesn't exist.</p>
          <button onClick={() => navigate('/reddit')} className="profile-back-btn">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <button className="profile-back-btn" onClick={() => navigate('/reddit')}>
        <Icon size={20}><path d="M19 12H5M12 19l-7-7 7-7"/></Icon>
        Back
      </button>

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <svg width={48} height={48} viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#0079d3" />
                  <path d="M10 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM5 8.5h10a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5v-4A2.5 2.5 0 0 1 5 8.5z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-username">u/{user.username}</h1>
              <p className="profile-email">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="profile-bio-section">
            <h3>About</h3>
            <p>{user.bio}</p>
          </div>
        )}

        {/* Posts placeholder */}
        <div className="profile-content">
          <div className="profile-section">
            <h3>Posts</h3>
            <p className="profile-placeholder">Posts will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;