import Navbar from './navbar'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import '../Feedpage/FeedPage.css'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout