import { Link } from 'react-router-dom';
import './Header.css'; // Ensure you import your CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Display the logo image */}
        <div className="logo">
          <img src="/images/logo.png" alt="Jewellery Management System Logo" className="logo-image" />
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
