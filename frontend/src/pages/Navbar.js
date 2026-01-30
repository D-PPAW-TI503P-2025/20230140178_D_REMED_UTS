import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'nav-link active fw-semibold'
      : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded shadow-sm">
      <div className="container-fluid">

        {/* BRAND */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <span className="me-2 opacity-75">📚</span>
          Library
        </Link>

        {/* MENU */}
        <div className="navbar-nav ms-auto">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>

          <Link to="/admin" className={isActive('/admin')}>
            Admin
          </Link>

          <Link to="/user" className={isActive('/user')}>
            User
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
