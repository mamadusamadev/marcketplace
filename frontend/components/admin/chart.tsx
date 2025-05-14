"use client"

import { useEffect, useRef } from "react"

interface AdminChartProps {
  type: "line" | "bar" | "pie" | "doughnut"
  data?: any
  options?: any
  height?: number
  className?: string
}

export function AdminChart({ type = "line", data, options, height = 300, className }: AdminChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Mock data for demonstration
  const mockLineData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Vendas 2023",
        data: [65, 59, 80, 81, 56, 55, 40, 56, 76, 85, 90, 100],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
      },
      {
        label: "Vendas 2022",
        data: [28, 48, 40, 19, 86, 27, 90, 35, 55, 65, 72, 78],
        borderColor: "rgb(203, 213, 225)",
        backgroundColor: "rgba(203, 213, 225, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const mockPieData = {
    labels: ["Eletrônicos", "Moda", "Casa", "Esportes", "Outros"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgb(99, 102, 241)",
          "rgb(14, 165, 233)",
          "rgb(249, 115, 22)",
          "rgb(34, 197, 94)",
          "rgb(203, 213, 225)",
        ],
      },
    ],
  }

  useEffect(() => {
    if (chartRef.current) {
      // In a real application, you would use a charting library like Chart.js
      // For this example, we'll just render a placeholder
      const chartContainer = chartRef.current
      chartContainer.innerHTML = ""

      const canvas = document.createElement("canvas")
      canvas.width = chartContainer.clientWidth
      canvas.height = height
      chartContainer.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = "14px Arial"
        ctx.fillStyle = "#6b7280"
        ctx.textAlign = "center"
        ctx.fillText(
          `${type.charAt(0).toUpperCase() + type.slice(1)} Chart (Simulação)`,
          canvas.width / 2,
          canvas.height / 2,
        )

        // Draw a simple representation based on chart type
        if (type === "line" || type === "bar") {
          const mockData = mockLineData.datasets[0].data
          const maxValue = Math.max(...mockData)
          const padding = 40
          const chartHeight = canvas.height - padding * 2
          const chartWidth = canvas.width - padding * 2
          const stepX = chartWidth / (mockData.length - 1)

          ctx.beginPath()
          ctx.strokeStyle = "#6366f1"
          ctx.lineWidth = 2

          mockData.forEach((value, index) => {
            const x = padding + index * stepX
            const y = padding + chartHeight - (value / maxValue) * chartHeight

            if (index === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }

            if (type === "bar") {
              ctx.fillStyle = "rgba(99, 102, 241, 0.5)"
              ctx.fillRect(x - stepX / 3, y, stepX / 1.5, chartHeight - (y - padding))
            }
          })

          if (type === "line") {
            ctx.stroke()
          }
        } else if (type === "pie" || type === "doughnut") {
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const radius = Math.min(centerX, centerY) - 40
          const padding = 40

          let startAngle = 0
          mockPieData.datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / 100) * 2 * Math.PI

            ctx.beginPath()
            ctx.fillStyle = mockPieData.backgroundColor?.[index] || mockPieData.datasets[0].backgroundColor[index]
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
            ctx.closePath()
            ctx.fill()

            startAngle += sliceAngle
          })

          if (type === "doughnut") {
            ctx.beginPath()
            ctx.fillStyle = "#ffffff"
            ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      }
    }
  }, [type, data, options, height])

  return (
    <div className="relative h-full w-full">
      <div ref={chartRef} className="h-full w-full" />
    </div>
  )
}
