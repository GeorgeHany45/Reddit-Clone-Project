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
    const [communities, setcommunities] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchcommunities = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(
                    'http://localhost:5001/api/community/communities',
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setcommunities(response.data.data)
            } catch (e) {
                console.log(e.message)
            } finally {
                setloading(false)
            }
        }
        fetchcommunities()
    }, [])

    const notjoined = communities.filter(c => !c.isJoined)

    const groupedbytopic = notjoined.reduce((acc, community) => {
        const topic = community.topic || 'General'
        if (!acc[topic]) acc[topic] = []
        acc[topic].push(community)
        return acc
    }, {})

    if (loading) return <div className="explore-loading">Loading...</div>

    return (
        <div className="explore-page">
            <h1 className="explore-title">Explore Communities</h1>

            {Object.keys(groupedbytopic).length === 0 ? (
                <p className="explore-empty">You've joined all available communities!</p>
            ) : (
                Object.entries(groupedbytopic).map(([topic, topicommunities]) => (
                    <TopicSection
                        key={topic}
                        topic={topic}
                        communities={topicommunities}
                    />
                ))
            )}
        </div>
    )
}

const TopicSection = ({ topic, communities }) => {
    const [showAll, setshowAll] = useState(false)
    const visible = showAll ? communities : communities.slice(0, 6)

    return (
        <div className="topic-section">
            <h2 className="topic-heading">{topic}</h2>
            <div className="communities-grid">
                {visible.map((community) => (
                    <CommunityCard key={community._id} community={community} />
                ))}
            </div>
            {communities.length > 6 && !showAll && (
                <div className="show-more-wrapper">
                    <button className="show-more-btn" onClick={() => setshowAll(true)}>
                        Show more
                    </button>
                </div>
            )}
        </div>
    )
}

const CommunityCard = ({ community }) => {
    const navigate = useNavigate()
    const [joined, setjoined] = useState(community.isJoined)

    const handlejoin = async (e) => {
        e.stopPropagation()
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

    return (
        <div className="community-card" onClick={() => navigate(`/reddit/community/${community.name}`)}>
            <div className="card-top">
                <div className="card-avatar" style={{ backgroundColor: '#ff4500' }}>
                    <span className="card-avatar-text">r/</span>
                </div>
                <div className="card-info">
                    <span className="card-name">r/{community.name}</span>
                    <span className="card-members">
                        {community.memberCount || '1'} weekly visitors
                    </span>
                </div>
                <button
                    className={`card-join-btn ${joined ? 'joined' : ''}`}
                    onClick={handlejoin}
                >
                    {joined ? 'Joined' : 'Join'}
                </button>
            </div>
            {community.description && (
                <p className="card-description">{community.description}</p>
            )}
        </div>
    )
}

export default ExplorePage
