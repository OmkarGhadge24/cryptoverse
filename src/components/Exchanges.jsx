import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import Loader from "./Loader";
import OurModel from "./OurModel";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getExchangesData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full text-gray-200">
          <Header />
          <div className="flex justify-center items-center h-[200px] md:h-[300px] lg:h-[400px]">
            <OurModel />
          </div>
          <div className="p-8">
            <h1 className="text-center text-4xl font-semibold mb-6 text-gray-100">
              Exchanges
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {exchanges.map((exchange) => (
                <div
                  key={exchange.id}
                  className="p-5 bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center mb-3">
                    <img
                      src={exchange.image}
                      alt={`${exchange.name} logo`}
                      className="w-16 h-16 rounded-full mb-2 border-2 border-gray-600"
                    />
                    <h2 className="text-2xl font-bold text-white text-center">
                      {exchange.name}
                    </h2>
                  </div>
                  <div className="text-sm text-gray-400 space-y-2 text-center">
                    {exchange.country && (
                      <p>
                        <span className="font-semibold text-gray-300">
                          Country:
                        </span>{" "}
                        {exchange.country}
                      </p>
                    )}
                    {exchange.trust_score_rank && (
                      <p>
                        <span className="font-semibold text-gray-300">
                          Trust Score Rank:
                        </span>{" "}
                        {exchange.trust_score_rank}
                      </p>
                    )}
                    {exchange.trade_volume_24h_btc && (
                      <p>
                        <span className="font-semibold text-gray-300">
                          Trade Volume (24h):
                        </span>{" "}
                        {exchange.trade_volume_24h_btc.toFixed(2)} BTC
                      </p>
                    )}
                    {exchange.url ? (
                      <a
                        href={exchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-yellow-500 mt-2 block"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <p className="text-gray-500 mt-2">No website available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Exchanges;
