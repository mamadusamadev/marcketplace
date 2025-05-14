import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock favorite products data
const favoriteProducts = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB - Grafite",
    price: 3499.99,
    location: "Lisboa",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Como Novo",
    seller: "João Silva",
  },
  {
    id: "2",
    title: 'MacBook Pro 16" M1 Pro - 16GB RAM - 512GB SSD',
    price: 8999.99,
    location: "Porto",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Bom",
    seller: "Maria Santos",
  },
  {
    id: "3",
    title: "AirPods Pro 2ª Geração - Brancos",
    price: 1299.99,
    location: "Braga",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Novo",
    seller: "Pedro Oliveira",
  },
]

export default function FavoritesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meus Favoritos</h2>
        <Badge variant="outline" className="text-sm">
          <Heart className="mr-1 h-3 w-3 fill-current text-red-500" />
          {favoriteProducts.length} itens
        </Badge>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-red-500 hover:bg-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <Link href={`/produtos/${product.id}`} className="hover:underline">
                  <h3 className="line-clamp-2 font-medium">{product.title}</h3>
                </Link>
                <p className="mt-2 text-xl font-bold text-emerald-600">
                  {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                </p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {product.location}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Vendedor: {product.seller}</div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Badge variant="outline">{product.condition}</Badge>
                <Button size="sm">Ver Detalhes</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-medium">Nenhum favorito ainda</h3>
          <p className="mb-6 text-muted-foreground">
            Adicione produtos aos favoritos para acompanhar preços e disponibilidade.
          </p>
          <Button asChild>
            <Link href="/produtos">Explorar Produtos</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
