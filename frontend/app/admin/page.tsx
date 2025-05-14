import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Eye,
  BarChart2,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { AdminMetricCard } from "@/components/admin/metric-card"
import { AdminAlertCard } from "@/components/admin/alert-card"
import { AdminChart } from "@/components/admin/chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Bem-vindo ao painel administrativo do Marketplace.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/analytics">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics Completo
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/reports/generate">
              <FileText className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          title="Usuários"
          value="12,345"
          description="+15% desde o último mês"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="15%"
        />
        <AdminMetricCard
          title="Produtos"
          value="8,721"
          description="+7% desde o último mês"
          icon={<ShoppingBag className="h-4 w-4" />}
          trend="up"
          trendValue="7%"
        />
        <AdminMetricCard
          title="Vendas"
          value="€ 124,500"
          description="+24% desde o último mês"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
          trendValue="24%"
        />
        <AdminMetricCard
          title="Taxa de Conversão"
          value="3.2%"
          description="-0.4% desde o último mês"
          icon={<Activity className="h-4 w-4" />}
          trend="down"
          trendValue="0.4%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Visão Geral de Vendas</CardTitle>
              <CardDescription>Vendas mensais nos últimos 12 meses</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <TrendingUp className="mr-2 h-4 w-4" />
              Ver detalhes
            </Button>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AdminChart type="line" height={300} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Distribuição de Categorias</CardTitle>
              <CardDescription>Produtos por categoria</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Eye className="mr-2 h-4 w-4" />
              Ver detalhes
            </Button>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AdminChart type="pie" height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Itens que Precisam de Atenção</CardTitle>
            <CardDescription>Alertas e notificações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminAlertCard
              title="Produtos Reportados"
              description="5 produtos foram reportados por usuários"
              variant="warning"
              icon={<AlertTriangle className="h-4 w-4" />}
              timestamp="Hoje, 10:15"
              actionLink="/admin/products/moderation"
              actionText="Revisar"
            />
            <AdminAlertCard
              title="Usuários Suspeitos"
              description="2 usuários com atividade suspeita detectados"
              variant="warning"
              icon={<AlertTriangle className="h-4 w-4" />}
              timestamp="Hoje, 09:30"
              actionLink="/admin/users/moderation"
              actionText="Verificar"
            />
            <AdminAlertCard
              title="Backup Automático"
              description="Backup diário concluído com sucesso"
              variant="success"
              icon={<CheckCircle className="h-4 w-4" />}
              timestamp="Hoje, 04:30"
            />
            <AdminAlertCard
              title="Atualização do Sistema"
              description="Atualização programada para 22:00"
              variant="info"
              icon={<Clock className="h-4 w-4" />}
              timestamp="Hoje, 15:45"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/logs">Ver todos os alertas</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage src="/diverse-avatars.png" alt="Maria Oliveira" />
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Maria Oliveira</p>
                    <Badge variant="outline" className="font-medium">
                      Vendedor
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adicionou um novo produto: <span className="font-medium">iPhone 13 Pro</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Há 10 minutos</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage src="/diverse-avatars.png" alt="João Silva" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">João Silva</p>
                    <Badge variant="outline" className="font-medium">
                      Cliente
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Realizou uma compra: <span className="font-medium">Tênis Nike Air Max</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Há 25 minutos</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage src="/diverse-avatars.png" alt="Carlos Santos" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Carlos Santos</p>
                    <Badge variant="outline" className="font-medium">
                      Admin
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Aprovou 3 produtos pendentes</p>
                  <p className="text-xs text-muted-foreground">Há 45 minutos</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarImage src="/diverse-avatars.png" alt="Ana Pereira" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Ana Pereira</p>
                    <Badge variant="outline" className="font-medium">
                      Vendedor
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Respondeu a uma mensagem de <span className="font-medium">Roberto Almeida</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Há 1 hora</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver todas as atividades
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Plataforma</CardTitle>
              <CardDescription>Visão geral do desempenho da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AdminChart type="bar" height={300} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada</CardTitle>
              <CardDescription>Métricas avançadas e tendências</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  <Link href="/admin/analytics" className="text-primary hover:underline">
                    Acesse a página de Analytics
                  </Link>{" "}
                  para ver análises detalhadas
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Relatórios personalizados e exportação de dados</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  <Link href="/admin/reports" className="text-primary hover:underline">
                    Acesse a página de Relatórios
                  </Link>{" "}
                  para ver relatórios detalhados
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Alertas e mensagens do sistema</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  <Link href="/admin/logs" className="text-primary hover:underline">
                    Acesse a página de Logs do Sistema
                  </Link>{" "}
                  para ver notificações detalhadas
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
