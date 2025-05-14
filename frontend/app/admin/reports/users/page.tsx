"use client"

import { useState } from "react"
import { ReportLayout } from "@/components/admin/report-layout"
import { DataTable } from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReportSummaryCards } from "@/components/admin/report-summary-cards"
import { Users, UserRound, UserCheck, UserX } from "lucide-react"

// Column definition for the users table
const columns = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const email = row.original.email as string
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${initials}`} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Função",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "admin" ? "destructive" : role === "seller" ? "default" : "secondary"}>
          {role === "admin" ? "Administrador" : role === "seller" ? "Vendedor" : "Cliente"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "success" : status === "pending" ? "warning" : "outline"}>
          {status === "active" ? "Ativo" : status === "pending" ? "Pendente" : "Inativo"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "joined",
    header: "Registrado em",
  },
  {
    accessorKey: "lastActive",
    header: "Última atividade",
  },
]

// Mock data for the users table
const data = [
  {
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "customer",
    status: "active",
    joined: "12/01/2023",
    lastActive: "Hoje, 10:45",
  },
  {
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "seller",
    status: "active",
    joined: "05/03/2023",
    lastActive: "Hoje, 09:30",
  },
  {
    name: "Pedro Santos",
    email: "pedro.santos@example.com",
    role: "customer",
    status: "inactive",
    joined: "20/04/2023",
    lastActive: "15/04/2023",
  },
  {
    name: "Ana Costa",
    email: "ana.costa@example.com",
    role: "customer",
    status: "active",
    joined: "08/02/2023",
    lastActive: "Ontem, 16:20",
  },
  {
    name: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    role: "seller",
    status: "pending",
    joined: "01/05/2023",
    lastActive: "Hoje, 08:15",
  },
  {
    name: "Mariana Lima",
    email: "mariana.lima@example.com",
    role: "admin",
    status: "active",
    joined: "10/12/2022",
    lastActive: "Hoje, 11:05",
  },
  {
    name: "Rafael Alves",
    email: "rafael.alves@example.com",
    role: "customer",
    status: "active",
    joined: "15/03/2023",
    lastActive: "Ontem, 14:30",
  },
  {
    name: "Juliana Martins",
    email: "juliana.martins@example.com",
    role: "customer",
    status: "inactive",
    joined: "22/02/2023",
    lastActive: "10/04/2023",
  },
  {
    name: "Fernando Gomes",
    email: "fernando.gomes@example.com",
    role: "seller",
    status: "active",
    joined: "30/01/2023",
    lastActive: "Hoje, 07:50",
  },
  {
    name: "Luciana Pereira",
    email: "luciana.pereira@example.com",
    role: "customer",
    status: "active",
    joined: "18/03/2023",
    lastActive: "Ontem, 18:10",
  },
]

export default function UsersReportPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const metrics = [
    {
      title: "Total de Usuários",
      value: "1,248",
      description: "Todos os usuários registrados",
      icon: <Users className="h-4 w-4" />,
      trend: "up",
      trendValue: "+12.5%",
    },
    {
      title: "Clientes",
      value: "1,086",
      description: "Usuários compradores",
      icon: <UserRound className="h-4 w-4" />,
      trend: "up",
      trendValue: "+10.3%",
    },
    {
      title: "Vendedores",
      value: "142",
      description: "Usuários vendedores",
      icon: <UserCheck className="h-4 w-4" />,
      trend: "up",
      trendValue: "+18.7%",
    },
    {
      title: "Inativos",
      value: "24",
      description: "Usuários sem atividade",
      icon: <UserX className="h-4 w-4" />,
      trend: "down",
      trendValue: "-5.2%",
    },
  ]

  return (
    <div className="space-y-6">
      <ReportLayout
        title="Relatório de Usuários"
        description="Análise detalhada de todos os usuários da plataforma"
        filterOptions={{
          userTypes: true,
          status: true,
        }}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      >
        <div className="space-y-6">
          <ReportSummaryCards metrics={metrics} />

          <DataTable
            columns={columns}
            data={data}
            searchColumn="name"
            searchPlaceholder="Buscar por nome ou email..."
          />
        </div>
      </ReportLayout>
    </div>
  )
}
