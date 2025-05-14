"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X } from "lucide-react"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleConditionChange = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedCategories([])
    setSelectedConditions([])
    setSelectedLocation("")
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Limpar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "condition", "location"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={5000} step={50} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="mt-1 w-24"
                  />
                </div>
                <div>
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="mt-1 w-24"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Categoria</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Tecnologia", "Móveis", "Roupas", "Veículos", "Esportes", "Jogos"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Estado</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Novo", "Como Novo", "Bom", "Aceitável", "Para peças"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition}`}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => handleConditionChange(condition)}
                  />
                  <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Localização</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
              {["Lisboa", "Porto", "Braga", "Coimbra", "Faro", "Aveiro"].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <RadioGroupItem value={location} id={`location-${location}`} />
                  <Label htmlFor={`location-${location}`}>{location}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping">
          <AccordionTrigger>Envio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="shipping-available" />
                <Label htmlFor="shipping-available">Envio disponível</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="free-shipping" />
                <Label htmlFor="free-shipping">Envio grátis</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seller">
          <AccordionTrigger>Vendedor</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="verified-seller" />
                <Label htmlFor="verified-seller">Verificado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="professional-seller" />
                <Label htmlFor="professional-seller">Profissional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="private-seller" />
                <Label htmlFor="private-seller">Particular</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="mt-4 w-full">Aplicar Filtros</Button>
    </div>
  )
}
