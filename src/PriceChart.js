// src/PriceChart.js

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (data.type === "ticker") {
      setChartData((prevState) => ({
        labels: [...prevState.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevState.datasets[0],
            data: [...prevState.datasets[0].data, parseFloat(data.price)],
          },
        ],
      }));
    }
  }, [data]);

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PriceChart;
