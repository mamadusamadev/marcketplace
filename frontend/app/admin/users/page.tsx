import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Search } from "lucide-react"

// Mock data for users
const users = [
  {
    id: "u1",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "Cliente",
    status: "active",
    lastActive: "Há 5 minutos",
    image: "/diverse-avatars.png",
  },
  {
    id: "u2",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "Vendedor",
    status: "active",
    lastActive: "Há 2 horas",
    image: "/diverse-avatars.png",
  },
  {
    id: "u3",
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    role: "Cliente",
    status: "inactive",
    lastActive: "Há 3 dias",
    image: "/diverse-avatars.png",
  },
  {
    id: "u4",
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    role: "Vendedor",
    status: "suspended",
    lastActive: "Há 1 semana",
    image: "/diverse-avatars.png",
  },
  {
    id: "u5",
    name: "Roberto Almeida",
    email: "roberto.almeida@example.com",
    role: "Admin",
    status: "active",
    lastActive: "Agora",
    image: "/diverse-avatars.png",
  },
  {
    id: "u6",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    role: "Cliente",
    status: "active",
    lastActive: "Há 30 minutos",
    image: "/diverse-avatars.png",
  },
  {
    id: "u7",
    name: "Ricardo Souza",
    email: "ricardo.souza@example.com",
    role: "Vendedor",
    status: "active",
    lastActive: "Há 1 hora",
    image: "/diverse-avatars.png",
  },
  {
    id: "u8",
    name: "Juliana Costa",
    email: "juliana.costa@example.com",
    role: "Cliente",
    status: "inactive",
    lastActive: "Há 5 dias",
    image: "/diverse-avatars.png",
  },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
          <p className="text-muted-foreground">Gerencie os usuários da plataforma.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar usuários..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os papéis</SelectItem>
              <SelectItem value="client">Cliente</SelectItem>
              <SelectItem value="seller">Vendedor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Atividade</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
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
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        user.status === "active"
                          ? "bg-emerald-500"
                          : user.status === "inactive"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                    />
                    <span className="capitalize">
                      {user.status === "active" ? "Ativo" : user.status === "inactive" ? "Inativo" : "Suspenso"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
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
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar usuário</DropdownMenuItem>
                      <DropdownMenuItem className="text-rose-500">Suspender usuário</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
