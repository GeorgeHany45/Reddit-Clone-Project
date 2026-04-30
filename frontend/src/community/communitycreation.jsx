import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './communitycreation.css'

const topics = [
    { label: 'Anime & Cosplay', emoji: '🎌' },
    { label: 'Art', emoji: '🎨' },
    { label: 'Business & Finance', emoji: '📊' },
    { label: 'Collectibles & Other Hobbies', emoji: '🧩' },
    { label: 'Education & Career', emoji: '🎓' },
    { label: 'Fashion & Beauty', emoji: '👗' },
    { label: 'Food & Drinks', emoji: '🍔' },
    { label: 'Games', emoji: '🎮' },
    { label: 'Health', emoji: '❤️' },
    { label: 'Home & Garden', emoji: '🏡' },
    { label: 'Humanities & Law', emoji: '⚖️' },
    { label: 'Identity & Relationships', emoji: '🌈' },
    { label: 'Internet Culture', emoji: '🌐' },
    { label: 'Movies & TV', emoji: '🎬' },
    { label: 'Music', emoji: '🎵' },
    { label: 'Nature & Outdoors', emoji: '🌿' },
    { label: 'News & Politics', emoji: '📰' },
    { label: 'Places & Travel', emoji: '✈️' },
    { label: 'Pop Culture', emoji: '⭐' },
    { label: 'Q&As & Stories', emoji: '✏️' },
    { label: 'Reading & Writing', emoji: '📖' },
    { label: 'Sciences', emoji: '🔬' },
    { label: 'Spooky', emoji: '💀' },
    { label: 'Sports', emoji: '🏆' },
    { label: 'Technology', emoji: '💻' },
    { label: 'Vehicles', emoji: '🚗' },
    { label: 'Wellness', emoji: '🧘' },
   
]

const Communitycreation = ({ onClose }) => {
    const [step, setstep] = useState(1)
    const [selectedtopic, setselectedtopic] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [nameerror, setnameerror] = useState('')
    const [error, seterror] = useState('')
    const navigate = useNavigate()

    const handletopicclick = (label) => {
        if (selectedtopic === label) {
            setselectedtopic('')
        } else {
            setselectedtopic(label)
        }
    }

    const handlenamecchange = (e) => {
        setname(e.target.value)
        setnameerror('')
    }

    const handlecommunitycreation = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(
                'http://localhost:5001/api/community/communities',
                { name, description, topic: selectedtopic },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            alert('Community created successfully')
            navigate(`/community/${response.data.community.name}`)
        }
        catch (e) {
            const message = e.response?.data?.message || 'Something went wrong'
            if (message === 'Community name is already in use') {
                setnameerror(message)
            } else {
                seterror(message)
            }
        }
    }

    const isFormValid = name.trim() !== '' && description.trim() !== '' && !nameerror

    return (
        <div className="community-overlay">
          <div className="community-box">

            {/* ── STEP 1: Topic selection ───────────────────────────────── */}
            {step === 1 && (
                <>
                    <div className="community-header">
                        <div>
                            <h2 className="community-title">What will your community be about?</h2>
                            <p className="community-subtitle">Choose a topic to help redditors discover your community</p>
                        </div>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="topics-grid">
                        {topics.map((topic) => (
                            <button
                                key={topic.label}
                                className={`topic-btn ${selectedtopic === topic.label ? 'topic-selected' : ''}`}
                                onClick={() => handletopicclick(topic.label)}
                            >
                                {selectedtopic === topic.label && (
                                    <span className="topic-check">✓</span>
                                )}
                                <span className="topic-emoji">{topic.emoji}</span>
                                {topic.label}
                            </button>
                        ))}
                    </div>

                    <div className="community-footer">
                        <button className="back-btn" onClick={onClose}>Cancel</button>
                        <button
                            className="createcommunity-button"
                            disabled={!selectedtopic}
                            onClick={() => setstep(2)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* ── STEP 2: Name and description ─────────────────────────── */}
            {step === 2 && (
                <>
                    <div className="community-header">
                        <div>
                            <h2 className="community-title">Tell us about your community</h2>
                            <p className="community-subtitle">A name and description help people understand what your community is all about.</p>
                        </div>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="community-body">

                        <div className="community-left">

                            <div className="communityinput-wrapper">
                                <input
                                    type='text'
                                    name="name"
                                    value={name}
                                    onChange={handlenamecchange}
                                    placeholder=" "
                                    required
                                    className={`name-input ${nameerror ? 'input-error' : ''}`}
                                />
                                <label className="name-label">
                                    Community name <span className="star">*</span>
                                </label>
                                {name.length > 0 && (
                                    <span className="r-prefix">r/</span>
                                )}
                                {nameerror && <p className="field-error">{nameerror}</p>}
                            </div>

                            <div className="communityinput-wrapper">
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    placeholder=" "
                                    required
                                    className="description-input"
                                />
                                <label className={`description-label ${description ? 'label-active' : ''}`}>
                                    Description <span className="star">*</span>
                                </label>
                            </div>

                            {error && <p className="error-message">{error}</p>}

                        </div>

                        <div className="community-preview">
                            {name.length > 0 || description.length > 0 ? (
                                <>
                                    <div className="preview-banner" />
                                    <div className="preview-info">
                                        <div className="preview-avatar">
                                            <span className="preview-avatar-text">r/</span>
                                        </div>
                                        <div className="preview-text">
                                            <span className="preview-name">r/{name || '...'}</span>
                                            <span className="preview-stats">1 weekly visitor · 1 weekly contributor</span>
                                        </div>
                                    </div>
                                    <p className="preview-description">{description || 'Your community description'}</p>
                                </>
                            ) : (
                                <div className="preview-empty" />
                            )}
                        </div>

                    </div>

                    <div className="community-footer">
                        <button className="back-btn" onClick={() => setstep(1)}>Back</button>
                        <button
                            className="createcommunity-button"
                            onClick={handlecommunitycreation}
                            disabled={!isFormValid}
                        >
                            Create Community
                        </button>
                    </div>
                </>
            )}

          </div>
        </div>
    )
}

export default Communitycreation