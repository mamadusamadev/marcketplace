"use client"

import { useState } from "react"
import { ReportLayout } from "@/components/admin/report-layout"
import { ReportSummaryCards } from "@/components/admin/report-summary-cards"
import { EnhancedChart } from "@/components/admin/enhanced-chart"
import { ReportError } from "@/components/admin/report-error"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrafficSourcesTable } from "@/components/admin/traffic/traffic-sources-table"
import { TrafficDevicesTable } from "@/components/admin/traffic/traffic-devices-table"
import { TrafficLocationsTable } from "@/components/admin/traffic/traffic-locations-table"
import { TrafficPagesTable } from "@/components/admin/traffic/traffic-pages-table"
import { useTrafficData } from "@/hooks/use-traffic-data"

export default function TrafficReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeView, setActiveView] = useState<string>("Gráfico")
  const [activeTab, setActiveTab] = useState<string>("overview")

  const { data, isLoading, error, refetch } = useTrafficData({
    startDate: dateRange.from.toISOString(),
    endDate: dateRange.to.toISOString(),
    filter: activeFilter,
  })

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "source") {
      setActiveFilter(value)
    }
  }

  const handleViewChange = (view: string) => {
    setActiveView(view)
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleExport = (format: string) => {
    // In a real application, this would trigger an export of the data
    console.log(`Exporting traffic data in ${format} format`)
  }

  if (error) {
    return <ReportError message="Não foi possível carregar os dados de tráfego" />
  }

  return (
    <ReportLayout
      title="Relatório de Tráfego"
      description="Análise detalhada do tráfego do site"
      filterOptions={{
        userTypes: false,
        categories: false,
        status: false,
      }}
      onDateRangeChange={handleDateRangeChange}
      onFilterChange={handleFilterChange}
      onViewChange={handleViewChange}
      onRefresh={handleRefresh}
      onExport={handleExport}
      isLoading={isLoading}
    >
      {data && (
        <div className="space-y-6">
          <ReportSummaryCards
            metrics={[
              {
                title: "Visitantes Únicos",
                value: data.summary.uniqueVisitors.toLocaleString(),
                change: data.summary.uniqueVisitorsChange,
                icon: "users",
              },
              {
                title: "Total de Visitas",
                value: data.summary.totalVisits.toLocaleString(),
                change: data.summary.totalVisitsChange,
                icon: "eye",
              },
              {
                title: "Taxa de Rejeição",
                value: `${data.summary.bounceRate.toFixed(2)}%`,
                change: -data.summary.bounceRateChange,
                changeType: "inverse",
                icon: "log-out",
              },
              {
                title: "Tempo Médio",
                value: `${data.summary.avgTimeOnSite.toFixed(2)} min`,
                change: data.summary.avgTimeOnSiteChange,
                icon: "clock",
              },
            ]}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-[600px] grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="sources">Fontes</TabsTrigger>
              <TabsTrigger value="devices">Dispositivos</TabsTrigger>
              <TabsTrigger value="locations">Localizações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              {activeView === "Gráfico" ? (
                <EnhancedChart
                  title="Visitas ao Longo do Tempo"
                  description="Número de visitas diárias no período selecionado"
                  type="line"
                  data={{
                    labels: data.trafficOverTime.map((item) => item.date),
                    datasets: [
                      {
                        label: "Visitas",
                        data: data.trafficOverTime.map((item) => item.visits),
                        borderColor: "hsl(var(--primary))",
                        backgroundColor: "rgba(var(--primary), 0.1)",
                        tension: 0.3,
                      },
                      {
                        label: "Visitantes Únicos",
                        data: data.trafficOverTime.map((item) => item.uniqueVisitors),
                        borderColor: "hsl(var(--secondary))",
                        backgroundColor: "rgba(var(--secondary), 0.1)",
                        tension: 0.3,
                      },
                    ],
                  }}
                  height={400}
                  showLegend={true}
                  showDataLabels={false}
                />
              ) : (
                <TrafficPagesTable data={data.topPages} />
              )}
            </TabsContent>

            <TabsContent value="sources" className="space-y-4 pt-4">
              {activeView === "Gráfico" ? (
                <EnhancedChart
                  title="Fontes de Tráfego"
                  description="Distribuição de visitas por fonte de tráfego"
                  type="pie"
                  data={{
                    labels: data.trafficSources.map((item) => item.source),
                    datasets: [
                      {
                        data: data.trafficSources.map((item) => item.visits),
                        backgroundColor: [
                          "hsl(var(--primary))",
                          "hsl(var(--secondary))",
                          "hsl(var(--accent))",
                          "hsl(var(--muted))",
                          "hsl(var(--card))",
                        ],
                      },
                    ],
                  }}
                  height={400}
                  showLegend={true}
                  showDataLabels={true}
                />
              ) : (
                <TrafficSourcesTable data={data.trafficSources} />
              )}
            </TabsContent>

            <TabsContent value="devices" className="space-y-4 pt-4">
              {activeView === "Gráfico" ? (
                <EnhancedChart
                  title="Dispositivos"
                  description="Distribuição de visitas por tipo de dispositivo"
                  type="bar"
                  data={{
                    labels: data.deviceTypes.map((item) => item.device),
                    datasets: [
                      {
                        label: "Visitas",
                        data: data.deviceTypes.map((item) => item.visits),
                        backgroundColor: "hsl(var(--primary))",
                      },
                    ],
                  }}
                  height={400}
                  showLegend={true}
                  showDataLabels={false}
                />
              ) : (
                <TrafficDevicesTable data={data.deviceTypes} />
              )}
            </TabsContent>

            <TabsContent value="locations" className="space-y-4 pt-4">
              {activeView === "Gráfico" ? (
                <EnhancedChart
                  title="Localizações"
                  description="Distribuição de visitas por localização"
                  type="bar"
                  data={{
                    labels: data.topLocations.slice(0, 10).map((item) => item.location),
                    datasets: [
                      {
                        label: "Visitas",
                        data: data.topLocations.slice(0, 10).map((item) => item.visits),
                        backgroundColor: "hsl(var(--primary))",
                      },
                    ],
                  }}
                  height={400}
                  showLegend={true}
                  showDataLabels={false}
                />
              ) : (
                <TrafficLocationsTable data={data.topLocations} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </ReportLayout>
  )
}
