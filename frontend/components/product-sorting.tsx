"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutGrid, List } from "lucide-react"

export default function ProductSorting() {
  const [sortOption, setSortOption] = useState("Relevância")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Ordenar por:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {sortOption}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOption("Relevância")}>Relevância</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Mais recentes")}>Mais recentes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Preço: menor para maior")}>
              Preço: menor para maior
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Preço: maior para menor")}>
              Preço: maior para menor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Distância")}>Distância</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
