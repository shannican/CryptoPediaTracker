import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Prop validation ke liye import kiya
import "./style.css";

const CoinDescription = ({ name, desc }) => {
    const [shortDesc, setShortDesc] = useState(true);

    return (
        <div className="grey-wrapper">
            <h2 className="coin-name">{name}</h2>
            <p className="coin-desc"
                dangerouslySetInnerHTML={{ __html: shortDesc ? `${desc.slice(0, 400)}...` : desc }} // ✅ Template literals use kiya
            ></p>
            <p className="read-more" onClick={() => setShortDesc(!shortDesc)}>
                {shortDesc ? "Read More..." : "Read Less..."}
            </p>
        </div>
    );
};

// ✅ Prop validation add kiya
CoinDescription.propTypes = {
    name: PropTypes.string.isRequired, // Name should be a required string
    desc: PropTypes.string.isRequired, // Desc should be a required string
};

export default CoinDescription;
