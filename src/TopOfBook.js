// src/TopOfBook.js

import React, { useEffect, useState } from "react";

const TopOfBook = ({ data }) => {
  const [bestBid, setBestBid] = useState(null);
  const [bestAsk, setBestAsk] = useState(null);

  useEffect(() => {
    if (data.type === "ticker") {
      setBestBid(data.best_bid);
      setBestAsk(data.best_ask);
    }
  }, [data]);

  return (
    <div className="w-1/2 flex flex-row justify-center items-center space-x-8 bg-gray-700 p-6 rounded-lg shadow-md ">
      <p className="text-white bg-red-400 p-4 rounded-lg">
        Best Bid: {bestBid}
      </p>
      <p className="text-white bg-green-400 p-4 rounded-lg">
        Best Ask: {bestAsk}
      </p>
    </div>
  );
};

export default TopOfBook;
