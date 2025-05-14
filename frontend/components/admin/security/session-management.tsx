"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Filter, LogOut, MoreHorizontal, RefreshCw, Search, Settings, Shield, Smartphone } from "lucide-react"

// Mock data for active sessions
const activeSessions = [
  {
    id: 1,
    userId: 1,
    userName: "João Silva",
    userEmail: "joao.silva@exemplo.com",
    ipAddress: "192.168.1.1",
    device: "Chrome em Windows 10",
    location: "São Paulo, Brasil",
    startTime: "2023-05-01T10:30:00",
    lastActivity: "2023-05-01T11:45:00",
    status: "active",
    isCurrent: true,
  },
  {
    id: 2,
    userId: 1,
    userName: "João Silva",
    userEmail: "joao.silva@exemplo.com",
    ipAddress: "192.168.1.2",
    device: "Safari em macOS",
    location: "São Paulo, Brasil",
    startTime: "2023-04-30T14:20:00",
    lastActivity: "2023-04-30T16:30:00",
    status: "active",
    isCurrent: false,
  },
  {
    id: 3,
    userId: 2,
    userName: "Maria Souza",
    userEmail: "maria.souza@exemplo.com",
    ipAddress: "192.168.2.1",
    device: "Firefox em Ubuntu",
    location: "Rio de Janeiro, Brasil",
    startTime: "2023-05-01T09:15:00",
    lastActivity: "2023-05-01T11:30:00",
    status: "active",
    isCurrent: false,
  },
  {
    id: 4,
    userId: 3,
    userName: "Carlos Oliveira",
    userEmail: "carlos.oliveira@exemplo.com",
    ipAddress: "192.168.3.1",
    device: "Chrome em Android",
    location: "Belo Horizonte, Brasil",
    startTime: "2023-05-01T08:45:00",
    lastActivity: "2023-05-01T10:15:00",
    status: "idle",
    isCurrent: false,
  },
  {
    id: 5,
    userId: 4,
    userName: "Ana Pereira",
    userEmail: "ana.pereira@exemplo.com",
    ipAddress: "192.168.4.1",
    device: "Safari em iOS",
    location: "Curitiba, Brasil",
    startTime: "2023-05-01T07:30:00",
    lastActivity: "2023-05-01T09:45:00",
    status: "idle",
    isCurrent: false,
  },
]

// Session settings
const sessionSettings = {
  sessionTimeout: 30, // minutes
  maxConcurrentSessions: 5,
  rememberMeDuration: 14, // days
  idleTimeout: 15, // minutes
  enforceOneSessionPerUser: false,
  requireReauthForSensitiveActions: true,
}

export function SessionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Ativo</Badge>
      case "idle":
        return <Badge variant="warning">Inativo</Badge>
      case "expired":
        return <Badge variant="destructive">Expirado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const filteredSessions = activeSessions.filter(
    (session) =>
      session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessions.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">De {activeSessions.length} sessões totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Sessão</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">+12% em relação à semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos Móveis</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-muted-foreground">Das sessões ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Limite</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionSettings.sessionTimeout} min</div>
            <p className="text-xs text-muted-foreground">Configuração atual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Sessões Ativas</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Encerrar Todas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Encerrar todas as sessões?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação encerrará todas as sessões ativas, incluindo a sua. Todos os usuários precisarão fazer
                      login novamente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Sim, encerrar todas</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardDescription>Monitore e gerencie sessões ativas de usuários</CardDescription>
            <div className="flex items-center gap-2 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar sessões..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{session.userName}</div>
                        <div className="text-sm text-muted-foreground">{session.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{session.device}</div>
                        <div className="text-sm text-muted-foreground">{session.ipAddress}</div>
                      </div>
                    </TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{formatDate(session.startTime)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(session.status)}
                        {session.isCurrent && <Badge variant="outline">Atual</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem disabled={session.isCurrent}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Encerrar sessão
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Sessão</CardTitle>
            <CardDescription>Defina políticas de sessão para todos os usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <FormLabel>Tempo limite de sessão</FormLabel>
                <Select defaultValue={sessionSettings.sessionTimeout.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                    <SelectItem value="480">8 horas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Tempo até que uma sessão inativa expire</p>
              </div>

              <div className="grid gap-2">
                <FormLabel>Tempo limite de inatividade</FormLabel>
                <Select defaultValue={sessionSettings.idleTimeout.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Tempo até que um usuário seja considerado inativo</p>
              </div>

              <div className="grid gap-2">
                <FormLabel>Duração "Lembrar de mim"</FormLabel>
                <Select defaultValue={sessionSettings.rememberMeDuration.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dia</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="14">14 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Duração do cookie "Lembrar de mim"</p>
              </div>

              <div className="grid gap-2">
                <FormLabel>Sessões simultâneas</FormLabel>
                <Select defaultValue={sessionSettings.maxConcurrentSessions.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 sessão</SelectItem>
                    <SelectItem value="2">2 sessões</SelectItem>
                    <SelectItem value="3">3 sessões</SelectItem>
                    <SelectItem value="5">5 sessões</SelectItem>
                    <SelectItem value="10">10 sessões</SelectItem>
                    <SelectItem value="0">Ilimitado</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Número máximo de sessões simultâneas por usuário</p>
              </div>

              <Button className="w-full">Salvar Configurações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
