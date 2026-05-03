import axios from "axios"
import { useState, useEffect } from "react"
import "./search.css"

const Search = ({ query }) => {
    const [users, setusers] = useState([])
    const [communities, setcommunities] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const token = localStorage.getItem('token')
                const [usersres, communitiesres] = await Promise.all([
                    axios.get('http://localhost:5001/api/user/users'),
                    axios.get('http://localhost:5001/api/community/communities', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])
                setusers(usersres.data.users)
                setcommunities(communitiesres.data.data)
            } catch (e) {
                console.log(e.message)
            } finally {
                setloading(false)
            }
        }
        fetchdata()
    }, [])

    // filter based on query
    const filteredusers = users.filter(u =>
        u.username.toLowerCase().includes(query.toLowerCase())
    )
    const filteredcommunities = communities.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
    )

    if (loading) return <div className="search-loading">Loading...</div>
    if (!query.trim()) return null

    return (
        <div className="search-dropdown">

            {filteredcommunities.length > 0 && (
                <div className="search-section">
                    <p className="search-section-title">Communities</p>
                    {filteredcommunities.map(c => (
                        <div key={c._id} className="search-item">
                            <div className="search-avatar" style={{ backgroundColor: '#ff4500' }}>
                                <span className="search-avatar-text">r/</span>
                            </div>
                            <div className="search-info">
                                <span className="search-name">r/{c.name}</span>
                                <span className="search-sub">Community</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredusers.length > 0 && (
                <div className="search-section">
                    <p className="search-section-title">Users</p>
                    {filteredusers.map(u => (
                        <div key={u._id} className="search-item">
                            <div className="search-avatar" style={{ backgroundColor: '#0079d3' }}>
                                <span className="search-avatar-text">u/</span>
                            </div>
                            <div className="search-info">
                                <span className="search-name">u/{u.username}</span>
                                <span className="search-sub">User</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredusers.length === 0 && filteredcommunities.length === 0 && (
                <p className="search-empty">No results for "{query}"</p>
            )}

        </div>
    )
}

export default Search