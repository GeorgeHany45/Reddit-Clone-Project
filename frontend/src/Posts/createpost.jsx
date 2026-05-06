import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './createpost.css'

const CreatePost = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [communities, setCommunities] = useState([])
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaPreview, setMediaPreview] = useState('')
  const [mediaType, setMediaType] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const tabs = [
    { key: 'text', label: 'Text' },
    { key: 'media', label: 'Images & Video' }
  ]

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token')
        if (name) {
          const res = await axios.get(
            `http://localhost:5001/api/community/communities/name/${name}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          setSelectedCommunity(res.data.community)
        } else {
          const res = await axios.get(
            'http://localhost:5001/api/community/communities',
            { headers: { Authorization: `Bearer ${token}` } }
          )
          const joined = res.data.data.filter((community) => community.isJoined)
          setCommunities(joined)
        }
      } catch (err) {
        setError('Unable to load communities. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [name])

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if (!isImage && !isVideo) {
      setError('Please choose a valid image or video file.')
      return
    }
    setError('')
    setMediaType(isImage ? 'image' : 'video')
    const reader = new FileReader()
    reader.onload = (event) => setMediaPreview(event.target.result)
    reader.readAsDataURL(file)
    setType('media')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!title.trim()) return setError('Please enter a title for your post.')
    if (!selectedCommunity) return setError('Please select a community.')
    if (type === 'media' && !mediaPreview) {
      return setError('Please upload a photo or video for this post.')
    }

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:5001/api/posts/createpost',
        {
          title: title.trim(),
          content: type === 'text' ? content.trim() : '',
          media_url: mediaPreview || '',
          media_type: mediaPreview ? mediaType : '',
          community_id: selectedCommunity._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccess('Post created successfully.')
      setTitle('')
      setContent('')
      setMediaPreview('')
      setMediaType('')
      setTimeout(() => {
        if (name) navigate(`/reddit/community/${name}`)
        else navigate('/reddit/explore')
      }, 900)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create post. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="create-post-page">
        <div className="create-post-card">
          <h2 className="create-post-title">Loading...</h2>
        </div>
      </div>
    )
  }

  const selectedCommunityName = selectedCommunity?.name || ''

  return (
    <div className="create-post-page">
      <div className="create-post-card">
        <div className="create-post-header">
          <h1 className="create-post-title">Create post</h1>
          <div className="create-post-community">
            <span className="community-label">Posting to</span>
            {name ? (
              <span className="community-chip">r/{selectedCommunityName}</span>
            ) : (
              <select
                className="community-select"
                value={selectedCommunity?._id || ''}
                onChange={(e) => {
                  const community = communities.find(item => item._id === e.target.value)
                  setSelectedCommunity(community || null)
                }}
              >
                <option value="">{communities.length ? 'Select a joined community' : 'Join a community to post'}</option>
                {communities.map((community) => (
                  <option key={community._id} value={community._id}>
                    r/{community.name}
                  </option>
                ))}
              </select>
            )}
          {!name && communities.length === 0 && (
            <p className="create-post-note">The create button only shows communities you have joined.</p>
          )}
          </div>
        </div>

        <div className="post-type-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab-btn ${type === tab.key ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
              onClick={() => !tab.disabled && setType(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title*"
            />
          </div>

          {type === 'text' && (
            <div className="form-field">
              <label htmlFor="post-content">Body text (optional)</label>
              <textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Body text (optional)"
              />
            </div>
          )}

          {type === 'media' && (
            <div className="form-field">
              <label className="upload-dropzone" htmlFor="post-media">
                <input
                  id="post-media"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                />
                <div className="dropzone-content">
                  <span className="dropzone-icon">⭳</span>
                  <div>
                    <p className="dropzone-title">Drag and drop or upload media</p>
                    <p className="dropzone-note">Supported: JPG, PNG, MP4</p>
                  </div>
                </div>
              </label>
              {mediaPreview && mediaType === 'image' && (
                <div className="image-preview-wrapper">
                  <img src={mediaPreview} alt="Preview" className="create-post-image" />
                  <button type="button" className="remove-image-btn" onClick={() => setMediaPreview('')}>
                    Remove media
                  </button>
                </div>
              )}
              {mediaPreview && mediaType === 'video' && (
                <div className="image-preview-wrapper video-preview-wrapper">
                  <video controls src={mediaPreview} className="create-post-video" />
                  <button type="button" className="remove-image-btn" onClick={() => setMediaPreview('')}>
                    Remove media
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="submit-row">
            <button type="submit" className="submit-btn" disabled={!selectedCommunity}>
              Post
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate(name ? `/reddit/community/${name}` : '/reddit/explore')}>
              Cancel
            </button>
          </div>

          {(error || success) && (
            <p className={`form-feedback ${error ? 'form-error' : 'form-success'}`}>
              {error || success}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreatePost
