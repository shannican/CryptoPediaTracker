import axios from "axios";

async function getCoinMarketDetails(id, days) {
    try {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        return res.data;
    } catch (error) {
        console.log("AXIOS ERROR -->", error);
        return null;
    }
}

export default getCoinMarketDetails;
