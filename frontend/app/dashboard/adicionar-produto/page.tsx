"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImagePlus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AddProductPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=200&width=200"])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "usado-como-novo",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, "/placeholder.svg?height=200&width=200"])
    } else {
      toast({
        title: "Limite de imagens atingido",
        description: "Você pode adicionar no máximo 5 imagens.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Produto adicionado com sucesso!",
      description: "Seu produto foi publicado e já está disponível para venda.",
    })
    router.push("/dashboard")
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Adicionar Produto</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Images Section */}
          <Card>
            <CardHeader>
              <CardTitle>Fotos do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagem ${index + 1}`}
                      className="h-full w-full rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    className="flex aspect-square items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted"
                    onClick={handleAddImage}
                  >
                    <ImagePlus className="h-8 w-8" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Adicione até 5 fotos. A primeira foto será a capa do seu anúncio.
              </p>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Anúncio</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex: iPhone 13 Pro Max - 256GB - Grafite"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descreva o seu produto em detalhes..."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (€)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Produto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="moveis">Móveis</SelectItem>
                      <SelectItem value="roupas">Roupas</SelectItem>
                      <SelectItem value="veiculos">Veículos</SelectItem>
                      <SelectItem value="esportes">Esportes</SelectItem>
                      <SelectItem value="jogos">Jogos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estado do Produto</Label>
                  <RadioGroup
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="novo" id="novo" />
                      <Label htmlFor="novo">Novo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usado-como-novo" id="usado-como-novo" />
                      <Label htmlFor="usado-como-novo">Usado - Como Novo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usado-bom" id="usado-bom" />
                      <Label htmlFor="usado-bom">Usado - Bom</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usado-aceitavel" id="usado-aceitavel" />
                      <Label htmlFor="usado-aceitavel">Usado - Aceitável</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Selecione uma localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lisboa">Lisboa</SelectItem>
                      <SelectItem value="porto">Porto</SelectItem>
                      <SelectItem value="braga">Braga</SelectItem>
                      <SelectItem value="coimbra">Coimbra</SelectItem>
                      <SelectItem value="faro">Faro</SelectItem>
                      <SelectItem value="aveiro">Aveiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
            Cancelar
          </Button>
          <Button type="submit">Publicar Anúncio</Button>
        </div>
      </form>
    </div>
  )
}
