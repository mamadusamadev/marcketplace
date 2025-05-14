"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AlertCircle, CalendarIcon, Download, Filter, RefreshCw, Search, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { LogsTable } from "@/components/admin/logs-table"
import { LogTimeline } from "@/components/admin/log-timeline"

// Mock log data
const mockLogs = [
  {
    id: "log_1",
    timestamp: new Date(2023, 4, 15, 10, 30),
    user: {
      name: "João Silva",
      email: "joao.silva@example.com",
      role: "customer",
    },
    action: "login",
    description: "Login bem-sucedido",
    status: "success",
    ip: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    details: {
      method: "email/password",
      location: "São Paulo, Brasil",
    },
  },
  {
    id: "log_2",
    timestamp: new Date(2023, 4, 15, 11, 45),
    user: {
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      role: "seller",
    },
    action: "product_create",
    description: "Novo produto adicionado: 'Smartphone XYZ'",
    status: "success",
    ip: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    details: {
      productId: "prod_123456",
      category: "Eletrônicos",
      price: "R$ 1.299,00",
    },
  },
  {
    id: "log_3",
    timestamp: new Date(2023, 4, 15, 12, 15),
    user: {
      name: "Pedro Santos",
      email: "pedro.santos@example.com",
      role: "customer",
    },
    action: "purchase",
    description: "Compra realizada: Pedido #ORD-7890",
    status: "success",
    ip: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
    details: {
      orderId: "ORD-7890",
      total: "R$ 1.299,00",
      items: 1,
      paymentMethod: "Cartão de crédito",
    },
  },
  {
    id: "log_4",
    timestamp: new Date(2023, 4, 15, 13, 20),
    user: {
      name: "Ana Costa",
      email: "ana.costa@example.com",
      role: "customer",
    },
    action: "login",
    description: "Tentativa de login falhou",
    status: "error",
    ip: "192.168.1.4",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    details: {
      reason: "Senha incorreta",
      attempts: 3,
    },
  },
  {
    id: "log_5",
    timestamp: new Date(2023, 4, 15, 14, 10),
    user: {
      name: "Carlos Ferreira",
      email: "carlos.ferreira@example.com",
      role: "seller",
    },
    action: "product_update",
    description: "Produto atualizado: 'Notebook ABC'",
    status: "success",
    ip: "192.168.1.5",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    details: {
      productId: "prod_789012",
      changes: ["price", "stock", "description"],
      previousPrice: "R$ 3.499,00",
      newPrice: "R$ 3.299,00",
    },
  },
  {
    id: "log_6",
    timestamp: new Date(2023, 4, 15, 15, 30),
    user: {
      name: "Mariana Lima",
      email: "mariana.lima@example.com",
      role: "admin",
    },
    action: "user_update",
    description: "Permissões de usuário atualizadas",
    status: "success",
    ip: "192.168.1.6",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    details: {
      targetUser: "carlos.ferreira@example.com",
      changes: ["role"],
      previousRole: "customer",
      newRole: "seller",
    },
  },
  {
    id: "log_7",
    timestamp: new Date(2023, 4, 15, 16, 45),
    user: {
      name: "Sistema",
      email: "system@marketplace.com",
      role: "system",
    },
    action: "backup",
    description: "Backup diário do banco de dados",
    status: "success",
    ip: "internal",
    userAgent: "System Service",
    details: {
      size: "1.2GB",
      duration: "00:05:23",
      location: "cloud-storage/backups/2023-05-15/",
    },
  },
  {
    id: "log_8",
    timestamp: new Date(2023, 4, 15, 17, 20),
    user: {
      name: "Rafael Alves",
      email: "rafael.alves@example.com",
      role: "customer",
    },
    action: "account_update",
    description: "Informações de conta atualizadas",
    status: "success",
    ip: "192.168.1.8",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    details: {
      changes: ["address", "phone"],
    },
  },
  {
    id: "log_9",
    timestamp: new Date(2023, 4, 15, 18, 10),
    user: {
      name: "Sistema",
      email: "system@marketplace.com",
      role: "system",
    },
    action: "maintenance",
    description: "Início da manutenção programada",
    status: "warning",
    ip: "internal",
    userAgent: "System Service",
    details: {
      duration: "00:30:00",
      services: ["database", "search"],
      impact: "Pesquisa temporariamente indisponível",
    },
  },
  {
    id: "log_10",
    timestamp: new Date(2023, 4, 15, 19, 30),
    user: {
      name: "Juliana Martins",
      email: "juliana.martins@example.com",
      role: "customer",
    },
    action: "support_request",
    description: "Novo ticket de suporte aberto",
    status: "pending",
    ip: "192.168.1.10",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
    details: {
      ticketId: "TKT-4567",
      subject: "Problema com pagamento",
      priority: "Alta",
    },
  },
  {
    id: "log_11",
    timestamp: new Date(2023, 4, 15, 20, 15),
    user: {
      name: "Fernando Gomes",
      email: "fernando.gomes@example.com",
      role: "seller",
    },
    action: "product_delete",
    description: "Produto removido: 'Fones de Ouvido XYZ'",
    status: "success",
    ip: "192.168.1.11",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    details: {
      productId: "prod_345678",
      reason: "Produto descontinuado",
    },
  },
  {
    id: "log_12",
    timestamp: new Date(2023, 4, 15, 21, 45),
    user: {
      name: "Sistema",
      email: "system@marketplace.com",
      role: "system",
    },
    action: "maintenance",
    description: "Fim da manutenção programada",
    status: "success",
    ip: "internal",
    userAgent: "System Service",
    details: {
      duration: "00:30:00",
      services: ["database", "search"],
      status: "Todos os serviços normalizados",
    },
  },
]

export default function LogsPage() {
  const [view, setView] = useState<string>("timeline")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })
  const [filters, setFilters] = useState<{
    action: string
    status: string
    role: string
    search: string
  }>({
    action: "all",
    status: "all",
    role: "all",
    search: "",
  })

  // Filter logs based on selected filters
  const filteredLogs = mockLogs.filter((log) => {
    // Filter by date range
    if (log.timestamp < date.from || log.timestamp > date.to) return false

    // Filter by action type
    if (filters.action !== "all" && log.action !== filters.action) return false

    // Filter by status
    if (filters.status !== "all" && log.status !== filters.status) return false

    // Filter by user role
    if (filters.role !== "all" && log.user.role !== filters.role) return false

    // Filter by search term
    if (filters.search && !searchLog(log, filters.search)) return false

    return true
  })

  // Search function to check if log contains search term
  function searchLog(log: any, term: string) {
    const searchTerm = term.toLowerCase()
    return (
      log.user.name.toLowerCase().includes(searchTerm) ||
      log.user.email.toLowerCase().includes(searchTerm) ||
      log.description.toLowerCase().includes(searchTerm) ||
      log.action.toLowerCase().includes(searchTerm)
    )
  }

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Handle export button click
  const handleExport = (format: string) => {
    // In a real application, this would generate and download the file
    console.log(`Exporting logs in ${format} format`)
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      action: "all",
      status: "all",
      role: "all",
      search: "",
    })
    setDate({
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    })
  }

  // Remove a specific filter
  const removeFilter = (filterType: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: filterType === "search" ? "" : "all",
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Logs do Sistema</h2>
          <p className="text-muted-foreground">Visualize e analise todas as atividades do sistema</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "P", { locale: ptBR })} - {format(date.to, "P", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "P", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate?.from && selectedDate?.to) {
                    setDate(selectedDate as { from: Date; to: Date })
                  }
                }}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Select defaultValue="PDF" onValueChange={(value) => handleExport(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="CSV">CSV</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => handleExport("PDF")}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>

            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Refine os logs do sistema usando os filtros abaixo</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 lg:px-3">
                Limpar filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-[200px]">
                  <Select
                    value={filters.action}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, action: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="product_create">Criação de Produto</SelectItem>
                      <SelectItem value="product_update">Atualização de Produto</SelectItem>
                      <SelectItem value="product_delete">Exclusão de Produto</SelectItem>
                      <SelectItem value="purchase">Compra</SelectItem>
                      <SelectItem value="user_update">Atualização de Usuário</SelectItem>
                      <SelectItem value="account_update">Atualização de Conta</SelectItem>
                      <SelectItem value="support_request">Solicitação de Suporte</SelectItem>
                      <SelectItem value="backup">Backup</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full md:w-[200px]">
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="success">Sucesso</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                      <SelectItem value="warning">Alerta</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full md:w-[200px]">
                  <Select
                    value={filters.role}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Usuários</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="seller">Vendedor</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar nos logs..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Active filters */}
              {(filters.action !== "all" || filters.status !== "all" || filters.role !== "all" || filters.search) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Filter className="mr-1 h-3 w-3" />
                    Filtros ativos:
                  </div>

                  {filters.action !== "all" && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Ação: {filters.action.replace("_", " ")}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 p-0"
                        onClick={() => removeFilter("action")}
                      >
                        <X className="h-2 w-2" />
                        <span className="sr-only">Remover filtro de ação</span>
                      </Button>
                    </Badge>
                  )}

                  {filters.status !== "all" && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Status: {filters.status}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 p-0"
                        onClick={() => removeFilter("status")}
                      >
                        <X className="h-2 w-2" />
                        <span className="sr-only">Remover filtro de status</span>
                      </Button>
                    </Badge>
                  )}

                  {filters.role !== "all" && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Usuário: {filters.role}
                      <Button variant="ghost" size="icon" className="h-3 w-3 p-0" onClick={() => removeFilter("role")}>
                        <X className="h-2 w-2" />
                        <span className="sr-only">Remover filtro de usuário</span>
                      </Button>
                    </Badge>
                  )}

                  {filters.search && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Busca: {filters.search}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 p-0"
                        onClick={() => removeFilter("search")}
                      >
                        <X className="h-2 w-2" />
                        <span className="sr-only">Remover termo de busca</span>
                      </Button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* View Selector */}
        <Tabs defaultValue={view} className="w-full" onValueChange={setView}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="table">Tabela</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content */}
        {isLoading ? (
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Carregando logs do sistema...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="flex h-[200px] flex-col items-center justify-center gap-2 p-6 text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Nenhum log encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Não foram encontrados logs que correspondam aos filtros selecionados.
                </p>
              </div>
              <Button variant="outline" className="mt-2" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <TabsContent value={view} className="mt-0">
            {view === "timeline" ? <LogTimeline logs={filteredLogs} /> : <LogsTable logs={filteredLogs} />}
          </TabsContent>
        )}
      </div>
    </div>
  )
}
