import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo/logo.svg";
import "../styles/layout.css";

export default function Layout() {
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
        </nav>
      </header>

      <hr className="site-divider" />

      <main className="site-content">
        <Outlet />
      </main>
    </div>
  );
}
