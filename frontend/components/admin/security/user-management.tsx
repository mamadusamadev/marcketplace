"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Download, Edit, Lock, MoreHorizontal, Plus, Search, Trash2, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for users
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    role: "Admin",
    status: "active",
    lastLogin: "2023-05-01T10:30:00",
    twoFactorEnabled: true,
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@exemplo.com",
    role: "Editor",
    status: "active",
    lastLogin: "2023-05-01T09:15:00",
    twoFactorEnabled: false,
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@exemplo.com",
    role: "Viewer",
    status: "inactive",
    lastLogin: "2023-04-28T14:20:00",
    twoFactorEnabled: false,
  },
  {
    id: 4,
    name: "Ana Pereira",
    email: "ana.pereira@exemplo.com",
    role: "Editor",
    status: "locked",
    lastLogin: "2023-04-25T11:45:00",
    twoFactorEnabled: true,
  },
  {
    id: 5,
    name: "Roberto Santos",
    email: "roberto.santos@exemplo.com",
    role: "Viewer",
    status: "active",
    lastLogin: "2023-05-01T08:30:00",
    twoFactorEnabled: false,
  },
]

// Mock data for roles
const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Acesso completo a todas as funcionalidades",
    users: 3,
    permissions: [
      "users.view",
      "users.create",
      "users.edit",
      "users.delete",
      "products.view",
      "products.create",
      "products.edit",
      "products.delete",
      "orders.view",
      "orders.create",
      "orders.edit",
      "orders.delete",
      "settings.view",
      "settings.edit",
    ],
  },
  {
    id: 2,
    name: "Editor",
    description: "Pode editar conteúdo mas não pode alterar configurações",
    users: 8,
    permissions: [
      "users.view",
      "products.view",
      "products.create",
      "products.edit",
      "orders.view",
      "orders.create",
      "orders.edit",
      "settings.view",
    ],
  },
  {
    id: 3,
    name: "Viewer",
    description: "Acesso somente leitura",
    users: 15,
    permissions: ["users.view", "products.view", "orders.view", "settings.view"],
  },
]

// Mock permissions grouped by category
const permissionGroups = [
  {
    name: "Usuários",
    permissions: [
      { id: "users.view", label: "Visualizar usuários" },
      { id: "users.create", label: "Criar usuários" },
      { id: "users.edit", label: "Editar usuários" },
      { id: "users.delete", label: "Excluir usuários" },
    ],
  },
  {
    name: "Produtos",
    permissions: [
      { id: "products.view", label: "Visualizar produtos" },
      { id: "products.create", label: "Criar produtos" },
      { id: "products.edit", label: "Editar produtos" },
      { id: "products.delete", label: "Excluir produtos" },
    ],
  },
  {
    name: "Pedidos",
    permissions: [
      { id: "orders.view", label: "Visualizar pedidos" },
      { id: "orders.create", label: "Criar pedidos" },
      { id: "orders.edit", label: "Editar pedidos" },
      { id: "orders.delete", label: "Excluir pedidos" },
    ],
  },
  {
    name: "Configurações",
    permissions: [
      { id: "settings.view", label: "Visualizar configurações" },
      { id: "settings.edit", label: "Editar configurações" },
    ],
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("users")

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
      case "inactive":
        return <Badge variant="warning">Inativo</Badge>
      case "locked":
        return <Badge variant="destructive">Bloqueado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="roles">Funções</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Novo Usuário
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                      <DialogDescription>Preencha os detalhes para criar um novo usuário no sistema.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Nome</FormLabel>
                        <Input className="col-span-3" placeholder="Nome completo" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Email</FormLabel>
                        <Input className="col-span-3" type="email" placeholder="email@exemplo.com" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Função</FormLabel>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione uma função" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Senha</FormLabel>
                        <Input className="col-span-3" type="password" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Confirmar Senha</FormLabel>
                        <Input className="col-span-3" type="password" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <div className="col-span-3 flex items-center space-x-2">
                          <Checkbox id="2fa" />
                          <label
                            htmlFor="2fa"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Exigir autenticação de dois fatores (2FA)
                          </label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Criar Usuário</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>Gerencie usuários, funções e permissões do sistema</CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuários..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Filtrar
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Todos os usuários</DropdownMenuItem>
                    <DropdownMenuItem>Administradores</DropdownMenuItem>
                    <DropdownMenuItem>Editores</DropdownMenuItem>
                    <DropdownMenuItem>Visualizadores</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ativos</DropdownMenuItem>
                    <DropdownMenuItem>Inativos</DropdownMenuItem>
                    <DropdownMenuItem>Bloqueados</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead>2FA</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell>
                        {user.twoFactorEnabled ? (
                          <Badge variant="success">Ativado</Badge>
                        ) : (
                          <Badge variant="outline">Desativado</Badge>
                        )}
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Redefinir senha
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{filteredUsers.length}</strong> de <strong>{users.length}</strong> usuários
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Funções e Permissões</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Função
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Criar Nova Função</DialogTitle>
                      <DialogDescription>Defina um nome e as permissões para a nova função.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Nome</FormLabel>
                        <Input className="col-span-3" placeholder="Nome da função" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Descrição</FormLabel>
                        <Input className="col-span-3" placeholder="Descrição da função" />
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <FormLabel className="text-right pt-2">Permissões</FormLabel>
                        <div className="col-span-3 space-y-4">
                          {permissionGroups.map((group) => (
                            <div key={group.name} className="space-y-2">
                              <h4 className="font-medium">{group.name}</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {group.permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox id={permission.id} />
                                    <label
                                      htmlFor={permission.id}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {permission.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Criar Função</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>Gerencie as funções e suas permissões no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Permissões</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.permissions.length}</Badge>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
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
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissões do Sistema</CardTitle>
              <CardDescription>Visualize todas as permissões disponíveis no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="space-y-2">
                    <h3 className="text-lg font-medium">{group.name}</h3>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">{permission.label}</p>
                            <p className="text-sm text-muted-foreground">{permission.id}</p>
                          </div>
                          <Badge variant="outline">{group.name.toLowerCase()}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
