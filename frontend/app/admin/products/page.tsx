"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, MoreHorizontal, CheckCircle, XCircle, AlertTriangle, ImagePlus } from "lucide-react"

// Mock data for products
const products = [
  {
    id: "p1",
    name: "iPhone 13 Pro",
    category: "Eletrônicos",
    price: "R$ 6.999,00",
    status: "active",
    seller: "Tech Store",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p2",
    name: "Tênis Nike Air Max",
    category: "Moda",
    price: "R$ 899,90",
    status: "active",
    seller: "Sports Shop",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p3",
    name: "Sofá 3 Lugares",
    category: "Casa",
    price: "R$ 2.499,00",
    status: "inactive",
    seller: "Home Decor",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p4",
    name: "Bicicleta Mountain Bike",
    category: "Esportes",
    price: "R$ 1.899,00",
    status: "active",
    seller: "Bike World",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p5",
    name: "Notebook Dell Inspiron",
    category: "Eletrônicos",
    price: "R$ 4.299,00",
    status: "active",
    seller: "Tech Store",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p6",
    name: "Vestido Floral",
    category: "Moda",
    price: "R$ 159,90",
    status: "active",
    seller: "Fashion Shop",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p7",
    name: "Mesa de Jantar",
    category: "Casa",
    price: "R$ 1.299,00",
    status: "inactive",
    seller: "Home Decor",
    image: "/diverse-products-still-life.png",
  },
  {
    id: "p8",
    name: "Raquete de Tênis",
    category: "Esportes",
    price: "R$ 399,90",
    status: "active",
    seller: "Sports Shop",
    image: "/diverse-products-still-life.png",
  },
]

// Available categories
const categories = ["Tecnologia", "Casa e Jardim", "Moda", "Veículos", "Esportes", "Jogos"]

// Available statuses
const statuses = ["active", "pending", "inactive"]

export default function ProductsPage() {
  const { toast } = useToast()
  const [productsState, setProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "Tecnologia",
    subcategory: "",
    condition: "Novo",
    status: "active",
    featured: false,
    seller: "",
    location: "",
  })

  // Filter products based on search query, category, and status
  const filteredProducts = productsState.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === null || product.category === selectedCategory
    const matchesStatus = selectedStatus === null || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
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

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })
  }

  // Handle product creation
  const handleCreateProduct = () => {
    const id = (productsState.length + 1).toString()
    const createdAt = new Date().toISOString()
    const newProductWithId = {
      ...newProduct,
      id,
      price: Number.parseFloat(newProduct.price),
      createdAt,
      image: "/placeholder.svg?height=80&width=80",
    }

    setProducts([...productsState, newProductWithId])
    setIsCreateDialogOpen(false)
    setNewProduct({
 
      title: "",
      price: "",
      category: "Tecnologia",
      subcategory: "",
      condition: "Novo",
      status: "active",
      featured: false,
      seller: "",
      location: "",
    })

    toast({
      title: "Produto criado",
      description: `${newProduct.title} foi adicionado com sucesso.`,
    })
  }

  // Handle product update
  const handleUpdateProduct = () => {
    if (!selectedProduct) return

    setProducts(productsState.map((product) => (product.id === selectedProduct.id ? selectedProduct : product)))
    setIsEditDialogOpen(false)

    toast({
      title: "Produto atualizado",
      description: `${selectedProduct.title} foi atualizado com sucesso.`,
    })
  }

  // Handle product deletion
  const handleDeleteProduct = () => {
    if (!selectedProduct) return

    setProducts(productsState.filter((product) => product.id !== selectedProduct.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Produto removido",
      description: `${selectedProduct.title} foi removido com sucesso.`,
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">
            <CheckCircle className="mr-1 h-3 w-3" />
            Ativo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
            <XCircle className="mr-1 h-3 w-3" />
            Inativo
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
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
          <p className="text-muted-foreground">Gerencie os produtos da plataforma.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            defaultValue="all"
            value={selectedCategory || "all"}
            onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue="all"
            value={selectedStatus || "all"}
            onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
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
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">{getStatusBadge(product.status)}</div>
                </TableCell>
                <TableCell>{product.seller}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Editar produto
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-rose-500"
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Remover produto
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Product Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar Novo Produto</DialogTitle>
            <DialogDescription>Preencha os dados para criar um novo produto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                placeholder="Título do produto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">Condição</Label>
                <Select
                  value={newProduct.condition}
                  onValueChange={(value) => setNewProduct({ ...newProduct, condition: value })}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Selecione uma condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Usado - Como Novo">Usado - Como Novo</SelectItem>
                    <SelectItem value="Usado - Bom">Usado - Bom</SelectItem>
                    <SelectItem value="Usado - Aceitável">Usado - Aceitável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subcategory">Subcategoria</Label>
                <Input
                  id="subcategory"
                  value={newProduct.subcategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                  placeholder="Subcategoria"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="seller">Vendedor</Label>
                <Input
                  id="seller"
                  value={newProduct.seller}
                  onChange={(e) => setNewProduct({ ...newProduct, seller: e.target.value })}
                  placeholder="Nome do vendedor"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                  placeholder="Localização"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newProduct.status}
                onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={newProduct.featured}
                onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: !!checked })}
              />
              <Label htmlFor="featured">Produto destacado</Label>
            </div>
            <div className="grid gap-2">
              <Label>Imagem do Produto</Label>
              <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <span>Clique para adicionar imagem</span>
                  <span className="text-xs">ou arraste e solte</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateProduct} disabled={!newProduct.title || !newProduct.price}>
              Criar Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Atualize os dados do produto.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={selectedProduct.title}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Preço (€)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, price: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-condition">Condição</Label>
                  <Select
                    value={selectedProduct.condition}
                    onValueChange={(value) => setSelectedProduct({ ...selectedProduct, condition: value })}
                  >
                    <SelectTrigger id="edit-condition">
                      <SelectValue placeholder="Selecione uma condição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Usado - Como Novo">Usado - Como Novo</SelectItem>
                      <SelectItem value="Usado - Bom">Usado - Bom</SelectItem>
                      <SelectItem value="Usado - Aceitável">Usado - Aceitável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Categoria</Label>
                  <Select
                    value={selectedProduct.category}
                    onValueChange={(value) => setSelectedProduct({ ...selectedProduct, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-subcategory">Subcategoria</Label>
                  <Input
                    id="edit-subcategory"
                    value={selectedProduct.subcategory}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, subcategory: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedProduct.status}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-featured"
                  checked={selectedProduct.featured}
                  onCheckedChange={(checked) => setSelectedProduct({ ...selectedProduct, featured: !!checked })}
                />
                <Label htmlFor="edit-featured">Produto destacado</Label>
              </div>
              <div className="grid gap-2">
                <Label>Imagem do Produto</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <Button variant="outline" size="sm">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Alterar Imagem
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateProduct}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <div className="font-medium">{selectedProduct.title}</div>
                  <div className="text-sm text-muted-foreground">{formatPrice(selectedProduct.price)}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
