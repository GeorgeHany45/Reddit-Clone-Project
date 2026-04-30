import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Communitycreation from '../community/communitycreation'
import './sidebar.css'

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

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showCommunityModal, setShowCommunityModal] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <>
      <div className="left-sidebar">

        <div className="sidebar-top">
          <button className="collapse-btn">
            <Icon size={16}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>
          </button>
        </div>

        <button className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
          <Icon><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>
          Home
        </button>

        <button className={`nav-item ${isActive('/popular') ? 'active' : ''}`} onClick={() => navigate('/popular')}>
          <span className="popular-circle"><Alien size={16} /></span>
          Popular
        </button>

        <button className={`nav-item ${isActive('/news') ? 'active' : ''}`} onClick={() => navigate('/news')}>
          <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></Icon>
          News
        </button>

        <button className={`nav-item ${isActive('/explore') ? 'active' : ''}`} onClick={() => navigate('/explore')}>
          <Icon><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Icon>
          Explore
        </button>

        <button className="nav-item" onClick={() => setShowCommunityModal(true)}>
          <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
          Start a community
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-section-header">
          GAMES ON REDDIT
          <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section-header">
          CUSTOM FEEDS
          <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
        </div>
        <button className="resources-item">
          <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
          Create Custom Feed
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-section-header">
          COMMUNITIES
          <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
        </div>
        <button className="resources-item">
          <Icon><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></Icon>
          Manage Communities
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-section-header">
          RESOURCES
          <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
        </div>

        <button className="resources-item">
          <Icon><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>
          About Reddit
        </button>
        <button className="resources-item">
          <Icon><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></Icon>
          Advertise
        </button>
        <button className="resources-item">
          <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Icon>
          Developer Platform
        </button>
        <button className="resources-item">
          <Icon><circle cx="12" cy="12" r="10"/></Icon>
          Reddit Pro <span className="reddit-pro-badge">BETA</span>
        </button>
        <button className="resources-item">
          <Icon><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>
          Help
        </button>
        <button className="resources-item">
          <Icon><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Icon>
          Blog
        </button>
        <button className="resources-item">
          <Icon><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>
          Careers
        </button>
        <button className="resources-item">
          <Icon><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/></Icon>
          Press
        </button>

        <div className="sidebar-divider" />

        <button className="resources-item">
          <Icon><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></Icon>
          Best of Reddit
        </button>
        <button className="resources-item">
          <Icon><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></Icon>
          Best of Reddit in Port...
        </button>
        <button className="resources-item">
          <Icon><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></Icon>
          Best of Reddit in Ger...
        </button>

        <div className="sidebar-divider" />

        <button className="resources-item">
          <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>
          Reddit Rules
        </button>
        <button className="resources-item">
          <Icon><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>
          Privacy Policy
        </button>
        <button className="resources-item">
          <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></Icon>
          User Agreement
        </button>
        <button className="resources-item">
          <Icon><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></Icon>
          Accessibility
        </button>

        <div className="sidebar-divider" />
        <p className="sidebar-footer-text">Reddit, Inc. © 2026. All rights reserved.</p>

      </div>

      {showCommunityModal && (
        <Communitycreation onClose={() => setShowCommunityModal(false)} />
      )}
    </>
  )
}

export default Sidebar