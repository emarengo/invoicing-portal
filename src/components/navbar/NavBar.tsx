import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navBar-style ">
      <div className="container-fluid">
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Upload UUIDs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/query" className="nav-link">
                Query invoice requests
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
