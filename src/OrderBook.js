import React from "react";

export const OrderBook = ({ data }) => {
  const bestBid = data.best_bid ? data.best_bid : null;
  const bestBidSize = data.best_bid_size ? data.best_bid_size : null;
  const bestAsk = data.best_ask ? data.best_ask : null;
  const bestAskSize = data.best_ask_size ? data.best_ask_size : null;

  return (
    <div className="p-6 bg-gray-700 rounded-lg">
      <h2 className="text-white text-lg font-bold mb-4">Order Book</h2>

      {/* Bid Section */}
      <div className="mb-4">
        <h3 className="text-white text-lg font-semibold">Best Bid</h3>
        {bestBid && bestBidSize ? (
          <div className="space-y-2">
            <div className="flex justify-between text-white p-2 bg-gray-600 rounded">
              <span>Price: ${bestBid}</span>
              <span>Size: {bestBidSize}</span>
            </div>
          </div>
        ) : (
          <p className="text-white">No bid data available</p>
        )}
      </div>

      {/* Ask Section */}
      <div>
        <h3 className="text-white text-lg font-semibold">Best Ask</h3>
        {bestAsk && bestAskSize ? (
          <div className="space-y-2">
            <div className="flex justify-between text-white p-2 bg-gray-600 rounded">
              <span>Price: ${bestAsk}</span>
              <span>Size: {bestAskSize}</span>
            </div>
          </div>
        ) : (
          <p className="text-white">No ask data available</p>
        )}
      </div>
    </div>
  );
};
