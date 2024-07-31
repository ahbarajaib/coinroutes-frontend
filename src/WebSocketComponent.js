import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import TopOfBook from "./TopOfBook";
import PriceChart from "./PriceChart";
import { OrderBook } from "./OrderBook";

const productIds = ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"];

const WebSocketComponent = () => {
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(
        JSON.stringify({
          type: "subscribe",
          channels: [
            {
              name: "ticker",
              product_ids: productIds,
            },
          ],
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received", message);
      if (message.type === "ticker") {
        setData((prevData) => ({
          ...prevData,
          [message.product_id]: message,
        }));
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    setIsOpen(false);
  };

  const filteredData = selectedProduct ? data[selectedProduct] : {};
  console.log(filteredData);

  return (
    <div className="flex w-full">
      <div className="w-4/5 flex flex-col space-y-8 p-4">
        <h1 className="text-white text-2xl font-bold mb-4">
          WebSocket Data Feed
        </h1>
        <div className="relative flex flex-col items-center w-[340px] rounded-lg">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-blue-400 flex p-4 w-full items-center justify-between font-bold text-lg rounded-lg border-4 border-transparent active:border-white duration-300 active:text-white"
          >
            {selectedProduct ? selectedProduct : "Select CRY"}
            {!isOpen ? (
              <FaCaretDown className="h-8" />
            ) : (
              <FaCaretUp className="h-8" />
            )}
          </button>
          {isOpen && (
            <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
              {productIds.map((id, i) => (
                <div
                  className="flex w-full p-4 justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                  key={i}
                  onClick={() => handleSelectProduct(id)}
                >
                  <h2 className="font-bold">{id}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
        <TopOfBook data={filteredData} />
        <PriceChart data={filteredData} />
      </div>
      <div className="w-1/5 p-4 flex flex-col space-y-8 rounded-lg shadow-md">
        <OrderBook data={filteredData} />
      </div>
    </div>
  );
};

export default WebSocketComponent;
