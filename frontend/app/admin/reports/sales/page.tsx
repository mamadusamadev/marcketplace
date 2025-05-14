"use client"

import { useState } from "react"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"
import { ReportLayout } from "@/components/admin/report-layout"
import { ReportSummaryCards } from "@/components/admin/report-summary-cards"
import { EnhancedChart } from "@/components/admin/enhanced-chart"
import { DataTable } from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Column definition for the sales table
const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "product",
    header: "Produto",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <span className="font-medium">{formatted}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "processing"
                ? "default"
                : status === "pending"
                  ? "warning"
                  : "destructive"
          }
        >
          {status === "completed"
            ? "Concluído"
            : status === "processing"
              ? "Processando"
              : status === "pending"
                ? "Pendente"
                : "Cancelado"}
        </Badge>
      )
    },
  },
]

// Mock data for the sales table
const data = [
  {
    id: "INV001",
    date: "05/05/2023",
    customer: "João Silva",
    product: "Smartphone XYZ",
    amount: "599.99",
    status: "completed",
  },
  {
    id: "INV002",
    date: "06/05/2023",
    customer: "Maria Oliveira",
    product: "Laptop Pro",
    amount: "1299.99",
    status: "processing",
  },
  {
    id: "INV003",
    date: "07/05/2023",
    customer: "Pedro Santos",
    product: "Fones de Ouvido",
    amount: "89.99",
    status: "completed",
  },
  {
    id: "INV004",
    date: "08/05/2023",
    customer: "Ana Costa",
    product: 'Smart TV 55"',
    amount: "799.99",
    status: "pending",
  },
  {
    id: "INV005",
    date: "09/05/2023",
    customer: "Carlos Ferreira",
    product: "Console de Jogos",
    amount: "499.99",
    status: "cancelled",
  },
  {
    id: "INV006",
    date: "10/05/2023",
    customer: "Mariana Lima",
    product: "Câmera Digital",
    amount: "349.99",
    status: "completed",
  },
  {
    id: "INV007",
    date: "11/05/2023",
    customer: "Rafael Alves",
    product: "Tablet Pro",
    amount: "429.99",
    status: "processing",
  },
  {
    id: "INV008",
    date: "12/05/2023",
    customer: "Juliana Martins",
    product: "Smartwatch",
    amount: "199.99",
    status: "completed",
  },
  {
    id: "INV009",
    date: "13/05/2023",
    customer: "Fernando Gomes",
    product: 'Monitor 27"',
    amount: "299.99",
    status: "pending",
  },
  {
    id: "INV010",
    date: "14/05/2023",
    customer: "Patrícia Rocha",
    product: "Teclado Mecânico",
    amount: "129.99",
    status: "completed",
  },
]

export default function SalesReportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState("Tabela")

  // Summary metrics for the report
  const metrics = [
    {
      title: "Total de Vendas",
      value: "€ 124,500",
      description: "+24% desde o último mês",
      icon: <DollarSign className="h-4 w-4" />,
      trend: "up",
      trendValue: "24%",
    },
    {
      title: "Produtos Vendidos",
      value: "1,245",
      description: "+7% desde o último mês",
      icon: <Package className="h-4 w-4" />,
      trend: "up",
      trendValue: "7%",
    },
    {
      title: "Pedidos",
      value: "845",
      description: "+12% desde o último mês",
      icon: <ShoppingCart className="h-4 w-4" />,
      trend: "up",
      trendValue: "12%",
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      description: "-0.4% desde o último mês",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "down",
      trendValue: "0.4%",
    },
  ]

  // Mock function to handle date range changes
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Mock function to handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Mock function to handle refresh
  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Mock function to handle export
  const handleExport = (format: string) => {
    alert(`Exportando relatório em formato ${format}...`)
  }

  return (
    <ReportLayout
      title="Relatório de Vendas"
      description="Análise detalhada de vendas e transações"
      onDateRangeChange={handleDateRangeChange}
      onFilterChange={handleFilterChange}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onViewChange={setActiveView}
      isLoading={isLoading}
    >
      <ReportSummaryCards metrics={metrics} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <EnhancedChart
          title="Vendas Mensais"
          description="Últimos 12 meses"
          type="line"
          className="lg:col-span-4"
          loading={isLoading}
        />
        <EnhancedChart
          title="Vendas por Categoria"
          description="Distribuição atual"
          type="pie"
          className="lg:col-span-3"
          loading={isLoading}
        />
      </div>

      {activeView === "Tabela" ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>Lista das transações mais recentes na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data}
              searchColumn="customer"
              searchPlaceholder="Buscar por cliente..."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">
          <EnhancedChart
            title="Vendas por Dia da Semana"
            description="Últimos 30 dias"
            type="bar"
            loading={isLoading}
          />
          <EnhancedChart
            title="Métodos de Pagamento"
            description="Distribuição atual"
            type="doughnut"
            loading={isLoading}
          />
        </div>
      )}
    </ReportLayout>
  )
}
