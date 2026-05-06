import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './communitypage.css'

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const CommunityPage = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [community, setcommunity] = useState(null)
  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(true)
  const [joined, setjoined] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem('token')

        // get community by name
        const communityres = await axios.get(
          `http://localhost:5001/api/community/communities/name/${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const communitydata = communityres.data.community
        setcommunity(communitydata)
        setjoined(communitydata.isJoined || false)

        // get posts by community id
        const postsres = await axios.get(
          `http://localhost:5001/api/posts/community/${communitydata._id}/posts`
        )
        const sortedPosts = postsres.data.data
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setposts(sortedPosts)

      } catch (e) {
        console.log(e.message)
      } finally {
        setloading(false)
      }
    }
    fetchdata()
  }, [name])

  const handlejoin = async () => {
    try {
      const token = localStorage.getItem('token')
      if (joined) {
        await axios.delete(
          `http://localhost:5001/api/community/communities/${community._id}/leave`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setjoined(false)
      } else {
        await axios.post(
          `http://localhost:5001/api/community/communities/${community._id}/join`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setjoined(true)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  if (loading) return <div className="community-loading">Loading...</div>
  if (!community) return <div className="community-loading">Community not found.</div>

  return (
    <div className="community-page">

      {/* ── BANNER ─────────────────────────────────────────────────────── */}
      <div className="community-banner" />

      {/* ── COMMUNITY HEADER ───────────────────────────────────────────── */}
      <div className="community-header-bar">
        <div className="community-header-left">
          <div className="community-icon">
            <span className="community-icon-text">r/</span>
          </div>
          <h1 className="community-page-name">r/{community.name}</h1>
        </div>
        <div className="community-header-right">
          <button className="create-post-btn" onClick={() => navigate('createpost')}>
            <Icon size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>
            Create Post
          </button>
          <button
            className={`community-join-btn ${joined ? 'joined' : ''}`}
            onClick={handlejoin}
          >
            {joined ? 'Joined' : 'Join'}
          </button>
          <button className="community-more-btn">•••</button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ────────────────────────────────────────────────── */}
      <div className="community-main">

        {/* ── LEFT: POSTS ────────────────────────────────────────────── */}
        <div className="community-feed">

          {/* Filter bar */}
          <div className="community-filters">
            <button className="filter-btn">Best <span className="caret">▾</span></button>
            <button className="filter-btn">
              <Icon size={13}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>
              <span className="caret">▾</span>
            </button>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="no-posts">No posts yet. Be the first to post!</div>
          ) : (
            posts.map(post => (
              <PostCard key={post._id} post={post} communityName={name} />
            ))
          )}
        </div>

        {/* ── RIGHT: SIDEBAR ─────────────────────────────────────────── */}
        <div className="community-sidebar">
          <div className="community-about-card">
            <h3 className="about-title">{community.name}</h3>
            <p className="about-description">{community.description}</p>
            <div className="about-divider" />
            <div className="about-meta">
              <Icon size={14}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>
              <span>Created {new Date(community.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="about-meta">
              <Icon size={14}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></Icon>
              <span>Public</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const PostCard = ({ post, communityName }) => {
  const navigate = useNavigate()
  const avatarLabel = 'u/'
  const avatarText = post.user_id?.username || 'unknown'
  const avatarColor = '#0079d3'

  const [votes, setvotes] = useState(0)
  const [uservote, setuservote] = useState(null)
  const [showsummary, setshowsummary] = useState(false)
  const [summary, setsummary] = useState('')
  const [summaryloading, setsummaryloading] = useState(false)
  const [commentcount, setcommentcount] = useState(0)

  useEffect(() => {
    const fetchvotes = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:5001/api/votes/votes/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setvotes(res.data.score)
        setuservote(res.data.userVote || null)
      } catch (e) {
        console.log(e.message)
      }
    }

    const fetchcomments = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/comments/comments/${post._id}`)
        setcommentcount(res.data.data.length)
      } catch (e) {
        console.log(e.message)
      }
    }

    fetchvotes()
    fetchcomments()
  }, [post._id])

  const handlevote = async (votetype) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        `http://localhost:5001/api/votes/votes/${post._id}`,
        { vote_type: votetype },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.message === 'vote removed') {
        setvotes(prev => prev - (uservote || 0))
        setuservote(null)
      } else if (res.data.message === 'vote updated') {
        setvotes(prev => prev - (uservote || 0) + votetype)
        setuservote(votetype)
      } else {
        setvotes(prev => prev + votetype)
        setuservote(votetype)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const handlesummarize = async () => {
    if (showsummary) {
      setshowsummary(false)
      return
    }
    try {
      setsummaryloading(true)
      const token = localStorage.getItem('token')
      const res = await axios.post(
        `http://localhost:5001/api/postsummary/summary/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setsummary(res.data.data.summary_text)
      setshowsummary(true)
    } catch (e) {
      console.log(e.message)
    } finally {
      setsummaryloading(false)
    }
  }

  const formatvotes = (n) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n
  }

  return (
    <div className="post-card">

      {/* Post header */}
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-user-avatar" style={{ background: avatarColor }}>
            <span className="post-avatar-text">{avatarLabel}</span>
          </div>
          <span className="post-author">u/{avatarText}</span>
          <span className="post-dot">•</span>
          <span className="post-time">{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <button className="post-options">•••</button>
      </div>

      {/* Post title */}
      <h3 className="post-title">{post.title}</h3>

      {/* Post content */}
      {post.content && <p className="post-content">{post.content}</p>}

      {/* Post image */}
      {post.media_url && post.media_type === 'image' && (
        <div className="post-image-wrap">
          <img src={post.media_url} alt="Post visual" className="post-image" />
        </div>
      )}
      {post.media_url && post.media_type === 'video' && (
        <div className="post-image-wrap">
          <video controls src={post.media_url} className="post-image" />
        </div>
      )}
      {!post.media_url && post.image_url && (
        <div className="post-image-wrap">
          <img src={post.image_url} alt="Post visual" className="post-image" />
        </div>
      )}

      {/* Summary */}
      {showsummary && summary && (
        <div className="post-summary">
          <p className="summary-label">AI Summary</p>
          <p className="summary-text">{summary}</p>
        </div>
      )}

      {/* Actions */}
      <div className="post-actions">

        {/* Vote */}
        <div className="vote-pill">
          <button
            className={`vote-btn ${uservote === 1 ? 'upvoted' : ''}`}
            onClick={() => handlevote(1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
          <span className="vote-count">{formatvotes(votes)}</span>
          <button
            className={`vote-btn ${uservote === -1 ? 'downvoted' : ''}`}
            onClick={() => handlevote(-1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        {/* Comments */}
        <button
          className="action-pill"
          onClick={() => navigate(`/reddit/community/${communityName}/post/${post._id}`, {
            state: { from: `/reddit/community/${communityName}` }
          })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {commentcount}
        </button>

        {/* Share */}
        <button className="action-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Share
        </button>

        {/* Summarize */}
        <button className="action-pill" onClick={handlesummarize}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {summaryloading ? 'Loading...' : showsummary ? 'Hide Summary' : 'Summarize'}
        </button>

      </div>
    </div>
  )
}

export default CommunityPage