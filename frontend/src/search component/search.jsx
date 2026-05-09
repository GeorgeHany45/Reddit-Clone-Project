import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./search.css"

const Search = ({ query }) => {
    const [users, setusers] = useState([])
    const [communities, setcommunities] = useState([])
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const token = localStorage.getItem('token')
                const [usersres, communitiesres] = await Promise.all([
                    axios.get('http://localhost:5001/api/users/users'),
                    axios.get('http://localhost:5001/api/community/communities', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])
                setusers(usersres.data.users)
                setcommunities(communitiesres.data.data)
                console.log('[Search] query:', query)
                console.log('[Search] API users payload keys:', Object.keys(usersres.data ?? {}))
                console.log('[Search] API communities payload keys:', Object.keys(communitiesres.data ?? {}))
                console.log('[Search] API users count:', usersres.data.users?.length);
                console.log('[Search] API communities count:', communitiesres.data.data?.length);



            } catch (e) {
                console.log(e.message)
            } finally {
                setloading(false)
            }
        }
        fetchdata()
    }, [])

    // filter based on query
    const normalizedQuery = (query ?? '').toLowerCase()

    useEffect(() => {
        // log filtering results live
        if (!loading && normalizedQuery.trim()) {
            const fu = users.filter(u => (u.username ?? '').toLowerCase().includes(normalizedQuery)).length
            const fc = communities.filter(c => (c.name ?? '').toLowerCase().includes(normalizedQuery)).length
            console.log('[Search] query:', normalizedQuery, { filteredUsers: fu, filteredCommunities: fc })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, normalizedQuery, users, communities])


    const filteredusers = users.filter(u =>
        (u.username ?? '').toLowerCase().includes(normalizedQuery)
    )
    const filteredcommunities = communities.filter(c =>
        (c.name ?? '').toLowerCase().includes(normalizedQuery)
    )


    if (loading) return <div className="search-loading">Loading...</div>
    if (!normalizedQuery.trim()) return null


    return (
        <div className="search-dropdown">

            {filteredcommunities.length > 0 && (
                <div className="search-section">
                    <p className="search-section-title">Communities</p>
                    {filteredcommunities.map(c => (
                        <div key={c._id} className="search-item" onClick={() => navigate(`/reddit/community/${c.name}`)}>
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
                        <div key={u._id} className="search-item" onClick={() => navigate(`/reddit/user/${u.username}`)}>
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