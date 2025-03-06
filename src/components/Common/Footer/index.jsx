import "./style.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import { LinkedIn } from "@mui/icons-material";

function Footer() {
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="footer">
            <div className="text">
                <h2 className="logo" onClick={topFunction}>
                    CryptoPedia.
                </h2>
                <p>Created by <span>Shanni Kant</span></p>
                <p>Copyright &copy;2025 All rights reserved!</p>
            </div>
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer noopener">
                    <FacebookIcon className="social-link" />
                </a>
                <a href="mailto:shannikant1220@gmail.com" target="_blank" rel="noreferrer noopener">
                    <EmailIcon className="social-link" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer noopener">
                    <TwitterIcon className="social-link" />
                </a>
                <a href="https://www.linkedin.com/in/shanni-kant-singh-5b0785243/" target="_blank" rel="noreferrer noopener">
                    <LinkedIn className="social-link" />
                </a>
            </div>
        </div>
    );
}

export default Footer;
