import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import "./style.css";
import addToWatchlist from '../../../functions/addToWatchlist';
import removeFromWatchlist from '../../../functions/removeFromWatchlist';
import { useContext } from 'react';  // 🔹 `useState` hata diya
import { WatchlistContext } from '../../../context/WatchlistContext';
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";  // 🔹 PropTypes import kiya

const WatchlistIcon = ({ id, price_change_percentage_24h, gridView }) => {
    const { toggle, setToggle } = useContext(WatchlistContext);
    
    const style = {
        position: gridView ? "absolute" : "relative",
        right: gridView ? "1rem" : "0",
    };

    function handleWatchList(coinId, action) {
        switch (action) {
            case "add":
                addToWatchlist(coinId);
                setToggle(!toggle);
                break;
            case "remove":
                removeFromWatchlist(coinId);
                setToggle(!toggle);
                break;
            default: alert("Sorry!!! Couldn't Perform Action"); break;
        }
    }

    return (
        <>
            {
                JSON.parse(localStorage.getItem("watchlist")).includes(id) ?
                    <Tooltip placement="bottom-start" title="Added In Watchlist">
                        <StarRoundedIcon
                            style={style}
                            onClick={(e) => { e.preventDefault(); handleWatchList(id, "remove"); }}
                            className={`watchlist-icon ${price_change_percentage_24h < 0 && "watchlist-icon-red"}`}
                        />
                    </Tooltip>
                    :
                    <Tooltip placement="bottom-start" title="Add To Watchlist">
                        <StarBorderRoundedIcon
                            style={style}
                            onClick={(e) => { e.preventDefault(); handleWatchList(id, "add"); }}
                            className={`watchlist-icon ${price_change_percentage_24h < 0 && "watchlist-icon-red"}`}
                        />
                    </Tooltip>
            }
        </>
    );
};

// 🔹 PropTypes validation add kiya
WatchlistIcon.propTypes = {
    id: PropTypes.string.isRequired,
    price_change_percentage_24h: PropTypes.number.isRequired,
    gridView: PropTypes.bool.isRequired,
};

export default WatchlistIcon;
