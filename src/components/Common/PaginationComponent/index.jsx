import PropTypes from "prop-types"; // ✅ Prop validation ke liye import kiya
import "./style.css";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({ page, handlePage, count }) => {
    const style = {
        color: "var(--white)",
        "& .Mui-selected ": {
            backgroundColor: "var(--yellow) !important",
            color: "var(--black) !important",
            borderColor: "var(--yellow) !important",
        },
        "& .MuiPaginationItem-ellipsis": {
            border: "0px solid var(--grey) !important",
        },
        "& .MuiPaginationItem-text": {
            color: "var(--white)",
            border: "1px solid rgb(51, 51, 51)",
        },
    };

    return (
        <div className="pagination-container">
            <Pagination
                sx={style}
                count={count}
                page={page}
                onChange={handlePage} // ✅ Direct function pass kiya (event argument ki zarurat nahi)
            />
        </div>
    );
};

// ✅ Prop validation add kiya
PaginationComponent.propTypes = {
    page: PropTypes.number.isRequired, // ✅ page ek number hai aur required hai
    handlePage: PropTypes.func.isRequired, // ✅ handlePage ek function hai aur required hai
    count: PropTypes.number.isRequired, // ✅ count ek number hai aur required hai
};

export default PaginationComponent;
