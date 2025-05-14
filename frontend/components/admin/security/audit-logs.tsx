"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Download, Eye, Info, Search, Shield, User } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for audit logs
const auditLogs = [
  {
    id: 1,
    eventType: "login",
    category: "authentication",
    user: "João Silva",
    userEmail: "joao.silva@exemplo.com",
    ipAddress: "192.168.1.1",
    timestamp: "2023-05-01T10:30:00",
    details: "Login bem-sucedido",
    severity: "info",
  },
  {
    id: 2,
    eventType: "permission_change",
    category: "authorization",
    user: "Maria Souza",
    userEmail: "maria.souza@exemplo.com",
    ipAddress: "192.168.1.2",
    timestamp: "2023-05-01T09:45:00",
    details: "Permissão 'admin.users.edit' adicionada ao usuário 'Carlos Oliveira'",
    severity: "warning",
  },
  {
    id: 3,
    eventType: "data_export",
    category: "data_access",
    user: "Carlos Oliveira",
    userEmail: "carlos.oliveira@exemplo.com",
    ipAddress: "192.168.1.3",
    timestamp: "2023-05-01T09:15:00",
    details: "Exportação de dados de usuários (500 registros)",
    severity: "warning",
  },
  {
    id: 4,
    eventType: "failed_login",
    category: "authentication",
    user: "Unknown",
    userEmail: "admin@exemplo.com",
    ipAddress: "203.0.113.1",
    timestamp: "2023-05-01T08:30:00",
    details: "Múltiplas tentativas de login falhas",
    severity: "critical",
  },
  {
    id: 5,
    eventType: "account_locked",
    category: "authentication",
    user: "Ana Pereira",
    userEmail: "ana.pereira@exemplo.com",
    ipAddress: "192.168.1.4",
    timestamp: "2023-05-01T08:15:00",
    details: "Conta bloqueada após 5 tentativas de login falhas",
    severity: "critical",
  },
  {
    id: 6,
    eventType: "password_reset",
    category: "authentication",
    user: "Roberto Santos",
    userEmail: "roberto.santos@exemplo.com",
    ipAddress: "192.168.1.5",
    timestamp: "2023-05-01T07:45:00",
    details: "Solicitação de redefinição de senha",
    severity: "info",
  },
  {
    id: 7,
    eventType: "settings_change",
    category: "system",
    user: "João Silva",
    userEmail: "joao.silva@exemplo.com",
    ipAddress: "192.168.1.1",
    timestamp: "2023-04-30T16:30:00",
    details: "Alteração nas configurações de segurança: tempo limite de sessão alterado de 15 para 30 minutos",
    severity: "warning",
  },
]

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return <Badge variant="blue">Informação</Badge>
      case "warning":
        return <Badge variant="warning">Alerta</Badge>
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <User className="h-4 w-4 text-blue-500" />
      case "authorization":
        return <Shield className="h-4 w-4 text-green-500" />
      case "data_access":
        return <Eye className="h-4 w-4 text-amber-500" />
      case "system":
        return <Info className="h-4 w-4 text-purple-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    // Apply search filter
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply category filter
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory

    // Apply severity filter
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity

    // Apply date filter
    const matchesDate = !selectedDate || new Date(log.timestamp).toDateString() === selectedDate.toDateString()

    return matchesSearch && matchesCategory && matchesSeverity && matchesDate
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Logs de Auditoria de Segurança</CardTitle>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Logs
            </Button>
          </div>
          <CardDescription>Registros de atividades relacionadas à segurança no sistema</CardDescription>
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="authentication">Autenticação</SelectItem>
                <SelectItem value="authorization">Autorização</SelectItem>
                <SelectItem value="data_access">Acesso a dados</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as severidades</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
                <SelectItem value="warning">Alerta</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecionar data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>

            {(selectedDate || selectedCategory !== "all" || selectedSeverity !== "all" || searchTerm) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedDate(undefined)
                  setSelectedCategory("all")
                  setSelectedSeverity("all")
                  setSearchTerm("")
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Severidade</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(log.category)}
                        <div>
                          <div className="font-medium capitalize">{log.eventType.replace(/_/g, " ")}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {log.category.replace(/_/g, " ")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{log.user}</div>
                        <div className="text-xs text-muted-foreground">{log.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes do Evento</DialogTitle>
                            <DialogDescription>Informações detalhadas sobre o evento de segurança</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">ID:</div>
                              <div className="col-span-3">{log.id}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Tipo:</div>
                              <div className="col-span-3 capitalize">{log.eventType.replace(/_/g, " ")}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Categoria:</div>
                              <div className="col-span-3 capitalize">{log.category.replace(/_/g, " ")}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Usuário:</div>
                              <div className="col-span-3">
                                {log.user} ({log.userEmail})
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">IP:</div>
                              <div className="col-span-3">{log.ipAddress}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Data/Hora:</div>
                              <div className="col-span-3">{formatDate(log.timestamp)}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Severidade:</div>
                              <div className="col-span-3">{getSeverityBadge(log.severity)}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="text-sm font-medium">Detalhes:</div>
                              <div className="col-span-3">{log.details}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum log encontrado com os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
