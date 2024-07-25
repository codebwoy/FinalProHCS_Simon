import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagramSquare,
  faPinterest,
  faTiktok,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Traveling with Simon. All rights reserved.</p>
      <h2>
        <FontAwesomeIcon icon={faFacebookF} className="icon" />
        <FontAwesomeIcon icon={faInstagramSquare} className="icon" />
        <FontAwesomeIcon icon={faPinterest} className="icon" />
        <FontAwesomeIcon icon={faTiktok} className="icon" />
        <FontAwesomeIcon icon={faGithub} className="icon" />
      </h2>
    </footer>
  );
};

export default Footer;
