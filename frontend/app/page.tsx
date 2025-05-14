import { Button } from "@/components/ui/button"
import CategorySection from "@/components/category-section"
import FeaturedProducts from "@/components/featured-products"
import HowItWorks from "@/components/how-it-works"
import SecurityBadges from "@/components/security-badges"
import Testimonials from "@/components/testimonials"
import ComparisonBlock from "@/components/comparison-block"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-500 to-teal-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Compre e venda de forma simples, rápida e segura
            </h1>
            <p className="mb-8 text-lg opacity-90">
              Milhares de produtos à sua espera. Encontre o que precisa ou venda o que não usa mais.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Começa a vender!
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explorar produtos
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4">
        <CategorySection />
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Produtos em destaque</h2>
        <FeaturedProducts />
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4">
        <HowItWorks />
      </div>

      {/* Security Badges */}
      <div className="container mx-auto px-4">
        <SecurityBadges />
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4">
        <Testimonials />
      </div>

      {/* Comparison Block */}
      <div className="container mx-auto px-4">
        <ComparisonBlock />
      </div>
    </div>
  )
}
