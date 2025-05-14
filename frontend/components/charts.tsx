"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Bar Chart
export function BarChart() {
  const data: ChartData<"bar"> = {
    labels: ["iPhone 13", "MacBook Pro", "AirPods Pro", "iPad Air", "Apple Watch"],
    datasets: [
      {
        label: "Visualizações",
        data: [450, 320, 280, 205, 190],
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={data} options={options} />
}

// Line Chart
export function LineChart() {
  const data: ChartData<"line"> = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Vendas",
        data: [30, 25, 35, 50, 45, 35, 25, 35, 20, 30, 40, 50],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `Vendas: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
      line: {
        borderWidth: 2,
      },
    },
  }

  return (
    <div className="relative h-full w-full">
      <Line data={data} options={options} />
      <div className="absolute bottom-0 left-0 text-xs text-gray-400">Line Chart (Simulação)</div>
    </div>
  )
}

// Pie Chart
export function PieChart() {
  const data: ChartData<"pie"> = {
    labels: ["Tecnologia", "Móveis", "Roupas", "Esportes", "Jogos"],
    datasets: [
      {
        label: "Produtos",
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Azul
          "rgba(124, 58, 237, 0.8)", // Roxo
          "rgba(249, 115, 22, 0.8)", // Laranja
          "rgba(16, 185, 129, 0.8)", // Verde
          "rgba(236, 72, 153, 0.8)", // Rosa
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(124, 58, 237, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw as number
            const percentage = Math.round(value) + "%"
            return `${label}: ${percentage}`
          },
        },
      },
    },
  }

  return <Pie data={data} options={options} />
}
