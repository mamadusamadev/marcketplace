import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ShieldCheck, MessageCircle } from "lucide-react"

interface SellerInfoProps {
  seller: {
    id: string
    name: string
    rating: number
    sales: number
    image: string
    location: string
    memberSince: string
    verified?: boolean
  }
}

export default function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={seller.image || "/placeholder.svg"} alt={seller.name} />
          <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{seller.name}</h3>
            {seller.verified && (
              <Badge className="bg-blue-500">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Verificado
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1 h-4 w-4 text-yellow-500" />
            {seller.rating} · {seller.sales} vendas
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Localização: {seller.location}</p>
        <p>Membro desde: {seller.memberSince}</p>
      </div>

      <Button className="w-full">
        <MessageCircle className="mr-2 h-4 w-4" />
        Ver perfil do vendedor
      </Button>
    </div>
  )
}
