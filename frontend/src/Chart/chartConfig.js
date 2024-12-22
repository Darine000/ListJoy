import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);