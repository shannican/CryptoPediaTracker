import PropTypes from "prop-types"; // ✅ Prop validation ke liye import kiya
import List from "../../Dashboard/List";
import "./style.css";

const CoinsListInfo = ({ coin }) => {
    return (
        <div className="grey-wrapper coin-list-info">
            <List coin={coin} />
        </div>
    );
};

// ✅ Prop validation add kiya
CoinsListInfo.propTypes = {
    coin: PropTypes.object.isRequired, // Coin ek object hona chahiye aur required hai
};

export default CoinsListInfo;
