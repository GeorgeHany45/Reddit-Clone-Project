import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "./explore.css";

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const ExplorePage = () => {
    const [posts, setposts] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchfeedposts = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log("Token:", token ? "EXISTS" : "MISSING");
                console.log("Fetching posts from /api/posts/posts...");
                
                const response = await axios.get(
                    'http://localhost:5001/api/posts/posts',
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                
                console.log("Posts response:", response.data);
                console.log("Posts data:", response.data.data);
                console.log("Number of posts:", response.data.data ? response.data.data.length : 0);
                
                setposts(response.data.data || [])
            } catch (e) {
                console.error("Error fetching posts:", e.response?.data || e.message);
                console.error("Full error:", e);
            } finally {
                setloading(false)
            }
        }
        fetchfeedposts()
    }, [])

    if (loading) return <div className="explore-loading">Loading...</div>

    return (
        <div className="explore-page">
            <h1 className="explore-title">Home Feed</h1>

            {posts.length === 0 ? (
                <p className="explore-empty">No posts from joined communities yet. Join some communities to see posts!</p>
            ) : (
                <div className="feed-container">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const PostCard = ({ post }) => {
  const navigate = useNavigate()
  const avatarLabel = 'u/'
  const avatarText = post.user_id?.username || 'unknown'
  const avatarColor = '#0079d3'
  const communityName = post.community_id?.name || 'community'

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
          <span className="post-community">r/{communityName}</span>
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
            state: { from: `/reddit` }
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

export default ExplorePage