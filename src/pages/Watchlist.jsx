import { useContext, useEffect, useState, useCallback } from "react";
import Header from "../components/Common/Header";
import TabComponent from "../components/Dashboard/TabComponent";
import SearchBar from "../components/Common/SearchBar";
import BackToTop from "../components/Common/BackToTop";
import Loader from "../components/Common/Loader";
import PaginationComponent from "../components/Common/PaginationComponent";
import get100Coins from "../functions/get100Coins";
import { WatchlistContext } from "../context/WatchlistContext";
import Footer from "../components/Common/Footer";

const WatchList = () => {
    const [coinsList, setCoinsList] = useState([]);
    const [watchlistCoins, setWatchlistCoin] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { toggle } = useContext(WatchlistContext);

    // ✅ Use useCallback to prevent infinite re-renders
    const fetchData = useCallback(async () => {
        const allCoinList = await get100Coins();
        if (allCoinList) {
            setCoinsList(allCoinList);
            const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
            const filteredData = allCoinList.filter((coin) => watchlist.includes(coin.id));

            setWatchlistCoin(filteredData);
            setSearchData(
                filteredData.filter((coin) =>
                    coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
            setLoading(false);
        }
    }, [searchValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // ✅ Include fetchData to avoid lint error

    useEffect(() => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlistCoin(coinsList.filter((coin) => watchlist.includes(coin.id)));
    }, [coinsList, toggle]); // ✅ Include coinsList to avoid stale data

    useEffect(() => {
        setSearchData(
            watchlistCoins.filter((coin) =>
                coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
        setPage(1);
    }, [searchValue, watchlistCoins]);

    useEffect(() => {
        setPaginatedData(searchData.slice(0, 10));
    }, [searchData]);

    function handleSearch(e) {
        setSearchValue(e.target.value);
    }

    const handlePage = (event, value) => {
        setPage(value);
        const startIndex = (value - 1) * 10;
        const endIndex = startIndex + 10;
        setPaginatedData(searchData.slice(startIndex, endIndex));
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <div>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div style={{ minHeight: "100vh" }}>
                        <SearchBar searchValue={searchValue} handleSearch={handleSearch} />
                        <TabComponent coinsList={paginatedData} />
                        <PaginationComponent page={page} handlePage={handlePage} count={Math.ceil(searchData.length / 10)} />
                        <BackToTop />
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default WatchList;
