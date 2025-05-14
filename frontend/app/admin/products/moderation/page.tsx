"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  XCircle,
  Flag,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Shield,
  Filter,
} from "lucide-react"

// Mock data for reported products
const reportedProducts = [
  {
    id: "p1",
    name: "iPhone 13 Pro (Falsificado)",
    category: "Eletrônicos",
    price: "R$ 1.999,00",
    status: "pending",
    seller: "Tech_Deals",
    image: "/diverse-products-still-life.png",
    reportReason: "Produto falsificado/contrafação",
    reportedBy: "Maria Oliveira",
    reportDate: "2023-05-15T10:30:00Z",
    reportCount: 3,
  },
  {
    id: "p2",
    name: "Tênis Nike Air Max (Réplica)",
    category: "Moda",
    price: "R$ 199,90",
    status: "pending",
    seller: "Sneaker_World",
    image: "/diverse-products-still-life.png",
    reportReason: "Produto falsificado/contrafação",
    reportedBy: "João Silva",
    reportDate: "2023-05-14T14:20:00Z",
    reportCount: 2,
  },
  {
    id: "p3",
    name: "Conteúdo Adulto Explícito",
    category: "Livros",
    price: "R$ 49,90",
    status: "pending",
    seller: "Book_Store",
    image: "/diverse-products-still-life.png",
    reportReason: "Conteúdo inadequado/adulto",
    reportedBy: "Ana Pereira",
    reportDate: "2023-05-13T09:15:00Z",
    reportCount: 5,
  },
  {
    id: "p4",
    name: "Medicamento sem Receita",
    category: "Saúde",
    price: "R$ 129,00",
    status: "pending",
    seller: "Health_Shop",
    image: "/diverse-products-still-life.png",
    reportReason: "Produto ilegal/proibido",
    reportedBy: "Carlos Santos",
    reportDate: "2023-05-12T16:45:00Z",
    reportCount: 4,
  },
  {
    id: "p5",
    name: "Serviço de Hacking",
    category: "Serviços",
    price: "R$ 500,00",
    status: "pending",
    seller: "Tech_Services",
    image: "/diverse-products-still-life.png",
    reportReason: "Serviço ilegal",
    reportedBy: "Roberto Almeida",
    reportDate: "2023-05-11T11:30:00Z",
    reportCount: 6,
  },
]

// Mock data for pending approval products
const pendingProducts = [
  {
    id: "p6",
    name: "Smartphone Recondicionado",
    category: "Eletrônicos",
    price: "R$ 899,00",
    status: "pending",
    seller: "Refurb_Tech",
    image: "/diverse-products-still-life.png",
    submittedDate: "2023-05-15T08:30:00Z",
  },
  {
    id: "p7",
    name: "Coleção de Moedas Antigas",
    category: "Colecionáveis",
    price: "R$ 1.250,00",
    status: "pending",
    seller: "Coin_Collector",
    image: "/diverse-products-still-life.png",
    submittedDate: "2023-05-14T13:45:00Z",
  },
  {
    id: "p8",
    name: "Curso de Investimentos",
    category: "Cursos",
    price: "R$ 397,00",
    status: "pending",
    seller: "Finance_Guru",
    image: "/diverse-products-still-life.png",
    submittedDate: "2023-05-14T10:20:00Z",
  },
  {
    id: "p9",
    name: "Ingressos para Show",
    category: "Ingressos",
    price: "R$ 450,00",
    status: "pending",
    seller: "Ticket_Master",
    image: "/diverse-products-still-life.png",
    submittedDate: "2023-05-13T16:10:00Z",
  },
  {
    id: "p10",
    name: "Consultoria Jurídica",
    category: "Serviços",
    price: "R$ 300,00",
    status: "pending",
    seller: "Legal_Advice",
    image: "/diverse-products-still-life.png",
    submittedDate: "2023-05-13T09:30:00Z",
  },
]

export default function ProductModerationPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"reported" | "pending">("reported")

  // Filter products based on search query and category
  const filteredReportedProducts = reportedProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.reportReason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === null || product.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const filteredPendingProducts = pendingProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === null || product.category === filterCategory

    return matchesSearch && matchesCategory
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
    }).format(date)
  }

  // Handle product approval
  const handleApproveProduct = (product: any) => {
    toast({
      title: "Produto aprovado",
      description: `${product.name} foi aprovado e publicado.`,
    })
  }

  // Handle product rejection
  const handleRejectProduct = (product: any) => {
    toast({
      title: "Produto rejeitado",
      description: `${product.name} foi rejeitado e não será publicado.`,
      variant: "destructive",
    })
  }

  // Handle product removal (for reported products)
  const handleRemoveProduct = (product: any) => {
    toast({
      title: "Produto removido",
      description: `${product.name} foi removido da plataforma.`,
      variant: "destructive",
    })
  }

  // Handle warning to seller
  const handleWarnSeller = (product: any) => {
    toast({
      title: "Aviso enviado",
      description: `Um aviso foi enviado para ${product.seller}.`,
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">
            <CheckCircle className="mr-1 h-3 w-3" />
            Aprovado
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
            <XCircle className="mr-1 h-3 w-3" />
            Rejeitado
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
          <h2 className="text-3xl font-bold tracking-tight">Moderação de Produtos</h2>
          <p className="text-muted-foreground">Revise e modere produtos reportados ou pendentes de aprovação.</p>
        </div>
      </div>

      <Tabs
        defaultValue="reported"
        className="space-y-4"
        onValueChange={(value) => setViewMode(value as "reported" | "pending")}
      >
        <TabsList>
          <TabsTrigger value="reported" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>Produtos Reportados</span>
            <Badge variant="secondary" className="ml-1">
              {reportedProducts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Pendentes de Aprovação</span>
            <Badge variant="secondary" className="ml-1">
              {pendingProducts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={viewMode === "reported" ? "Buscar produtos reportados..." : "Buscar produtos pendentes..."}
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
                  <TableHead>Produto</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Reportado por</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Nº Denúncias</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReportedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Vendedor: {product.seller}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-medium bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                      >
                        {product.reportReason}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.reportedBy}</TableCell>
                    <TableCell>{formatDate(product.reportDate)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.reportCount}</Badge>
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
                          <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleApproveProduct(product)}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Aprovar produto
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleWarnSeller(product)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Avisar vendedor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRemoveProduct(product)} className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Remover produto
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReportedProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum produto reportado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Data de Envio</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.seller}</TableCell>
                    <TableCell>{formatDate(product.submittedDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproveProduct(product)}
                          title="Aprovar"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRejectProduct(product)}
                          title="Rejeitar"
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedProduct(product)}
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPendingProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum produto pendente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Produto</CardTitle>
            <CardDescription>
              {viewMode === "reported"
                ? "Informações sobre o produto reportado"
                : "Informações sobre o produto pendente"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/3">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                  <p className="text-muted-foreground">ID: {selectedProduct.id}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Categoria</h4>
                    <p>{selectedProduct.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Preço</h4>
                    <p>{selectedProduct.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Vendedor</h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{selectedProduct.seller[0]}</AvatarFallback>
                      </Avatar>
                      <span>{selectedProduct.seller}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <div>{getStatusBadge(selectedProduct.status)}</div>
                  </div>
                </div>
                {viewMode === "reported" && (
                  <div className="space-y-2 rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-destructive" />
                      <h4 className="font-medium">Informações da Denúncia</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Motivo</h4>
                        <p>{selectedProduct.reportReason}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Reportado por</h4>
                        <p>{selectedProduct.reportedBy}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
                        <p>{formatDate(selectedProduct.reportDate)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Nº Denúncias</h4>
                        <Badge variant="secondary">{selectedProduct.reportCount}</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedProduct(null)}>
              Fechar
            </Button>
            <div className="flex gap-2">
              {viewMode === "reported" ? (
                <>
                  <Button variant="outline" onClick={() => handleWarnSeller(selectedProduct)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Avisar Vendedor
                  </Button>
                  <Button variant="destructive" onClick={() => handleRemoveProduct(selectedProduct)}>
                    <Shield className="mr-2 h-4 w-4" />
                    Remover Produto
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => handleRejectProduct(selectedProduct)}>
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Rejeitar
                  </Button>
                  <Button onClick={() => handleApproveProduct(selectedProduct)}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
