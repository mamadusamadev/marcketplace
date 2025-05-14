import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Truck, BadgeCheck, CreditCard } from "lucide-react"

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Proteção ao Comprador",
    description: "Garantimos a devolução do dinheiro se o produto não corresponder à descrição.",
  },
  {
    icon: Truck,
    title: "Envio Seguro",
    description: "Acompanhe o seu envio em tempo real e receba o produto em casa.",
  },
  {
    icon: BadgeCheck,
    title: "Vendedores Verificados",
    description: "Todos os vendedores são verificados para garantir a sua segurança.",
  },
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Pague com segurança através do nosso sistema de pagamento protegido.",
  },
]

export default function SecurityBadges() {
  return (
    <section className="rounded-xl bg-muted/50 p-8">
      <h2 className="mb-6 text-center text-3xl font-bold">Compre com segurança</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {securityFeatures.map((feature, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 text-emerald-600">
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
