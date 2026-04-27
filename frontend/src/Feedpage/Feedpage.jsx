import React from 'react'
import './FeedPage.css'

export default function FeedPage() {

  const posts = [
    {
      id: 1,
      community: 'memes',
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

  /* ── Reusable alien SVG ─────────────────────────────────────────────────── */
  const Alien = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill="#FF4500" />
      <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.08 2.13.45a1 1 0 1 0 1-.92 1 1 0 0 0-.92.61l-2.38-.5a.27.27 0 0 0-.32.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.9 2.9 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.9 2.9 0 0 0 0-.44 1.46 1.46 0 0 0 .65-1.09zM7.27 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.58 2.71a3.58 3.58 0 0 1-2.85.71 3.58 3.58 0 0 1-2.85-.71.23.23 0 0 1 .33-.33 3.15 3.15 0 0 0 2.52.56 3.15 3.15 0 0 0 2.52-.56.23.23 0 0 1 .33.33zm-.2-1.71a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
    </svg>
  )

  /* ── Thin outline icon helper ───────────────────────────────────────────── */
  const Icon = ({ children, size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, color: '#878a8c' }}>
      {children}
    </svg>
  )

  return (
    <div>

      {/* ════════════════════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════════════════════ */}
      <nav className="navbar">

        {/* Logo: alien icon + italic "reddit" */}
        <div className="reddit-logo">
          <span className="reddit-logo-text">reddit</span>
        </div>

        {/* Search bar: alien | "Find anything" | divider | 🔥 Ask */}
        <div className="navbar-search">
          <Alien size={22} />
          <input type="text" placeholder="Find anything" />
          <div className="search-divider" />
          <button className="ask-btn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="20"
                height="20"
                fill="#FF4500"
            >
                <path d="M18.332 11.042l-4.05-7.056A4.875 4.875 0 009.92 1.5a4.898 4.898 0 00-4.198 2.485l-4.05 7.056a4.938 4.938 0 00.042 5.044 4.894 4.894 0 004.238 2.414h8.099c1.82 0 3.437-.957 4.32-2.559a4.956 4.956 0 00-.04-4.9v.002zM9.948 3.306a3.107 3.107 0 012.78 1.583l1.325 2.308c.5.871.697 1.203 1.002 1.559l-.066.093c-.455-.184-1.201-.212-1.885-.082-.757.144-1.38.48-1.48.538a3.229 3.229 0 01-3.241.005A3.272 3.272 0 016.93 7.536c-.428-1.218.012-2.562.96-3.417a3.107 3.107 0 012.058-.813h-.001zM3.253 15.158a3.142 3.142 0 01-.027-3.213L4.55 9.637c.499-.872.687-1.209.84-1.653l.114.011c.069.488.418 1.153.872 1.684a5.283 5.283 0 001.203 1.02 3.27 3.27 0 01.824 4.973c-.834.981-2.212 1.27-3.421.872a3.126 3.126 0 01-1.73-1.386zm13.55-.094a3.105 3.105 0 01-2.751 1.63h-2.65c-1 0-1.383.006-1.842.093l-.047-.104c.386-.305.783-.94 1.013-1.601a5.342 5.342 0 00.277-1.558 3.27 3.27 0 011.616-2.826 3.235 3.235 0 012.253-.378c1.262.236 2.2 1.292 2.46 2.545.16.737.05 1.513-.328 2.199z"/>
            </svg>

             Ask
        </button>
        </div>

        {/* Right actions */}
        <div className="navbar-right">
          <button className="get-app-btn">
            {/* Small square/phone icon */}
            <Icon size={16}>
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </Icon>
            Get App
          </button>
          <button className="login-btn">Log In</button>
          <button className="more-btn">•••</button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          PAGE WRAPPER
      ════════════════════════════════════════════════════════════════════ */}
      <div className="page-wrapper">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────────── */}
        <div className="left-sidebar">

          {/* Hamburger collapse button — sits at top-right edge of sidebar */}
          <div className="sidebar-top">
            <button className="collapse-btn">
              <Icon size={16}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>
            </button>
          </div>

          {/* Home */}
          <button className="nav-item">
            <Icon>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </Icon>
            Home
          </button>

          {/* Popular — alien icon in dark filled circle */}
          <button className="nav-item active">
            <span className="popular-circle">
              <Alien size={16} />
            </span>
            Popular
          </button>

          {/* News */}
          <button className="nav-item">
            <Icon>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="3" y1="15" x2="21" y2="15"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
            </Icon>
            News
          </button>

          {/* Explore */}
          <button className="nav-item">
            <Icon>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </Icon>
            Explore
          </button>

          <div className="sidebar-divider" />

          {/* RESOURCES header */}
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

        {/* ════════════════════════════════════════════════════════════════
            MAIN CONTENT
        ════════════════════════════════════════════════════════════════ */}
        <div className="main-content">

          <div className="feed-container">

            {/* Filter bar */}
            <div className="feed-filters">
              <button className="filter-btn">Best <span className="caret">▾</span></button>
              <button className="filter-btn">Everywhere <span className="caret">▾</span></button>
              <button className="filter-btn">
                <Icon size={13}>
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </Icon>
                <span className="caret">▾</span>
              </button>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="post-card">

                {/* Header */}
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

                {/* Title */}
                <h3 className="post-title">{post.title}</h3>

                {/* Image area */}
                <div className="post-image-area">[ Post Image ]</div>

                {/* Actions */}
                <div className="post-actions">
                  <div className="vote-pill">
                    <button className={`vote-btn ${post.userVote === 1 ? 'upvoted' : ''}`}>
                      <Icon size={14}><polyline points="18 15 12 9 6 15"/></Icon>
                    </button>
                    <span className="vote-count">{formatVotes(post.votes)}</span>
                    <button className={`vote-btn ${post.userVote === -1 ? 'downvoted' : ''}`}>
                      <Icon size={14}><polyline points="6 9 12 15 18 9"/></Icon>
                    </button>
                  </div>

                  <button className="action-pill">
                    <Icon size={14}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>
                    {formatVotes(post.commentCount)}
                  </button>

                  {post.awards > 0 && (
                    <button className="action-pill">
                      <Icon size={14}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></Icon>
                      {post.awards}
                    </button>
                  )}

                  <button className="action-pill">
                    <Icon size={14}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Icon>
                    Share
                  </button>

                  <button className="action-pill">
                    <Icon size={14}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>
                    Summarize
                  </button>
                </div>

              </div>
            ))}

          </div>

          {/* ── RIGHT SIDEBAR ───────────────────────────────────────────── */}
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

          </div>

        </div>
      </div>
    </div>
  )
}