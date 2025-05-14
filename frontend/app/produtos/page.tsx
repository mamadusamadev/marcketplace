import { Suspense } from "react"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import ProductSorting from "@/components/product-sorting"
import ProductsLoading from "@/components/products-loading"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Produtos</h1>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters />
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-4">
            <ProductSorting />
          </div>

          <Suspense fallback={<ProductsLoading />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
