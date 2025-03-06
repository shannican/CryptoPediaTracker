import axios from "axios";

async function getCoinData(id) {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        return res.data;
    } catch (error) {
        console.log("AXIOS ERROR -->", error);
        return null;
    }
}

export default getCoinData;
