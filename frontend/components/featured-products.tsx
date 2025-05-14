import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

// Mock product data
const products = [
  {
    id: "1",
    title: "iPhone 13 Pro Max - 256GB - Grafite",
    price: 3499.99,
    location: "Lisboa",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Como Novo",
  },
  {
    id: "2",
    title: 'MacBook Pro 16" M1 Pro - 16GB RAM - 512GB SSD',
    price: 8999.99,
    location: "Porto",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Bom",
  },
  {
    id: "3",
    title: "AirPods Pro 2ª Geração - Brancos",
    price: 1299.99,
    location: "Braga",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Novo",
  },
  {
    id: "4",
    title: "Samsung Galaxy S23 Ultra - 512GB - Preto",
    price: 2999.99,
    location: "Coimbra",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Como Novo",
  },
  {
    id: "5",
    title: "PlayStation 5 - Edição Digital",
    price: 399.99,
    location: "Faro",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Bom",
  },
  {
    id: "6",
    title: "Bicicleta Montanha Scott Scale 970",
    price: 899.99,
    location: "Aveiro",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Aceitável",
  },
  {
    id: "7",
    title: "Sofá de 3 Lugares em Veludo Verde",
    price: 599.99,
    location: "Setúbal",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Bom",
  },
  {
    id: "8",
    title: "Mesa de Jantar em Carvalho Maciço",
    price: 799.99,
    location: "Évora",
    image: "/placeholder.svg?height=200&width=200",
    condition: "Usado - Como Novo",
  },
]

export default function FeaturedProducts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} href={`/produtos/${product.id}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="line-clamp-2 font-medium">{product.title}</h3>
              <p className="mt-2 text-xl font-bold text-emerald-600">
                {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
              </p>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {product.location}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 pt-2">
              <Badge variant="outline">{product.condition}</Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
