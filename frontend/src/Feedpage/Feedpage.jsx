import React, { useState } from 'react'
import './FeedPage.css'

export default function FeedPage() {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const posts = [
    {
      id: 1,
      community: 'memes',
      communityImg: null,
      verified: true,
      created_at: '8 hr. ago',
      title: 'How opinions change',
      votes: 18000,
      commentCount: 1500,
      awards: 6,
      userVote: null,
      color: '#ff4500',
    },
    {
      id: 2,
      community: 'webdev',
      communityImg: null,
      verified: false,
      created_at: '5 hr. ago',
      title: 'Built my first full-stack app using Node.js and MongoDB',
      votes: 3891,
      commentCount: 204,
      awards: 0,
      userVote: null,
      color: '#0079d3',
    },
  ]

  const popularCommunities = [
    { name: 'explainlikeimfive', members: '23,512,696', color: '#ff4500' },
    { name: 'IAmA',              members: '22,449,635', color: '#1c1c1c' },
    { name: 'classicwow',        members: '730,843',    color: '#c8a84b' },
    { name: 'Instagram',         members: '1,042,997',  color: '#ff4500' },
    { name: 'NintendoSwitch',    members: '7,917,683',  color: '#e4000f' },
  ]

  const formatVotes = (n) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n
  }

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

  return (
    <div>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="navbar">

        <div className="reddit-logo">
          <Alien size={32} />
          <span className="reddit-logo-text">reddit</span>
        </div>

        <div className="navbar-search">
          <Alien size={22} />
          <input type="text" placeholder="Find anything" />
          <div className="search-divider" />
          <button className="ask-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18" fill="#FF4500">
              <path d="M18.332 11.042l-4.05-7.056A4.875 4.875 0 009.92 1.5a4.898 4.898 0 00-4.198 2.485l-4.05 7.056a4.938 4.938 0 00.042 5.044 4.894 4.894 0 004.238 2.414h8.099c1.82 0 3.437-.957 4.32-2.559a4.956 4.956 0 00-.04-4.9v.002z"/>
            </svg>
            Ask
          </button>
        </div>

        {/* Right: logged in state */}
        <div className="navbar-right">
          {/* AD icon */}
          <button className="nav-icon-btn">
            <Icon size={20}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V9l6 4-6 4z"/></Icon>
          </button>
          {/* Chat */}
          <button className="nav-icon-btn">
            <Icon size={20}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>
          </button>
          {/* Create */}
          <button className="create-btn">
            <Icon size={18}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
            Create
          </button>
          {/* Notifications */}
          <button className="nav-icon-btn">
            <Icon size={20}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>
          </button>
          {/* User avatar */}
          <div className="user-avatar-wrapper">
            <button className="user-avatar" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="avatar-circle">
                <Alien size={28} />
              </div>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-profile">
                  <div className="dropdown-avatar"><Alien size={36} /></div>
                  <div className="dropdown-profile-info">
                    <span className="dropdown-name">View Profile</span>
                    <span className="dropdown-username">u/username</span>
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
                <button className="dropdown-item">
                  <Icon size={18}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>
                  Log Out
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

      {/* ── PAGE WRAPPER ───────────────────────────────────────────────── */}
      <div className="page-wrapper">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────────── */}
        <div className="left-sidebar">

          <div className="sidebar-top">
            <button className="collapse-btn">
              <Icon size={16}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>
            </button>
          </div>

          {/* Main nav */}
          <button className="nav-item active">
            <Icon><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>
            Home
          </button>
          <button className="nav-item">
            <span className="popular-circle"><Alien size={16} /></span>
            Popular
          </button>
          <button className="nav-item">
            <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></Icon>
            News
          </button>
          <button className="nav-item">
            <Icon><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Icon>
            Explore
          </button>
          <button className="nav-item">
            <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
            Start a community
          </button>

          <div className="sidebar-divider" />

          {/* Games on Reddit */}
          <div className="sidebar-section-header">
            GAMES ON REDDIT
            <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
          </div>

          <div className="sidebar-divider" />

          {/* Custom Feeds */}
          <div className="sidebar-section-header">
            CUSTOM FEEDS
            <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
          </div>
          <button className="resources-item">
            <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
            Create Custom Feed
          </button>

          <div className="sidebar-divider" />

          {/* Communities */}
          <div className="sidebar-section-header">
            COMMUNITIES
            <Icon size={12}><polyline points="6 9 12 15 18 9"/></Icon>
          </div>
          <button className="resources-item">
            <Icon><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></Icon>
            Manage Communities
          </button>

          <div className="sidebar-divider" />

          {/* Resources */}
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

        {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
        <div className="main-content">

          <div className="feed-container">

            <div className="feed-filters">
              <button className="filter-btn">Best <span className="caret">▾</span></button>
              <button className="filter-btn">Everywhere <span className="caret">▾</span></button>
              <button className="filter-btn">
                <Icon size={13}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>
                <span className="caret">▾</span>
              </button>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="post-card">

                <div className="post-header">
                  <div className="post-header-left">
                    <div className="community-avatar" style={{ backgroundColor: post.color }}>
                      {post.community[0].toUpperCase()}
                    </div>
                    <div className="post-meta">
                      <span className="community-link">r/{post.community}</span>
                      {post.verified && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0079d3" style={{ flexShrink: 0 }}>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01" stroke="white" strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                      <span className="post-time">• {post.created_at}</span>
                    </div>
                  </div>
                  <div className="post-header-right">
                    <button className="join-btn">Join</button>
                    <button className="options-btn">•••</button>
                  </div>
                </div>

                <h3 className="post-title">{post.title}</h3>

                <div className="post-image-area">[ Post Image ]</div>

                {/* Actions — matching Reddit exactly */}
                <div className="post-actions">

                  {/* Vote group: up arrow | count | down arrow */}
                  <div className="vote-pill">
                    <button className={`vote-btn ${post.userVote === 1 ? 'upvoted' : ''}`}>
                      {/* Upvote arrow — thick filled style */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                    </button>
                    <span className="vote-count">{formatVotes(post.votes)}</span>
                    <button className={`vote-btn ${post.userVote === -1 ? 'downvoted' : ''}`}>
                      {/* Downvote arrow */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </button>
                  </div>

                  {/* Comments */}
                  <button className="action-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {formatVotes(post.commentCount)}
                  </button>

                  {/* Awards */}
                  {post.awards > 0 && (
                    <button className="action-pill">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="6"/>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                      {post.awards}
                    </button>
                  )}

                  {/* Share */}
                  <button className="action-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    Share
                  </button>

                  {/* Summarize */}
                  <button className="action-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Summarize
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────── */}
          <div className="right-sidebar">
            <p className="communities-title">POPULAR COMMUNITIES</p>
            {popularCommunities.map((c) => (
              <div key={c.name} className="community-row">
                <div className="community-circle" style={{ backgroundColor: c.color }} />
                <div className="community-text">
                  <span className="community-name">r/{c.name}</span>
                  <span className="community-members">{c.members} members</span>
                </div>
              </div>
            ))}
            <button className="see-more-btn">See more</button>
            <div className="sidebar-divider" style={{ margin: '12px 0' }} />
            <div className="right-footer">
              <a>Reddit Rules</a>
              <a>Privacy Policy</a>
              <a>User Agreement</a>
              <a>Accessibility</a>
              <p className="footer-copy">Reddit, Inc. © 2026. All rights reserved.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showUserMenu && (
        <div className="dropdown-overlay" onClick={() => setShowUserMenu(false)} />
      )}

    </div>
  )
}