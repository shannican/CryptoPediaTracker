import PropTypes from "prop-types"; // ✅ Prop validation ke liye import kiya
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./style.css";

const SelectType = ({ type, handleChangeType }) => {
    const style = {
        "& .Mui-selected": {
            color: "var(--yellow) !important",
            backgroundColor: "rgba(255, 242, 0, 0.2) !important",
        },
        "& .Mui-selected:hover": {
            color: "var(--yellow) !important",
            backgroundColor: "rgba(255, 242, 0, 0.2)",
        },
        borderColor: "var(--yellow)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--yellow) !important",
            borderColor: "unset",
            color: "var(--yellow)",
        },
        "& .MuiToggleButton-standard": {
            color: "var(--yellow)",
        },
    };

    return (
        <div className="select-type-div">
            <ToggleButtonGroup
                className="select-type-button"
                value={type}
                exclusive
                onChange={handleChangeType} // ✅ Direct function pass kiya (event argument ki zarurat nahi)
                sx={style}
                aria-label="text alignment"
            >
                <ToggleButton value="prices" aria-label="left aligned">
                    Price
                </ToggleButton>
                <ToggleButton value="market_caps" aria-label="centered">
                    Mkt Cap
                </ToggleButton>
                <ToggleButton value="total_volumes" aria-label="right aligned">
                    Volume
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

// ✅ Prop validation add kiya
SelectType.propTypes = {
    type: PropTypes.string.isRequired, // ✅ type ek string hai aur required hai
    handleChangeType: PropTypes.func.isRequired, // ✅ handleChangeType ek function hai aur required hai
};

export default SelectType;
