import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
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
import BackToTop from '../components/Common/BackToTop';
import SelectCoin from "../components/Compare/SelectCoin";
import Footer from "../components/Common/Footer";

const Compare = () => {
    const [days, setDays] = useState(7);
    const [typeOfData, setTypeOfData] = useState("prices");
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [firstCoinId, setFirstCoinId] = useState("bitcoin");
    const [secondCoinId, setSecondCoinId] = useState("ethereum");
    const [firstCoinData, setFirstCoinData] = useState(null);
    const [secondCoinData, setSecondCoinData] = useState(null);
    const [firstCoinMarketData, setFirstCoinMarketData] = useState(null);
    const [secondCoinMarketData, setSecondCoinMarketData] = useState(null);

    useEffect(() => {
        async function fetchAllData() {
            try {
                setLoading(true);

                const [data1, data2] = await Promise.all([
                    getCoinData(firstCoinId),
                    getCoinData(secondCoinId),
                ]);

                if (data1) setFirstCoinData(convertCoinDataObject(data1));
                if (data2) setSecondCoinData(convertCoinDataObject(data2));

                const [marketData1, marketData2] = await Promise.all([
                    getCoinMarketDetails(firstCoinId, days),
                    getCoinMarketDetails(secondCoinId, days),
                ]);

                if (marketData1) setFirstCoinMarketData(marketData1);
                if (marketData2) setSecondCoinMarketData(marketData2);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllData();
    }, [firstCoinId, secondCoinId, days]);

    useEffect(() => {
        if (
            firstCoinData &&
            secondCoinData &&
            firstCoinMarketData &&
            secondCoinMarketData
        ) {
            console.log("Chart Data Set:", firstCoinData.name, secondCoinData.name);
            settingChartData(
                setChartData,
                typeOfData,
                firstCoinMarketData,
                firstCoinData.name,
                secondCoinMarketData,
                secondCoinData.name
            );
        }
    }, [firstCoinMarketData, secondCoinMarketData, typeOfData, firstCoinData, secondCoinData]);

    function handleDaysChange(e) {
        setDays(e.target.value);
    }

    function handleChangeType(e) {
        setTypeOfData(e.target.value);
    }

    function handleCryptoChange(e, isCrypto2) {
        if (isCrypto2) {
            setSecondCoinId(e.target.value);
        } else {
            setFirstCoinId(e.target.value);
        }
    }

    return (
        <div className="coin-info">
            <Header />
            {loading ? <Loader /> :
                <>
                    <div className="filter-div">
                        <SelectCoin firstCoinId={firstCoinId} secondCoinId={secondCoinId} handleCryptoChange={handleCryptoChange} />
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                    </div>

                    {firstCoinData && <CoinsListInfo coin={firstCoinData} />}
                    {secondCoinData && <CoinsListInfo coin={secondCoinData} />}

                    <div className="grey-wrapper">
                        <SelectType type={typeOfData} handleChangeType={handleChangeType} />
                        {chartData ? <CoinChart typeOfData={typeOfData} chartData={chartData} multiAxis={true} /> : <p>Loading chart...</p>}
                    </div>

                    {firstCoinData?.desc && <CoinDescription name={firstCoinData.name} desc={firstCoinData.desc.replace(/href/g, "target='_blank' href")} />}
                    {secondCoinData?.desc && <CoinDescription name={secondCoinData.name} desc={secondCoinData.desc.replace(/href/g, "target='_blank' href")} />}

                    <BackToTop />
                    <Footer />
                </>
            }
        </div>
    );
}

export default Compare;