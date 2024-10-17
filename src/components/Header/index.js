import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <ul className="text-content">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <Link to="/" className="list-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="list-item">
            <li>Jobs</li>
          </Link>
          <li>
            <button onClick={onLogout} type="button" className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
