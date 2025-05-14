import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SellerPerformanceDialogProps {
  seller: any
  open: boolean
  onClose: () => void
}

export function SellerPerformanceDialog({ seller, open, onClose }: SellerPerformanceDialogProps) {
  // Mock data for charts
  const salesData = [
    { month: "Jan", sales: 12, revenue: 1200 },
    { month: "Fev", sales: 19, revenue: 1900 },
    { month: "Mar", sales: 15, revenue: 1500 },
    { month: "Abr", sales: 22, revenue: 2200 },
    { month: "Mai", sales: 28, revenue: 2800 },
    { month: "Jun", sales: 25, revenue: 2500 },
    { month: "Jul", sales: 30, revenue: 3000 },
    { month: "Ago", sales: 35, revenue: 3500 },
    { month: "Set", sales: 32, revenue: 3200 },
    { month: "Out", sales: 38, revenue: 3800 },
    { month: "Nov", sales: 42, revenue: 4200 },
    { month: "Dez", sales: 48, revenue: 4800 },
  ]

  const categoryData = [
    { name: "Eletrônicos", value: 35 },
    { name: "Moda", value: 25 },
    { name: "Casa", value: 20 },
    { name: "Esportes", value: 15 },
    { name: "Outros", value: 5 },
  ]

  const ratingData = [
    { month: "Jan", rating: 4.2 },
    { month: "Fev", rating: 4.3 },
    { month: "Mar", rating: 4.4 },
    { month: "Abr", rating: 4.3 },
    { month: "Mai", rating: 4.5 },
    { month: "Jun", rating: 4.6 },
    { month: "Jul", rating: 4.7 },
    { month: "Ago", rating: 4.8 },
    { month: "Set", rating: 4.7 },
    { month: "Out", rating: 4.8 },
    { month: "Nov", rating: 4.8 },
    { month: "Dez", rating: 4.9 },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Desempenho do Vendedor: {seller.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="ratings">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendas Mensais</CardTitle>
                <CardDescription>Histórico de vendas dos últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    sales: {
                      label: "Vendas",
                      color: "hsl(var(--chart-1))",
                    },
                    revenue: {
                      label: "Receita (R$)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--color-sales)"
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Porcentagem de vendas por categoria de produto</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    value: {
                      label: "Porcentagem",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Avaliação</CardTitle>
                <CardDescription>Média de avaliações ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    rating: {
                      label: "Avaliação",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3, 5]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="rating" stroke="var(--color-rating)" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
