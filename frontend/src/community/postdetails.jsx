import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './communitypage.css'

const PostDetails = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [post, setpost] = useState(null)
  const [comments, setcomments] = useState([])
  const [loading, setloading] = useState(true)
  const [commentText, setcommentText] = useState('')
  const [submitting, setsubmitting] = useState(false)
  const [error, seterror] = useState('')

  const backPath = location.state?.from || '/reddit'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/posts/${postId}`),
          axios.get(`http://localhost:5001/api/comments/comments/${postId}`)
        ])
        setpost(postRes.data.data)
        setcomments(commentsRes.data.data)
      } catch (e) {
        console.log(e.message)
      } finally {
        setloading(false)
      }
    }
    fetchData()
  }, [postId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    seterror('')
    if (!commentText.trim()) {
      seterror('Please write a comment before submitting.')
      return
    }

    try {
      setsubmitting(true)
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:5001/api/comments/comments/${postId}`,
        { text: commentText.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const commentsRes = await axios.get(`http://localhost:5001/api/comments/comments/${postId}`)
      setcomments(commentsRes.data.data)
      setcommentText('')
    } catch (e) {
      seterror(e.response?.data?.message || e.message)
    } finally {
      setsubmitting(false)
    }
  }

  if (loading) return <div className="community-loading">Loading...</div>
  if (!post) return <div className="community-loading">Post not found.</div>

  return (
    <div className="community-page">
      <div className="community-banner" />
      <div className="community-header-bar">
        <div className="community-header-left">
          <button className="back-button" onClick={() => navigate(backPath)}>
            ← Back
          </button>
          <div>
            <h1 className="community-page-name">{post.community_id?.name ? `r/${post.community_id.name}` : 'Post'}</h1>
            <p className="post-details-subtitle">{post.community_id?.name ? `Posted in r/${post.community_id.name}` : ''}</p>
          </div>
        </div>
      </div>

      <div className="community-main">
        <div className="detail-column">
          <div className="post-card post-detail-card">
            <div className="post-header">
              <div className="post-header-left">
                <div className="post-user-avatar" style={{ background: '#0079d3' }}>
                  <span className="post-avatar-text">u/</span>
                </div>
                <span className="post-author">u/{post.user_id?.username || 'unknown'}</span>
                <span className="post-dot">•</span>
                <span className="post-time">{new Date(post.created_at).toLocaleString()}</span>
              </div>
            </div>
            <h3 className="post-title">{post.title}</h3>
            {post.content && <p className="post-content">{post.content}</p>}
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
          </div>

          <div className="comments-panel">
            <div className="comments-header">
              <div>
                <h2>{comments.length} Comments</h2>
                <p className="comments-subtitle">Sorted by most recent</p>
              </div>
            </div>

            <form className="comment-form" onSubmit={handleSubmit}>
              <label className="comment-label" htmlFor="comment-input">Join the conversation</label>
              <textarea
                id="comment-input"
                value={commentText}
                onChange={(e) => setcommentText(e.target.value)}
                placeholder="Write your comment here..."
                className="comment-input"
                rows={4}
              />
              {error && <p className="comment-error">{error}</p>}
              <button className="comment-submit-btn" type="submit" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            <div className="comments-list">
              {comments.length === 0 ? (
                <div className="no-posts">No comments yet. Be the first to comment!</div>
              ) : comments.map(comment => (
                <div className="comment-card" key={comment._id}>
                  <div className="comment-meta">
                    <span className="comment-author">u/{comment.user_id?.username || 'unknown'}</span>
                    <span className="post-dot">•</span>
                    <span className="comment-time">{new Date(comment.created_at).toLocaleString()}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="community-sidebar">
          <div className="community-about-card">
            <h3 className="about-title">About this community</h3>
            <p className="about-description">{post.community_id?.description || 'Community details are unavailable.'}</p>
            <div className="about-divider" />
            <div className="about-meta">
              <span>{post.community_id?.name ? `r/${post.community_id.name}` : 'Unknown community'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
