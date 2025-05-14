"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Flag,
  Eye,
  MessageSquare,
  Filter,
  UserX,
  Lock,
} from "lucide-react"

// Mock data for reported users
const reportedUsers = [
  {
    id: "u1",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "Cliente",
    status: "active",
    image: "/diverse-avatars.png",
    reportReason: "Comportamento abusivo",
    reportedBy: "Maria Oliveira",
    reportDate: "2023-05-15T10:30:00Z",
    reportCount: 3,
    lastActive: "Há 2 dias",
  },
  {
    id: "u2",
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    role: "Vendedor",
    status: "active",
    image: "/diverse-avatars.png",
    reportReason: "Produtos falsificados",
    reportedBy: "Ana Pereira",
    reportDate: "2023-05-14T14:20:00Z",
    reportCount: 5,
    lastActive: "Há 1 semana",
  },
  {
    id: "u3",
    name: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    role: "Cliente",
    status: "active",
    image: "/diverse-avatars.png",
    reportReason: "Spam/Mensagens indesejadas",
    reportedBy: "Roberto Costa",
    reportDate: "2023-05-13T09:15:00Z",
    reportCount: 2,
    lastActive: "Há 3 dias",
  },
]

// Mock data for suspicious users
const suspiciousUsers = [
  {
    id: "u4",
    name: "Marcos Oliveira",
    email: "marcos.oliveira@example.com",
    role: "Vendedor",
    status: "active",
    image: "/diverse-avatars.png",
    suspiciousActivity: "Múltiplas contas",
    detectedDate: "2023-05-15T08:30:00Z",
    riskLevel: "high",
    lastActive: "Há 1 dia",
  },
  {
    id: "u5",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    role: "Cliente",
    status: "active",
    image: "/diverse-avatars.png",
    suspiciousActivity: "Tentativas de login suspeitas",
    detectedDate: "2023-05-14T13:45:00Z",
    riskLevel: "medium",
    lastActive: "Há 5 horas",
  },
  {
    id: "u6",
    name: "Ricardo Souza",
    email: "ricardo.souza@example.com",
    role: "Vendedor",
    status: "active",
    image: "/diverse-avatars.png",
    suspiciousActivity: "Atividade incomum",
    detectedDate: "2023-05-14T10:20:00Z",
    riskLevel: "low",
    lastActive: "Agora",
  },
]

export default function UserModerationPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"reported" | "suspicious">("reported")

  // Filter users based on search query and role
  const filteredReportedUsers = reportedUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.reportReason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = filterRole === null || user.role === filterRole

    return matchesSearch && matchesRole
  })

  const filteredSuspiciousUsers = suspiciousUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.suspiciousActivity.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = filterRole === null || user.role === filterRole

    return matchesSearch && matchesRole
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).formatRange(date, 2)
  }

  // Handle user warning
  const handleWarnUser = (user: any) => {
    toast({
      title: "Aviso enviado",
      description: `Um aviso foi enviado para ${user.name}.`,
    })
  }

  // Handle user suspension
  const handleSuspendUser = (user: any) => {
    toast({
      title: "Usuário suspenso",
      description: `${user.name} foi suspenso temporariamente.`,
      variant: "destructive",
    })
  }

  // Handle user ban
  const handleBanUser = (user: any) => {
    toast({
      title: "Usuário banido",
      description: `${user.name} foi banido permanentemente.`,
      variant: "destructive",
    })
  }

  // Handle user verification
  const handleVerifyUser = (user: any) => {
    toast({
      title: "Usuário verificado",
      description: `${user.name} foi verificado e marcado como seguro.`,
    })
  }

  // Get risk level badge
  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Alto
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Médio
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Baixo
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Moderação de Usuários</h2>
          <p className="text-muted-foreground">Revise e modere usuários reportados ou com atividades suspeitas.</p>
        </div>
      </div>

      <Tabs
        defaultValue="reported"
        className="space-y-4"
        onValueChange={(value) => setViewMode(value as "reported" | "suspicious")}
      >
        <TabsList>
          <TabsTrigger value="reported" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>Usuários Reportados</span>
            <Badge variant="secondary" className="ml-1">
              {reportedUsers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="suspicious" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Atividades Suspeitas</span>
            <Badge variant="secondary" className="ml-1">
              {suspiciousUsers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={viewMode === "reported" ? "Buscar usuários reportados..." : "Buscar atividades suspeitas..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="reported" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Reportado por</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Nº Denúncias</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReportedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-medium bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                      >
                        {user.reportReason}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.reportedBy}</TableCell>
                    <TableCell>{formatDate(user.reportDate)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.reportCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleWarnUser(user)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Enviar aviso
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user)}>
                            <Lock className="mr-2 h-4 w-4" />
                            Suspender temporariamente
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleBanUser(user)} className="text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            Banir permanentemente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReportedUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum usuário reportado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="suspicious" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Atividade Suspeita</TableHead>
                  <TableHead>Nível de Risco</TableHead>
                  <TableHead>Detectado em</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuspiciousUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {user.suspiciousActivity}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRiskLevelBadge(user.riskLevel)}</TableCell>
                    <TableCell>{formatDate(user.detectedDate)}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleVerifyUser(user)} title="Verificar">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSuspendUser(user)} title="Suspender">
                          <Lock className="h-4 w-4 text-amber-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)} title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSuspiciousUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhuma atividade suspeita encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Usuário</CardTitle>
            <CardDescription>
              {viewMode === "reported"
                ? "Informações sobre o usuário reportado"
                : "Informações sobre atividade suspeita"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/4">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedUser.image || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback className="text-2xl">
                      {selectedUser.name
                        .split(" ")
                        .map((name: string) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">ID</h4>
                    <p>{selectedUser.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Papel</h4>
                    <Badge variant="outline" className="font-medium">
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {selectedUser.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Última Atividade</h4>
                    <p>{selectedUser.lastActive}</p>
                  </div>
                </div>
                {viewMode === "reported" ? (
                  <div className="space-y-2 rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-destructive" />
                      <h4 className="font-medium">Informações da Denúncia</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Motivo</h4>
                        <p>{selectedUser.reportReason}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Reportado por</h4>
                        <p>{selectedUser.reportedBy}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
                        <p>{formatDate(selectedUser.reportDate)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Nº Denúncias</h4>
                        <Badge variant="secondary">{selectedUser.reportCount}</Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <h4 className="font-medium">Informações da Atividade Suspeita</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Atividade</h4>
                        <p>{selectedUser.suspiciousActivity}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Nível de Risco</h4>
                        <div>{getRiskLevelBadge(selectedUser.riskLevel)}</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Detectado em</h4>
                        <p>{formatDate(selectedUser.detectedDate)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Fechar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleWarnUser(selectedUser)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar Aviso
              </Button>
              {viewMode === "reported" ? (
                <Button variant="destructive" onClick={() => handleBanUser(selectedUser)}>
                  <UserX className="mr-2 h-4 w-4" />
                  Banir Usuário
                </Button>
              ) : (
                <Button variant="destructive" onClick={() => handleSuspendUser(selectedUser)}>
                  <Lock className="mr-2 h-4 w-4" />
                  Suspender Conta
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
