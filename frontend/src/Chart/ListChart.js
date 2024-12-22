import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Регистрация компонентов для Bar Chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ListChart({ labels, dataValues }) {
  
  const data = {
    labels: labels, // Названия списков
    datasets: [
      {
        label: "Item Count",
        data: dataValues, // Количество элементов
        backgroundColor: "#495B71",
        borderColor: "#333",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Shopping Lists",
        },
      },
      y: {
        title: {
          display: true,
          text: "Item Count",
        },
        beginAtZero: true,
      },
    },
  };

  
  return (
    <div className="chart-container">
      <h4>Shopping Lists Overview</h4>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ListChart;