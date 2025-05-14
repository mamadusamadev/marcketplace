import { Card, CardContent } from "@/components/ui/card"
import { Camera, MessageCircle, CreditCard, ThumbsUp } from "lucide-react"

const steps = [
  {
    icon: Camera,
    title: "Tire fotos e crie um anúncio",
    description: "Tire fotos do seu produto e crie um anúncio em menos de 1 minuto.",
  },
  {
    icon: MessageCircle,
    title: "Converse com compradores",
    description: "Responda às perguntas e negocie o preço através do chat.",
  },
  {
    icon: CreditCard,
    title: "Receba o pagamento",
    description: "Escolha entre pagamento online seguro ou em dinheiro na entrega.",
  },
  {
    icon: ThumbsUp,
    title: "Entregue e avalie",
    description: "Entregue o produto e avalie o comprador para construir confiança.",
  },
]

export default function HowItWorks() {
  return (
    <section>
      <h2 className="mb-6 text-center text-3xl font-bold">Como funciona</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index} className="border-2 border-muted">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
