"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingBag, Truck, CheckCircle, XCircle, Clock, ChevronRight, Star, MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock orders data
const orders = [
  {
    id: "ORD-2023-001",
    date: "15/04/2023",
    product: {
      id: "1",
      title: "iPhone 13 Pro Max - 256GB - Grafite",
      price: 3499.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    seller: {
      id: "seller1",
      name: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "entregue",
    paymentMethod: "Cartão de Crédito",
    deliveryAddress: "Rua das Flores, 123, Lisboa",
    trackingNumber: "PT123456789",
    rated: true,
  },
  {
    id: "ORD-2023-002",
    date: "28/05/2023",
    product: {
      id: "2",
      title: 'MacBook Pro 16" M1 Pro - 16GB RAM - 512GB SSD',
      price: 8999.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    seller: {
      id: "seller2",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "em_andamento",
    paymentMethod: "Transferência Bancária",
    deliveryAddress: "Avenida da República, 45, Porto",
    trackingNumber: "PT987654321",
    rated: false,
  },
  {
    id: "ORD-2023-003",
    date: "10/06/2023",
    product: {
      id: "3",
      title: "AirPods Pro 2ª Geração - Brancos",
      price: 1299.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    seller: {
      id: "seller3",
      name: "Pedro Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "cancelado",
    paymentMethod: "PayPal",
    deliveryAddress: "Rua do Comércio, 78, Braga",
    trackingNumber: "",
    cancellationReason: "Produto indisponível",
    rated: false,
  },
]

export default function PurchasesPage() {
  const [selectedTab, setSelectedTab] = useState("todos")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [rating, setRating] = useState(0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_andamento":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
          >
            <Clock className="h-3 w-3" />
            Em andamento
          </Badge>
        )
      case "entregue":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
          >
            <CheckCircle className="h-3 w-3" />
            Entregue
          </Badge>
        )
      case "cancelado":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
          >
            <XCircle className="h-3 w-3" />
            Cancelado
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredOrders = selectedTab === "todos" ? orders : orders.filter((order) => order.status === selectedTab)

  const handleRateOrder = (orderId: string) => {
    // In a real app, you would send the rating to the API
    console.log(`Rating order ${orderId} with ${rating} stars`)
    setSelectedOrder(null)
    setRating(0)
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Minhas Compras</h2>

      <Tabs defaultValue="todos" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="em_andamento">Em andamento</TabsTrigger>
          <TabsTrigger value="entregue">Entregues</TabsTrigger>
          <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">Pedido {order.id}</CardTitle>
                    {getStatusBadge(order.status)}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.product.image || "/placeholder.svg"}
                          alt={order.product.title}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{order.product.title}</h3>
                          <p className="text-sm text-muted-foreground">Data: {order.date}</p>
                          <p className="font-bold text-emerald-600">
                            {order.product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                          </p>
                        </div>
                      </div>

                      <div className="ml-auto flex flex-col items-end justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Vendedor:</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={order.seller.avatar || "/placeholder.svg"} alt={order.seller.name} />
                              <AvatarFallback>{order.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{order.seller.name}</span>
                          </div>
                        </div>

                        {order.status === "em_andamento" && order.trackingNumber && (
                          <div className="flex items-center gap-1 text-sm text-blue-600">
                            <Truck className="h-4 w-4" />
                            <span>Rastreio: {order.trackingNumber}</span>
                          </div>
                        )}

                        {order.status === "cancelado" && order.cancellationReason && (
                          <div className="text-sm text-red-600">Motivo: {order.cancellationReason}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-end gap-2 border-t pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cliente/compras/${order.id}`}>
                        Detalhes
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>

                    {order.status === "entregue" && !order.rated && (
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order.id)}>
                        <Star className="mr-1 h-4 w-4" />
                        Avaliar
                      </Button>
                    )}

                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/cliente/mensagens?seller=${order.seller.name}&product=${order.product.id}`}>
                        <MessageCircle className="mr-1 h-4 w-4" />
                        Contactar Vendedor
                      </Link>
                    </Button>

                    {order.status === "em_andamento" && (
                      <Button size="sm">
                        <Truck className="mr-1 h-4 w-4" />
                        Rastrear Envio
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-medium">Nenhuma compra encontrada</h3>
              <p className="mb-6 text-muted-foreground">Você ainda não realizou nenhuma compra nesta categoria.</p>
              <Button asChild>
                <Link href="/produtos">Explorar Produtos</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Rating Dialog */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Avalie sua compra</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Como foi sua experiência com este produto?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="rounded-full p-1 transition-colors hover:bg-muted"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Cancelar
              </Button>
              <Button onClick={() => handleRateOrder(selectedOrder)} disabled={rating === 0}>
                Enviar Avaliação
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
