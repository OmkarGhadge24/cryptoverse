import React, { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = ({ currency }) => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(1);

  // const coinChartData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${baseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  //     );
  //     setChartData(data.prices);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   coinChartData();
  // }, [currency, id, days]);
  
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartData(data.prices);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchChartData();
  }, [currency, id, days]);  

  const myData = {
    labels: chartData.map((value, index) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency.toUpperCase()}`,
        data: chartData.map((value) => value[1]),
        borderColor: "#FB9236",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4">
      {chartData.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="btn mt-6 flex items-center gap-6">
            <button
              className="text-sm px-3 py-1 rounded-md text-white bg-orange-500"
              onClick={() => setDays(1)}
            >
              1 Day
            </button>
            <button
              className="text-sm px-3 py-1 rounded-md text-white bg-orange-500"
              onClick={() => setDays(30)}
            >
              1 Month
            </button>
            <button
              className="text-sm px-3 py-1 rounded-md text-white bg-orange-500"
              onClick={() => setDays(365)}
            >
              1 Year
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinChart;
