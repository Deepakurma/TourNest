
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link to="/">
          <img
            src="/img/logo-green.png"
            alt="TourNest logo"
            onError={(e) => {
              e.target.src = 'https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-12/public/img/logo-green.png';
            }}
          />
        </Link>
      </div>
      <ul className="footer__nav">
        <li><Link to="/about">About us</Link></li>
        <li><a href="#apps" onClick={(e) => e.preventDefault()}>Download apps</a></li>
        <li><a href="#guide" onClick={(e) => e.preventDefault()}>Become a guide</a></li>
        <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers</a></li>
        <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact</a></li>
      </ul>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} TourNest. Crafted with premium React design. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
