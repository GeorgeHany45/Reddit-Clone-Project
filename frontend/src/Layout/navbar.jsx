import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Communitycreation from '../community/communitycreation'
import './navbar.css'
import Search from '../search component/search'
const Alien = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill="#FF4500" />
    <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.08 2.13.45a1 1 0 1 0 1-.92 1 1 0 0 0-.92.61l-2.38-.5a.27.27 0 0 0-.32.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.9 2.9 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.9 2.9 0 0 0 0-.44 1.46 1.46 0 0 0 .65-1.09zM7.27 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.58 2.71a3.58 3.58 0 0 1-2.85.71 3.58 3.58 0 0 1-2.85-.71.23.23 0 0 1 .33-.33 3.15 3.15 0 0 0 2.52.56 3.15 3.15 0 0 0 2.52-.56.23.23 0 0 1 .33.33zm-.2-1.71a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
  </svg>
)

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showsearch, setshowsearch] = useState(false)
  const [query, setquery] = useState('')
  const [username, setUsername] = useState('username')
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Navbar mounted, checking localStorage...");
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log("Token:", token ? "EXISTS" : "MISSING");
    console.log("User localStorage value:", user);
    
    if (user && user !== 'undefined') {
      try {
        const userData = JSON.parse(user);
        console.log("Parsed user data:", userData);
        setUsername(userData.username || 'username');
      } catch (err) {
        console.error('Failed to parse user data:', err);
        setUsername('username');
      }
    } else {
      console.log("No valid user data in localStorage");
      setUsername('username');
    }
  }, [])

  const handleLogout = () => {
    console.log("Logout button clicked!");
    console.log("Before logout - Token:", localStorage.getItem('token') ? 'EXISTS' : 'MISSING');
    console.log("Before logout - User:", localStorage.getItem('user'));
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    console.log("After logout - Token:", localStorage.getItem('token') ? 'EXISTS' : 'MISSING');
    console.log("After logout - User:", localStorage.getItem('user'));
    
    setShowUserMenu(false);
    console.log("Navigating to /...");
    
    navigate('/');
  }

  return (
    <>
      <nav className="navbar">

        <div className="reddit-logo" onClick={() => navigate('/')}>
          <Alien size={32} />
          <span className="reddit-logo-text">reddit</span>
        </div>

     <div className="navbar-search" style={{ position: 'relative' }} >
          <Alien size={22} />
          <input
              type="text"
              placeholder="Find anything"
              value={query}
              onChange={(e) => {
                  setquery(e.target.value)
                  setshowsearch(e.target.value.trim() !== '')
              }}
              onFocus={() => { if (query.trim()) setshowsearch(true) }}
              onBlur={() => setTimeout(() => setshowsearch(false), 200)}
          />
          <div className="search-divider" />
          <button className="ask-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18" fill="#FF4500">
                  <path d="M18.332 11.042l-4.05-7.056A4.875 4.875 0 009.92 1.5a4.898 4.898 0 00-4.198 2.485l-4.05 7.056a4.938 4.938 0 00.042 5.044 4.894 4.894 0 004.238 2.414h8.099c1.82 0 3.437-.957 4.32-2.559a4.956 4.956 0 00-.04-4.9v.002z"/>
              </svg>
              Ask
          </button>
          {showsearch && <Search query={query} />}
      </div>

        <div className="navbar-right">
          <button className="nav-icon-btn">
            <Icon size={20}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V9l6 4-6 4z"/></Icon>
          </button>
          <button className="nav-icon-btn">
            <Icon size={20}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>
          </button>
          <button className="create-btn" onClick={() => navigate('/reddit/createpost')}>
            <Icon size={18}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
            Create
          </button>
          <button className="nav-icon-btn">
            <Icon size={20}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>
          </button>

          <div className="user-avatar-wrapper">
            <button className="user-avatar" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="avatar-circle">
                <Alien size={28} />
              </div>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-profile">
                  <div className="dropdown-avatar"><Alien size={36} /></div>
                  <div className="dropdown-profile-info">
                    <span className="dropdown-name">View Profile</span>
                    <span className="dropdown-username">u/{username}</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <Icon size={18}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>
                  Edit Avatar
                </button>
                <button className="dropdown-item">
                  <Icon size={18}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></Icon>
                  Drafts
                </button>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></Icon>
                  <div className="dropdown-item-info">
                    <span>Achievements</span>
                    <span className="dropdown-sub">2 unlocked</span>
                  </div>
                </button>
                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></Icon>
                  <div className="dropdown-item-info">
                    <span>Earn</span>
                    <span className="dropdown-sub">Earn cash on Reddit</span>
                  </div>
                </button>
                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/></Icon>
                  Premium
                </button>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></Icon>
                  Display Mode
                </button>
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLogout()
                  }}
                >
                  <Icon size={18}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>
                  Log Out1
                </button>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <Icon size={18}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></Icon>
                  Advertise on Reddit
                </button>
                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="12" r="10"/></Icon>
                  Try Reddit Pro <span className="reddit-pro-badge">BETA</span>
                </button>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <Icon size={18}><circle cx="12" cy="12" r="3"/></Icon>
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showUserMenu && (
        <div className="dropdown-overlay" onClick={() => setShowUserMenu(false)} />
      )}

    </>
  )
}

export default Navbar
