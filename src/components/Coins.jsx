import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import Loader from "./Loader";
import Header from "./Header";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${baseUrl}/coins/markets?vs_currency=${currency}&per_page=100`
      );
      setCoins(data);
      setFilteredCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, [currency]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  const handleCurrencyToggle = () => {
    setCurrency(currency === "inr" ? "usd" : "inr");
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-6 text-white">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="flex items-center justify-center mb-6 gap-2 flex-col md:flex-row">
              <h1 className="text-3xl font-semibold">Change Currency</h1>
              <button
                className={`text-sm px-3 py-1 rounded-md text-white mt-2 md:mt-0 ${
                  currency === "inr" ? "bg-blue-500" : "bg-yellow-600"
                }`}
                onClick={handleCurrencyToggle}
              >
                {currency === "inr" ? "USD" : "INR"}
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white">
              {filteredCoins.map((coindata, i) => (
                <CoinCard coin={coindata} key={i} currency={currency} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const CoinCard = ({ coin, currency }) => {
  const profit = coin.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${coin.id}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
    >
      <div
        key={coin.id}
        className="bg-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col items-center space-y-2 transform transition-all hover:scale-105 hover:shadow-2xl"
      >
        <img
          src={coin.image}
          alt={`${coin.name} logo`}
          className="w-20 h-20 rounded-full border-4 border-gradient-to-tr from-indigo-500 to-blue-500 shadow-lg"
        />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-orange-400">{coin.name}</h2>
          <div className="space-y-1">
            <p className="text-lg text-gray-300">
              <span className="font-semibold text-white">Price:</span>{" "}
              {currency === "inr" ? "₹" : "$"}
              {currency === "inr"
                ? coin.current_price.toLocaleString()
                : (coin.current_price / 80).toFixed(2).toLocaleString()}
            </p>
            <p className="text-lg">
              {profit ? (
                <span className="text-green-500">
                  {"+" + coin.price_change_percentage_24h.toFixed(2)}
                </span>
              ) : (
                <span className="text-red-500">
                  {coin.price_change_percentage_24h.toFixed(2)}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Coins;
