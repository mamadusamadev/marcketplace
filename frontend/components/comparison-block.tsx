import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const comparisonItems = [
  {
    title: "iPhone 13 Pro",
    newPrice: 1199.99,
    usedPrice: 599.99,
    saving: "50%",
  },
  {
    title: "MacBook Pro M1",
    newPrice: 1499.99,
    usedPrice: 899.99,
    saving: "40%",
  },
  {
    title: "PlayStation 5",
    newPrice: 499.99,
    usedPrice: 349.99,
    saving: "30%",
  },
]

export default function ComparisonBlock() {
  return (
    <section className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
      <h2 className="mb-6 text-center text-3xl font-bold">Economize comprando usado</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisonItems.map((item, index) => (
          <Card key={index} className="overflow-hidden bg-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <X className="mr-2 h-5 w-5 text-red-300" />
                    <span>Novo</span>
                  </div>
                  <span className="font-bold">
                    {item.newPrice.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-300" />
                    <span>Usado</span>
                  </div>
                  <span className="font-bold">
                    {item.usedPrice.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                  </span>
                </div>
                <div className="mt-4 rounded-lg bg-white/20 p-3 text-center">
                  <span className="text-lg font-bold">Economize {item.saving}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
