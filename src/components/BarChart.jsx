import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ data }) {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Amount Spent ($)',
        data: data.map(item => item.amount),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bars
    scales: {
      x: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
  };

  return <Bar data={chartData} options={options} />;
}
