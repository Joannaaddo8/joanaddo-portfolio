import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.svg";
import "../styles/layout.css";
import { getToken, removeToken } from "../utils/auth";

export default function Layout() {
  const navigate = useNavigate();
  const token = getToken();

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  return (
    <div className="layout-root">
      <header className="site-header">
        <div className="header-left">
          <img src={logo} alt="Joanna Addo logo" className="site-logo" />
          <h1 className="site-title">Joanna Addo | AI Developer</h1>
        </div>

        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          {!token ? (
            <>
              <Link className="site-nav__button" to="/login">
                Login
              </Link>
              <Link className="site-nav__button" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <button
                type="button"
                onClick={handleLogout}
                className="site-nav__button"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <hr className="site-divider" />

      <main className="site-content">
        <Outlet />
      </main>
    </div>
  );
}