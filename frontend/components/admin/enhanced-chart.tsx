"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportError } from "@/components/admin/report-error"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
    tension?: number
  }[]
}

interface EnhancedChartProps {
  title: string
  description?: string
  type: "line" | "bar" | "pie" | "doughnut"
  data?: ChartData
  height?: number
  loading?: boolean
  error?: boolean
  errorMessage?: string
  onRetry?: () => void
  showLegend?: boolean
  showDataLabels?: boolean
  className?: string
  periodOptions?: string[]
}

export function EnhancedChart({
  title,
  description,
  type = "line",
  data,
  height = 350,
  loading = false,
  error = false,
  errorMessage,
  onRetry,
  showLegend = true,
  showDataLabels = false,
  className,
  periodOptions = ["7D", "30D", "3M", "6M", "1A", "MAX"],
}: EnhancedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [activePeriod, setActivePeriod] = useState(periodOptions[1])

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

  const chartData = data || (type === "pie" || type === "doughnut" ? mockPieData : mockLineData)

  useEffect(() => {
    if (chartRef.current && !loading && !error) {
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
          `${type.charAt(0).toUpperCase() + type.slice(1)} Chart (${activePeriod})`,
          canvas.width / 2,
          canvas.height / 2 - 20,
        )

        // Draw a simple representation based on chart type
        if (type === "line" || type === "bar") {
          const mockData = chartData.datasets[0].data
          const maxValue = Math.max(...mockData)
          const padding = 40
          const chartHeight = canvas.height - padding * 2
          const chartWidth = canvas.width - padding * 2
          const stepX = chartWidth / (mockData.length - 1)

          // Draw axis
          ctx.beginPath()
          ctx.strokeStyle = "#d1d5db"
          ctx.lineWidth = 1
          ctx.moveTo(padding, padding)
          ctx.lineTo(padding, canvas.height - padding)
          ctx.lineTo(canvas.width - padding, canvas.height - padding)
          ctx.stroke()

          // Draw labels
          ctx.font = "12px Arial"
          ctx.fillStyle = "#6b7280"
          ctx.textAlign = "center"
          chartData.labels.forEach((label, index) => {
            const x = padding + index * stepX
            ctx.fillText(label, x, canvas.height - padding / 2)
          })

          // Draw datasets
          chartData.datasets.forEach((dataset, datasetIndex) => {
            const color = dataset.borderColor || `hsl(${datasetIndex * 60}, 70%, 50%)`
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.lineWidth = 2

            dataset.data.forEach((value, index) => {
              const x = padding + index * stepX
              const y = padding + chartHeight - (value / maxValue) * chartHeight

              if (index === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }

              if (type === "bar") {
                ctx.fillStyle = dataset.backgroundColor || `hsla(${datasetIndex * 60}, 70%, 50%, 0.5)`
                ctx.fillRect(x - stepX / 3, y, stepX / 1.5, chartHeight - (y - padding))
              }
            })

            if (type === "line") {
              ctx.stroke()
            }
          })

          // Draw legend
          if (showLegend) {
            const legendY = 20
            let legendX = canvas.width - padding - 20

            chartData.datasets.forEach((dataset, index) => {
              const color = dataset.borderColor || `hsl(${index * 60}, 70%, 50%)`
              const textWidth = ctx.measureText(dataset.label).width

              legendX -= textWidth + 30

              ctx.fillStyle = color
              ctx.fillRect(legendX, legendY - 8, 20, 4)

              ctx.fillStyle = "#6b7280"
              ctx.textAlign = "left"
              ctx.fillText(dataset.label, legendX + 25, legendY)
            })
          }
        } else if (type === "pie" || type === "doughnut") {
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const radius = Math.min(centerX, centerY) - 60
          const padding = 40

          let startAngle = 0
          chartData.datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 2 * Math.PI
            const color = chartData.datasets[0].backgroundColor?.[index] || `hsl(${index * 60}, 70%, 50%)`

            ctx.beginPath()
            ctx.fillStyle = color
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
            ctx.closePath()
            ctx.fill()

            // Draw data labels
            if (showDataLabels) {
              const midAngle = startAngle + sliceAngle / 2
              const labelRadius = radius * 0.7
              const labelX = centerX + Math.cos(midAngle) * labelRadius
              const labelY = centerY + Math.sin(midAngle) * labelRadius

              ctx.fillStyle = "#ffffff"
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillText(`${value}%`, labelX, labelY)
            }

            startAngle += sliceAngle
          })

          if (type === "doughnut") {
            ctx.beginPath()
            ctx.fillStyle = "#ffffff"
            ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
            ctx.fill()
          }

          // Draw legend
          if (showLegend) {
            const legendY = canvas.height - 30
            const itemWidth = canvas.width / (chartData.labels.length + 1)

            chartData.labels.forEach((label, index) => {
              const color = chartData.datasets[0].backgroundColor?.[index] || `hsl(${index * 60}, 70%, 50%)`
              const legendX = itemWidth * (index + 0.5)

              ctx.fillStyle = color
              ctx.fillRect(legendX - 30, legendY - 8, 20, 8)

              ctx.fillStyle = "#6b7280"
              ctx.textAlign = "left"
              ctx.fillText(label, legendX - 5, legendY)
            })
          }
        }
      }
    }
  }, [type, data, height, loading, error, activePeriod, showLegend, showDataLabels, chartData])

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ReportError
            title="Erro ao carregar gráfico"
            message={errorMessage || "Não foi possível carregar os dados do gráfico."}
            onRetry={onRetry}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Tabs defaultValue={activePeriod} onValueChange={setActivePeriod}>
          <TabsList className="grid grid-cols-6 h-8">
            {periodOptions.map((period) => (
              <TabsTrigger key={period} value={period} className="text-xs">
                {period}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[350px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div ref={chartRef} className="h-[350px] w-full" />
        )}
      </CardContent>
    </Card>
  )
}
