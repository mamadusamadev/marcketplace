"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, MessageCircle, Heart, Edit, Trash2, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Mock product data
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "iPhone 13 Pro Max - 256GB",
      price: 3499.99,
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
      views: 124,
      messages: 5,
      favorites: 12,
    },
    {
      id: "2",
      title: 'MacBook Pro 16" M1 Pro',
      price: 8999.99,
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
      views: 87,
      messages: 3,
      favorites: 8,
    },
    {
      id: "3",
      title: "AirPods Pro 2ª Geração",
      price: 1299.99,
      image: "/placeholder.svg?height=200&width=200",
      status: "sold",
      views: 56,
      messages: 2,
      favorites: 4,
    },
  ])

  const handleAddProduct = () => {
    router.push("/dashboard/adicionar-produto")
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
    setProductToDelete(null)
    toast({
      title: "Produto removido",
      description: "O produto foi removido com sucesso.",
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meus Produtos</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="sold">Vendidos</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((product) => product.status === "active")
              .map((product) => (
                <Card key={product.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
                    <CardDescription className="mt-1 text-lg font-bold text-emerald-600">
                      {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                    </CardDescription>

                    <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {product.views}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {product.messages}
                      </div>
                      <div className="flex items-center">
                        <Heart className="mr-1 h-4 w-4" />
                        {product.favorites}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/adicionar-produto?edit=${product.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                          onClick={() => setProductToDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Confirmar remoção
                          </DialogTitle>
                          <DialogDescription>
                            Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setProductToDelete(null)}>
                            Cancelar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
                          >
                            Remover
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="sold">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((product) => product.status === "sold")
              .map((product) => (
                <Card key={product.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Badge className="text-lg">VENDIDO</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
                    <CardDescription className="mt-1 text-lg font-bold text-emerald-600">
                      {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 pt-0">
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Republicar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="mb-4 text-muted-foreground">Você não tem nenhum rascunho de produto.</p>
            <Button onClick={handleAddProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Produto
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
