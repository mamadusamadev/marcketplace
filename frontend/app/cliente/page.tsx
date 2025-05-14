import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, MessageCircle, ShoppingBag, Bell, Search, Tag, TrendingUp } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    type: "view",
    product: "iPhone 13 Pro Max - 256GB",
    time: "Há 2 horas",
  },
  {
    type: "favorite",
    product: 'MacBook Pro 16" M1 Pro',
    time: "Há 1 dia",
  },
  {
    type: "message",
    product: "AirPods Pro 2ª Geração",
    seller: "Maria Santos",
    time: "Há 3 dias",
  },
]

// Mock data for recommended products
const recommendedProducts = [
  {
    id: "1",
    title: "Samsung Galaxy S23 Ultra - 512GB",
    price: 2999.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    title: "iPad Air 5ª Geração - 256GB",
    price: 1899.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 - Fones de Ouvido",
    price: 799.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ClientDashboardPage() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Bem-vindo ao seu Painel</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/cliente/favoritos">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Produtos salvos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/mensagens">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
              <MessageCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Conversas ativas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/compras">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compras</CardTitle>
              <ShoppingBag className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Pedidos realizados</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/notificacoes">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notificações</CardTitle>
              <Bell className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Novas notificações</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Suas interações mais recentes na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-full bg-muted p-2">
                    {activity.type === "view" && <Search className="h-4 w-4 text-blue-500" />}
                    {activity.type === "favorite" && <Heart className="h-4 w-4 text-red-500" />}
                    {activity.type === "message" && <MessageCircle className="h-4 w-4 text-emerald-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.type === "view" && "Você visualizou"}
                      {activity.type === "favorite" && "Você adicionou aos favoritos"}
                      {activity.type === "message" && `Você conversou com ${activity.seller} sobre`}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.product}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
              Ver todo histórico
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendados para Você</CardTitle>
            <CardDescription>Com base no seu histórico de navegação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{product.title}</p>
                    <p className="text-sm font-bold text-emerald-600">
                      {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
              <Tag className="mr-2 h-4 w-4" />
              Ver mais produtos
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tendências de Mercado</CardTitle>
          <CardDescription>Categorias populares nesta semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Tecnologia</div>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">+15% de visualizações</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Moda</div>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">+8% de visualizações</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Casa e Jardim</div>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">+12% de visualizações</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
