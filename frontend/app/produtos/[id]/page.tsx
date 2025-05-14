import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import ProductGallery from "@/components/product-gallery"
import SellerInfo from "@/components/seller-info"
import ShippingOptions from "@/components/shipping-options"
import SecurityBanner from "@/components/security-banner"
import { Heart, MessageCircle, ShoppingCart } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  // Normally we would fetch product data based on the ID
  const product = {
    id: params.id,
    title: "iPhone 13 Pro Max - 256GB - Grafite - Como Novo",
    price: 3499.99,
    description:
      "iPhone 13 Pro Max em excelente estado, com apenas 3 meses de uso. Acompanha carregador original, caixa e nota fiscal. Sem marcas de uso, com película de vidro e capa protetora desde o primeiro dia.",
    condition: "Usado - Como Novo",
    location: "Lisboa, Portugal",
    category: "Tecnologia",
    subcategory: "Smartphones",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: {
      id: "seller123",
      name: "João Silva",
      rating: 4.9,
      sales: 27,
      image: "/placeholder.svg?height=100&width=100",
      location: "Lisboa",
      memberSince: "Março 2022",
      verified: true,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Gallery */}
        <ProductGallery images={product.images} />

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
            <p className="text-4xl font-bold text-emerald-600">
              {product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{product.condition}</Badge>
              <Badge variant="outline">{product.category}</Badge>
              <span className="text-sm text-muted-foreground">{product.location}</span>
            </div>
          </div>

          <SecurityBanner />

          <div>
            <h2 className="mb-2 text-xl font-semibold">Descrição</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <ShippingOptions />

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Comprar
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contactar vendedor
            </Button>
            <Button size="icon" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <Card className="p-4">
            <SellerInfo seller={product.seller} />
          </Card>
        </div>
      </div>
    </div>
  )
}
