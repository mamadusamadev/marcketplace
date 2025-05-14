"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Truck, MapPin } from "lucide-react"

export default function ShippingOptions() {
  const [shippingMethod, setShippingMethod] = useState("pickup")

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Opções de entrega</h3>
      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
        <div className="flex items-start space-x-2 rounded-md p-2 hover:bg-muted">
          <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="pickup" className="flex items-center font-medium">
              <MapPin className="mr-2 h-4 w-4 text-emerald-600" />
              Recolha em pessoa
            </Label>
            <p className="text-sm text-muted-foreground">
              Combine um local de encontro com o vendedor para recolher o produto.
            </p>
          </div>
          <div className="font-medium text-emerald-600">Grátis</div>
        </div>

        <div className="flex items-start space-x-2 rounded-md p-2 hover:bg-muted">
          <RadioGroupItem value="shipping" id="shipping" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="shipping" className="flex items-center font-medium">
              <Truck className="mr-2 h-4 w-4 text-emerald-600" />
              Envio
            </Label>
            <p className="text-sm text-muted-foreground">Receba o produto em casa em 2-3 dias úteis.</p>
          </div>
          <div className="font-medium text-emerald-600">€4.99</div>
        </div>
      </RadioGroup>
    </div>
  )
}
