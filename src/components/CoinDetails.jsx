import React, { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { IoIosPulse } from "react-icons/io";
import CoinChart from "./CoinChart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const profit = coin.market_data?.price_change_percentage_24h > 0;

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/coins/${id}`);
        setLoading(false);
        setCoin(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  const handleCurrencyToggle = () => {
    setCurrency(currency === "inr" ? "usd" : "inr");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="coin-details px-8 py-6">
          {/* Change Currency Button */}
          <div className="text-center mb-4">
            <div className="flex justify-center gap-2 mb-4">
              <h1 className="text-2xl font-semibold">Change Currency</h1>
              <button
                className={`text-xs px-3 py-1 rounded-md text-white mt-2 ${
                  currency === "inr" ? "bg-blue-500" : "bg-yellow-600"
                }`}
                onClick={handleCurrencyToggle}
              >
                {currency === "inr" ? "USD" : "INR"}
              </button>
            </div>
          </div>

          {/* Coin Details Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Coin Information */}
            <div className="left-side w-full lg:w-[35%] flex flex-col items-center gap-4">
              <div className="text-md">Last Update on {new Date(coin.last_updated).toLocaleString()}</div>
              <div className="coin-img w-40 h-40 rounded-full mt-2">
                <img src={coin.image?.large} alt={coin.name} className="w-full h-full object-cover" />
              </div>
              <div className="coin-info flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-center">{coin.name}</h1>
                <div className="text-md font-semibold mt-2">
                  Current Price:{" "}
                  <span className="font-semibold text-zinc-300">
                    {currency === "inr" ? "₹" : "$"}{coin.market_data?.current_price?.[currency]}
                  </span>
                </div>
                <div className="text-md">
                  {profit ? (
                    <span className="text-green-500">
                      <IoMdTrendingUp className="inline-block" />{" "}
                      {coin.market_data?.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-red-500">
                      <IoMdTrendingDown className="inline-block" />{" "}
                      {coin.market_data?.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold flex items-center">
                  <IoIosPulse className="inline-block text-yellow-500 mr-1" />{" "}
                  <span>#{coin.market_cap_rank}</span>
                </div>
                <div className="text-sm text-zinc-300 text-center lg:text-right mt-2">
                  {coin.description?.en.split(" ").slice(0, 85).join(" ") + " ..."}
                </div>
              </div>
            </div>

            {/* Right Side - Coin Chart */}
            <div className="right-side w-full lg:w-[65%]">
              <CoinChart currency={currency} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinDetails;
