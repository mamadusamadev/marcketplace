import Link from "next/link"
import {
  Home,
  Smartphone,
  Tv,
  Car,
  ShoppingBag,
  Shirt,
  Baby,
  Gamepad2,
  Bike,
  BookOpen,
  Sofa,
  Utensils,
} from "lucide-react"

const categories = [
  { icon: Home, label: "Casa e Jardim" },
  { icon: Smartphone, label: "Tecnologia" },
  { icon: Tv, label: "Eletrônicos" },
  { icon: Car, label: "Veículos" },
  { icon: ShoppingBag, label: "Moda" },
  { icon: Shirt, label: "Roupas" },
  { icon: Baby, label: "Bebê e Criança" },
  { icon: Gamepad2, label: "Jogos e Hobbies" },
  { icon: Bike, label: "Esportes" },
  { icon: BookOpen, label: "Livros" },
  { icon: Sofa, label: "Móveis" },
  { icon: Utensils, label: "Cozinha" },
]

export default function CategorySection() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Categorias</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.label}
            href="#"
            className="flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors hover:bg-muted"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50">
              <category.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
