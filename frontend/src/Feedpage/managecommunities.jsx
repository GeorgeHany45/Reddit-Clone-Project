import { useState, useEffect } from "react";
import axios from "axios";
import "./managecommunities.css";

const ManageCommunities = () => {
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
                const joined = response.data.data.filter(c => c.isJoined)
                setcommunities(joined)
            } catch (e) {
                console.log(e.message)
            } finally {
                setloading(false)
            }
        }
        fetchcommunities()
    }, [])

    if (loading) return <div className="manage-loading">Loading...</div>

    return (
        <div className="manage-page">
            <h1 className="manage-title">Manage Communities</h1>

            {communities.length === 0 ? (
                <p className="manage-empty">You have not joined any communities yet.</p>
            ) : (
                <div className="manage-section">
                    <div className="manage-grid">
                        {communities.map((community) => (
                            <ManageCommunityCard
                                key={community._id}
                                community={community}
                                onLeave={(id) => setcommunities(prev => prev.filter(c => c._id !== id))}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const ManageCommunityCard = ({ community, onLeave }) => {

    const handleleave = async () => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(
                `http://localhost:5001/api/community/communities/${community._id}/leave`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            onLeave(community._id)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="manage-card">
            <div className="manage-card-top">
                <div className="manage-card-avatar" style={{ backgroundColor: '#ff4500' }}>
                    <span className="manage-card-avatar-text">r/</span>
                </div>
                <div className="manage-card-info">
                    <span className="manage-card-name">r/{community.name}</span>
                    <span className="manage-card-members">
                        {community.memberCount || '1'} weekly visitors
                    </span>
                </div>
                <button
                    className="manage-card-btn"
                    onClick={handleleave}
                >
                    Leave
                </button>
            </div>
            {community.description && (
                <p className="manage-card-description">{community.description}</p>
            )}
        </div>
    )
}

export default ManageCommunities