import { createContext, useState } from "react";
import PropTypes from "prop-types"; 
export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => { 
    const [toggle, setToggle] = useState(true);
    
    return (
        <WatchlistContext.Provider value={{ toggle, setToggle }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// 🔹 PropTypes validation add kiya
WatchlistProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default WatchlistProvider;
