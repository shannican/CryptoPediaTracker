import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler // ✅ Filler plugin import kiya
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./style.css";
import PropTypes from "prop-types";
import convertNumber from "../../../functions/convertNumber";

// ✅ Chart.js modules register kiye
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

const CoinChart = ({ chartData, multiAxis, typeOfData }) => {
    const options = {
        plugins: {
            legend: {
                display: multiAxis ? true : false,
            }
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            crypto1: {
                ticks: {
                    callback: function (value) {
                        return typeOfData === "prices" ? `$${value.toLocaleString()}` : `$${convertNumber(value)}`;
                    }
                },
                type: 'linear',
                display: true,
                position: 'left',
            },
            crypto2: {
                ticks: {
                    callback: function (value) {
                        return typeOfData === "prices" ? `$${value.toLocaleString()}` : `$${convertNumber(value)}`;
                    }
                },
                type: 'linear',
                display: multiAxis,
                position: 'right',
            }
        }
    };

    return <Line className="chart" data={chartData} options={options} />;
};

// ✅ Prop validation add kiya
CoinChart.propTypes = {
    chartData: PropTypes.object.isRequired,
    multiAxis: PropTypes.bool,
    typeOfData: PropTypes.string.isRequired,
};

export default CoinChart;
