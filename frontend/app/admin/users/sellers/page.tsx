"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ReportLayout } from "@/components/admin/report-layout"
import { DataTable } from "@/components/admin/data-table"
import { SellerDetailsDialog } from "@/components/admin/sellers/seller-details-dialog"
import { SellerEditForm } from "@/components/admin/sellers/seller-edit-form"
import { SellerDeleteDialog } from "@/components/admin/sellers/seller-delete-dialog"
import { SellerPerformanceDialog } from "@/components/admin/sellers/seller-performance-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, BarChart, Check, Edit, Eye, MoreHorizontal, Shield, Star, Trash2, UserX } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for sellers
const mockSellers = [
  {
    id: "s1",
    name: "Maria Silva",
    email: "maria.silva@exemplo.com",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    status: "active",
    rating: 4.8,
    productsCount: 47,
    salesCount: 215,
    revenue: 12450.75,
    joinDate: new Date("2022-03-15"),
    lastActive: new Date("2023-05-01T14:30:00"),
    verificationStatus: "verified",
    hasDisputes: false,
  },
  {
    id: "s2",
    name: "João Santos",
    email: "joao.santos@exemplo.com",
    phone: "(21) 97654-3210",
    location: "Rio de Janeiro, RJ",
    status: "active",
    rating: 4.5,
    productsCount: 32,
    salesCount: 178,
    revenue: 9870.5,
    joinDate: new Date("2022-05-20"),
    lastActive: new Date("2023-05-02T10:15:00"),
    verificationStatus: "verified",
    hasDisputes: true,
  },
  {
    id: "s3",
    name: "Ana Oliveira",
    email: "ana.oliveira@exemplo.com",
    phone: "(31) 96543-2109",
    location: "Belo Horizonte, MG",
    status: "inactive",
    rating: 4.2,
    productsCount: 15,
    salesCount: 87,
    revenue: 4320.25,
    joinDate: new Date("2022-08-10"),
    lastActive: new Date("2023-04-15T09:45:00"),
    verificationStatus: "pending",
    hasDisputes: false,
  },
  {
    id: "s4",
    name: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    phone: "(41) 95432-1098",
    location: "Curitiba, PR",
    status: "suspended",
    rating: 3.7,
    productsCount: 28,
    salesCount: 132,
    revenue: 6540.8,
    joinDate: new Date("2022-06-05"),
    lastActive: new Date("2023-03-20T16:20:00"),
    verificationStatus: "rejected",
    hasDisputes: true,
  },
  {
    id: "s5",
    name: "Fernanda Lima",
    email: "fernanda.lima@exemplo.com",
    phone: "(51) 94321-0987",
    location: "Porto Alegre, RS",
    status: "active",
    rating: 4.9,
    productsCount: 53,
    salesCount: 245,
    revenue: 15780.3,
    joinDate: new Date("2022-02-18"),
    lastActive: new Date("2023-05-03T11:10:00"),
    verificationStatus: "verified",
    hasDisputes: false,
  },
  {
    id: "s6",
    name: "Ricardo Souza",
    email: "ricardo.souza@exemplo.com",
    phone: "(81) 93210-9876",
    location: "Recife, PE",
    status: "active",
    rating: 4.6,
    productsCount: 41,
    salesCount: 198,
    revenue: 10230.45,
    joinDate: new Date("2022-04-25"),
    lastActive: new Date("2023-05-01T13:25:00"),
    verificationStatus: "verified",
    hasDisputes: false,
  },
  {
    id: "s7",
    name: "Juliana Costa",
    email: "juliana.costa@exemplo.com",
    phone: "(62) 92109-8765",
    location: "Goiânia, GO",
    status: "inactive",
    rating: 4.0,
    productsCount: 22,
    salesCount: 105,
    revenue: 5120.7,
    joinDate: new Date("2022-07-12"),
    lastActive: new Date("2023-04-10T15:40:00"),
    verificationStatus: "pending",
    hasDisputes: true,
  },
  {
    id: "s8",
    name: "Marcos Almeida",
    email: "marcos.almeida@exemplo.com",
    phone: "(71) 91098-7654",
    location: "Salvador, BA",
    status: "active",
    rating: 4.7,
    productsCount: 38,
    salesCount: 187,
    revenue: 9870.15,
    joinDate: new Date("2022-05-08"),
    lastActive: new Date("2023-05-02T09:30:00"),
    verificationStatus: "verified",
    hasDisputes: false,
  },
  {
    id: "s9",
    name: "Patrícia Ferreira",
    email: "patricia.ferreira@exemplo.com",
    phone: "(85) 90987-6543",
    location: "Fortaleza, CE",
    status: "suspended",
    rating: 3.5,
    productsCount: 19,
    salesCount: 95,
    revenue: 4750.6,
    joinDate: new Date("2022-09-15"),
    lastActive: new Date("2023-03-05T14:15:00"),
    verificationStatus: "rejected",
    hasDisputes: true,
  },
  {
    id: "s10",
    name: "Lucas Martins",
    email: "lucas.martins@exemplo.com",
    phone: "(91) 89876-5432",
    location: "Belém, PA",
    status: "active",
    rating: 4.4,
    productsCount: 27,
    salesCount: 142,
    revenue: 7890.35,
    joinDate: new Date("2022-06-30"),
    lastActive: new Date("2023-05-01T10:50:00"),
    verificationStatus: "verified",
    hasDisputes: false,
  },
]

export default function SellersPage() {
  const router = useRouter()
  const [sellers, setSellers] = useState(mockSellers)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState<any>(null)

  // Dialog states
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPerformanceDialog, setShowPerformanceDialog] = useState(false)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)

  // Filter handlers
  const handleFilterChange = (filterType: string, value: string) => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      if (value === "all") {
        setSellers(mockSellers)
      } else {
        const filtered = mockSellers.filter((seller) => {
          if (filterType === "status") return seller.status === value
          if (filterType === "verification") return seller.verificationStatus === value
          if (filterType === "disputes") return value === "yes" ? seller.hasDisputes : !seller.hasDisputes
          return true
        })
        setSellers(filtered)
      }
      setIsLoading(false)
    }, 500)
  }

  // Date range handler
  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const filtered = mockSellers.filter((seller) => seller.joinDate >= range.from && seller.joinDate <= range.to)
      setSellers(filtered)
      setIsLoading(false)
    }, 500)
  }

  // Export handler
  const handleExport = (format: string) => {
    console.log(`Exporting sellers in ${format} format`)
    // Implementation would go here
  }

  // Refresh handler
  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      setSellers(mockSellers)
      setIsLoading(false)
    }, 500)
  }

  // Action handlers
  const handleViewDetails = (seller: any) => {
    setSelectedSeller(seller)
    setShowDetailsDialog(true)
  }

  const handleEditSeller = (seller: any) => {
    setSelectedSeller(seller)
    setShowEditDialog(true)
  }

  const handleDeleteSeller = (seller: any) => {
    setSelectedSeller(seller)
    setShowDeleteDialog(true)
  }

  const handleViewPerformance = (seller: any) => {
    setSelectedSeller(seller)
    setShowPerformanceDialog(true)
  }

  const handleVerification = (seller: any) => {
    setSelectedSeller(seller)
    setShowVerificationDialog(true)
  }

  const confirmDeleteSeller = () => {
    if (!selectedSeller) return

    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      setSellers(sellers.filter((s) => s.id !== selectedSeller.id))
      setShowDeleteDialog(false)
      setSelectedSeller(null)
      setIsLoading(false)
    }, 500)
  }

  const updateSellerStatus = (sellerId: string, newStatus: string) => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      setSellers(sellers.map((seller) => (seller.id === sellerId ? { ...seller, status: newStatus } : seller)))
      setIsLoading(false)
    }, 500)
  }

  // Table columns definition
  const columns = [
    {
      accessorKey: "name",
      header: "Vendedor",
      cell: ({ row }: any) => {
        const seller = row.original
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{seller.name}</div>
            {seller.verificationStatus === "verified" && (
              <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 border-green-200">
                <Check className="mr-1 h-3 w-3" />
                Verificado
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "location",
      header: "Localização",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status

        const statusMap: Record<
          string,
          { label: string; variant: "default" | "outline" | "secondary" | "destructive" }
        > = {
          active: { label: "Ativo", variant: "default" },
          inactive: { label: "Inativo", variant: "secondary" },
          suspended: { label: "Suspenso", variant: "destructive" },
        }

        const { label, variant } = statusMap[status] || { label: status, variant: "outline" }

        return <Badge variant={variant}>{label}</Badge>
      },
    },
    {
      accessorKey: "rating",
      header: "Avaliação",
      cell: ({ row }: any) => {
        const rating = row.original.rating
        return (
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "productsCount",
      header: "Produtos",
      cell: ({ row }: any) => row.original.productsCount,
    },
    {
      accessorKey: "salesCount",
      header: "Vendas",
      cell: ({ row }: any) => row.original.salesCount,
    },
    {
      accessorKey: "revenue",
      header: "Receita",
      cell: ({ row }: any) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(row.original.revenue)
      },
    },
    {
      accessorKey: "joinDate",
      header: "Data de Cadastro",
      cell: ({ row }: any) => format(row.original.joinDate, "dd/MM/yyyy", { locale: ptBR }),
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const seller = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewDetails(seller)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditSeller(seller)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewPerformance(seller)}>
                <BarChart className="mr-2 h-4 w-4" />
                Desempenho
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => updateSellerStatus(seller.id, "active")}
                disabled={seller.status === "active"}
              >
                <Check className="mr-2 h-4 w-4" />
                Ativar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateSellerStatus(seller.id, "inactive")}
                disabled={seller.status === "inactive"}
              >
                <UserX className="mr-2 h-4 w-4" />
                Desativar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateSellerStatus(seller.id, "suspended")}
                disabled={seller.status === "suspended"}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Suspender
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleVerification(seller)} className="text-blue-600">
                <Shield className="mr-2 h-4 w-4" />
                Verificação
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteSeller(seller)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <ReportLayout
        title="Gerenciamento de Vendedores"
        description="Visualize, edite e gerencie as contas de vendedores da plataforma"
        exportOptions={["Excel", "CSV", "PDF"]}
        filterOptions={{
          userTypes: false,
          categories: false,
          status: true,
        }}
        viewOptions={["Tabela", "Cards"]}
        onDateRangeChange={handleDateRangeChange}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        isLoading={isLoading}
      >
        <DataTable
          columns={columns}
          data={sellers}
          searchColumn="name"
          searchPlaceholder="Buscar por nome do vendedor..."
        />
      </ReportLayout>

      {/* Seller Details Dialog */}
      {selectedSeller && (
        <SellerDetailsDialog
          seller={selectedSeller}
          open={showDetailsDialog}
          onClose={() => setShowDetailsDialog(false)}
        />
      )}

      {/* Seller Edit Dialog */}
      {selectedSeller && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Vendedor</DialogTitle>
              <DialogDescription>Atualize as informações do vendedor no formulário abaixo.</DialogDescription>
            </DialogHeader>
            <SellerEditForm
              seller={selectedSeller}
              onSave={(updatedSeller) => {
                setSellers(sellers.map((s) => (s.id === updatedSeller.id ? updatedSeller : s)))
                setShowEditDialog(false)
              }}
              onCancel={() => setShowEditDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Seller Delete Dialog */}
      {selectedSeller && (
        <SellerDeleteDialog
          seller={selectedSeller}
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDeleteSeller}
          isLoading={isLoading}
        />
      )}

      {/* Seller Performance Dialog */}
      {selectedSeller && (
        <SellerPerformanceDialog
          seller={selectedSeller}
          open={showPerformanceDialog}
          onClose={() => setShowPerformanceDialog(false)}
        />
      )}

      {/* Verification Dialog */}
      {selectedSeller && (
        <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verificação de Vendedor</DialogTitle>
              <DialogDescription>Gerencie o status de verificação deste vendedor.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status atual:</h3>
                <div className="flex items-center">
                  {selectedSeller.verificationStatus === "verified" ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Check className="mr-1 h-3 w-3" />
                      Verificado
                    </Badge>
                  ) : selectedSeller.verificationStatus === "pending" ? (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      Pendente
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Rejeitado</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ações disponíveis:</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      // Update verification status logic would go here
                      setShowVerificationDialog(false)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar Verificação
                  </Button>

                  <Button
                    variant="outline"
                    className="border-red-500 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      // Reject verification logic would go here
                      setShowVerificationDialog(false)
                    }}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Rejeitar Verificação
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Solicitar documentação adicional:</h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Request additional documentation logic would go here
                    setShowVerificationDialog(false)
                  }}
                >
                  Solicitar Documentos
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
