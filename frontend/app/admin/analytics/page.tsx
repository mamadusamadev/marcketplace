"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminMetricCard } from "@/components/admin/metric-card"
import {
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  TrendingUp,
  CalendarIcon,
  Download,
  BarChart2,
  PieChart,
  LineChart,
  RefreshCw,
} from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { AdminChart } from "@/components/admin/chart"

export default function AnalyticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "quarter" | "year">("month")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Análise detalhada do desempenho da plataforma.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Select defaultValue={dateRange} onValueChange={(value) => setDateRange(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: pt }) : <span>Escolha uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          title="Usuários Ativos"
          value="8,249"
          description="+12% desde o período anterior"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="12%"
        />
        <AdminMetricCard
          title="Novos Produtos"
          value="1,432"
          description="+5% desde o período anterior"
          icon={<ShoppingBag className="h-4 w-4" />}
          trend="up"
          trendValue="5%"
        />
        <AdminMetricCard
          title="Volume de Vendas"
          value="€ 89,432"
          description="+18% desde o período anterior"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
          trendValue="18%"
        />
        <AdminMetricCard
          title="Taxa de Conversão"
          value="3.8%"
          description="-0.2% desde o período anterior"
          icon={<Activity className="h-4 w-4" />}
          trend="down"
          trendValue="0.2%"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline-block">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline-block">Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline-block">Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline-block">Usuários</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral de Vendas</CardTitle>
                <CardDescription>Vendas mensais nos últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <AdminChart type="line" height={350} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Distribuição de Categorias</CardTitle>
                <CardDescription>Produtos por categoria</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <AdminChart type="pie" height={350} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Aquisição de Usuários</CardTitle>
                <CardDescription>Fontes de tráfego e conversões</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <AdminChart type="bar" height={350} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Atividade da Plataforma</CardTitle>
                <CardDescription>Métricas de engajamento ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <AdminChart type="line" height={350} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Tendência de Vendas</CardTitle>
                <CardDescription>Análise detalhada de vendas por período</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="line" height={400} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Vendas por Região</CardTitle>
                <CardDescription>Distribuição geográfica de vendas</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="pie" height={400} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Receita</CardTitle>
              <CardDescription>Receita por categoria de produto e tendências</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AdminChart type="bar" height={400} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Categorias Populares</CardTitle>
                <CardDescription>Distribuição de produtos por categoria</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="pie" height={400} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Desempenho de Produtos</CardTitle>
                <CardDescription>Visualizações, favoritos e vendas por produto</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="bar" height={400} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendências de Produtos</CardTitle>
              <CardDescription>Análise de tendências de produtos ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AdminChart type="line" height={400} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Crescimento de Usuários</CardTitle>
                <CardDescription>Novos registros e usuários ativos</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="line" height={400} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Segmentação de Usuários</CardTitle>
                <CardDescription>Distribuição por tipo de usuário</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AdminChart type="doughnut" height={400} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engajamento de Usuários</CardTitle>
              <CardDescription>Métricas de atividade e retenção</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AdminChart type="bar" height={400} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
