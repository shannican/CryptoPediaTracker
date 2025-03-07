import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { useParams } from "react-router-dom";
import convertCoinDataObject from "../functions/convertCoinDataObject";
import Loader from "../components/Common/Loader";
import CoinsListInfo from "../components/Coin/CoinListInfo";
import CoinDescription from "../components/Coin/CoinDescription";
import getCoinData from "../functions/getCoinData";
import CoinChart from "../components/Coin/CoinChart";
import SelectDays from "../components/Coin/SelectDays";
import getCoinMarketDetails from "../functions/getCoinMarketDetails";
import settingChartData from "../functions/settingChartData";
import SelectType from "../components/Coin/SelectType";
import BackToTop from "../components/Common/BackToTop";
import Footer from "../components/Common/Footer";

const CoinInfo = () => {
    const [coinData, setCoinData] = useState({});
    const [days, setDays] = useState(7);
    const [coinMarketData, setCoinMarketData] = useState({});
    const [typeOfData, setTypeOfData] = useState("prices");
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            (async function fetchData() {
                setLoading(true);
                const data = await getCoinData(id);
                if (data) {
                    setCoinData(convertCoinDataObject(data));
                    const marketDatas = await getCoinMarketDetails(id, days);
                    if (marketDatas) {
                        setCoinMarketData(marketDatas);
                        settingChartData(setChartData, "prices", marketDatas, data.name);
                        setLoading(false);
                    }
                }
            })();
        }
    }, [id, days]); // Added 'days' as a dependency

    async function handleDaysChange(e) {
        setLoading(true);
        const selectedDays = e.target.value;
        setDays(selectedDays);
        const marketDatas = await getCoinMarketDetails(id, selectedDays);
        if (marketDatas) {
            setCoinMarketData(marketDatas);
            settingChartData(setChartData, typeOfData, marketDatas, coinData.name);
            setLoading(false);
        }
    }

    async function handleChangeType(e) {
        setLoading(true);
        const selectedType = e.target.value;
        setTypeOfData(selectedType);
        if (coinMarketData) {
            settingChartData(setChartData, selectedType, coinMarketData, coinData.name);
            setLoading(false);
        }
    }

    return (
        <div>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <CoinsListInfo coin={coinData} />
                    <div className="grey-wrapper">
                        <div className="filter-div">
                            <SelectDays days={days} handleDaysChange={handleDaysChange} />
                            <SelectType type={typeOfData} handleChangeType={handleChangeType} />
                        </div>
                        <CoinChart typeOfData={typeOfData} chartData={chartData} multiAxis={false} />
                    </div>
                    <CoinDescription name={coinData.name} desc={coinData.desc.replace(/href/g, "target='_blank' href")} />
                    <BackToTop />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default CoinInfo;
