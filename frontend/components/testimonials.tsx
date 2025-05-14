import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana Oliveira",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Vendedora",
    content:
      "Já vendi mais de 50 produtos na plataforma. O processo é super simples e os compradores são muito respeitosos.",
    rating: 5,
  },
  {
    name: "Pedro Santos",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Comprador",
    content:
      "Encontrei um iPhone em excelente estado por metade do preço de um novo. A entrega foi rápida e o produto estava exatamente como descrito.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Vendedora",
    content:
      "Consegui vender móveis que não usava mais em apenas 2 dias. Recomendo a todos que querem se desfazer de itens em bom estado.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section>
      <h2 className="mb-6 text-center text-3xl font-bold">O que dizem os nossos utilizadores</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
