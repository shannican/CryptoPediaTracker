import axios from "axios";

async function get100Coins() {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 100,
                page: 1,
                sparkline: false,
                locale: "en",
            }
        });

        return res.data;
    } catch (error) {
        console.log("AXIOS ERROR -->", error);
    }
}

export default get100Coins;
