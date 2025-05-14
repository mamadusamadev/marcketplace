import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Star, MapPin, Calendar, ShieldCheck } from "lucide-react"
import ProductGrid from "@/components/product-grid"

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  // Normally we would fetch seller data based on the ID
  const seller = {
    id: params.id,
    name: "João Silva",
    rating: 4.9,
    sales: 27,
    reviews: 24,
    image: "/placeholder.svg?height=100&width=100",
    location: "Lisboa",
    memberSince: "Março 2022",
    verified: true,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={seller.image || "/placeholder.svg"} alt={seller.name} />
            <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              {seller.verified && (
                <Badge className="bg-blue-500">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Verificado
                </Badge>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {seller.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Membro desde {seller.memberSince}
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                {seller.rating} ({seller.reviews} avaliações)
              </div>
            </div>
          </div>

          <Button className="shrink-0">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contactar
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="produtos">
        <TabsList className="mb-6">
          <TabsTrigger value="produtos">Produtos ({seller.sales})</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações ({seller.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos">
          <ProductGrid />
        </TabsContent>

        <TabsContent value="avaliacoes">
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Usuário {i + 1}</div>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ótimo vendedor! Produto exatamente como descrito e envio rápido. Recomendo!
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
