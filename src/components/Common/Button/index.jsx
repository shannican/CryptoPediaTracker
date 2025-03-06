import "./style.css";
import { RWebShare } from "react-web-share";
import PropTypes from "prop-types"; // ✅ Prop validation ke liye import kiya

const Button = ({ text, outlineButton }) => {
    return (
        <>
            {text === "Share" ? (
                <RWebShare
                    data={{
                        text: "Crypto Tracker Website for Tracking Current Markets of Crypto Currencies.",
                        url: "https://crypto-pedia-tracker.vercel.app/",
                        title: "CryptoTracker.",
                    }}
                >
                    <button className={outlineButton ? "btn-outline" : "btn"}>{text}</button>
                </RWebShare>
            ) : (
                <button className={outlineButton ? "btn-outline" : "btn"}>{text}</button>
            )}
        </>
    );
};

// ✅ Prop validation add kiya
Button.propTypes = {
    text: PropTypes.string.isRequired,
    outlineButton: PropTypes.bool,
};

export default Button;
