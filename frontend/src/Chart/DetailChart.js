import React from "react";
import { Pie } from "react-chartjs-2";

function DetailChart({ solvedItems, unsolvedItems }) {
  const data = {
    labels: ["Resolved", "Unresolved"],
    datasets: [
      {
        data: [solvedItems, unsolvedItems],
        backgroundColor: ["#4caf50", "#f44336"], // Цвета сегментов
        hoverBackgroundColor: ["#66bb6a", "#e57373"], // Цвета при наведении
      },
    ],
  };

  return (
    <div className="chart-container">
      <h4>Item Status</h4>
      <Pie data={data} />
    </div>
  );
}

export default DetailChart;