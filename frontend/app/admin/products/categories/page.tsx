"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ReportLayout } from "@/components/admin/report-layout"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ChevronDown, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CategoryCreateDialog } from "@/components/admin/categories/category-create-dialog"
import { CategoryEditDialog } from "@/components/admin/categories/category-edit-dialog"
import { CategoryDeleteDialog } from "@/components/admin/categories/category-delete-dialog"
import { toast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  subcategories: Subcategory[]
  _count: {
    subcategories: number
  }
}

interface Subcategory {
  id: string
  name: string
  description: string | null
  categoryId: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/categories")

      if (!response.ok) {
        throw new Error("Falha ao carregar categorias")
      }

      const data = await response.json()
      setCategories(data)
      setFilteredCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query) ||
          category.description?.toLowerCase().includes(query) ||
          category.subcategories.some(
            (sub) => sub.name.toLowerCase().includes(query) || sub.description?.toLowerCase().includes(query),
          ),
      )
      setFilteredCategories(filtered)
    }
  }, [searchQuery, categories])

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Handle category creation
  const handleCreateCategory = async (newCategory: { name: string; description?: string; icon?: string }) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Falha ao criar categoria")
      }

      toast({
        title: "Sucesso",
        description: "Categoria criada com sucesso",
      })

      fetchCategories()
      setCreateDialogOpen(false)
    } catch (err) {
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Erro ao criar categoria",
        variant: "destructive",
      })
    }
  }

  // Handle category update
  const handleUpdateCategory = async (
    categoryId: string,
    updatedData: { name?: string; description?: string; icon?: string },
  ) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Falha ao atualizar categoria")
      }

      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso",
      })

      fetchCategories()
      setEditDialogOpen(false)
    } catch (err) {
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Erro ao atualizar categoria",
        variant: "destructive",
      })
    }
  }

  // Handle category deletion
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Falha ao excluir categoria")
      }

      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso",
      })

      fetchCategories()
      setDeleteDialogOpen(false)
    } catch (err) {
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Erro ao excluir categoria",
        variant: "destructive",
      })
    }
  }

  return (
    <ReportLayout
      title="Gerenciamento de Categorias"
      description="Crie, edite e gerencie categorias de produtos"
      filterOptions={{
        userTypes: false,
        categories: false,
        status: false,
      }}
      viewOptions={[]}
      onRefresh={fetchCategories}
      isLoading={isLoading}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar categorias..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      {error ? (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-center text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      ) : filteredCategories.length === 0 ? (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-center text-muted-foreground">
              {searchQuery ? "Nenhuma categoria encontrada para esta busca" : "Nenhuma categoria cadastrada"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <Collapsible
                open={expandedCategories[category.id]}
                onOpenChange={() => toggleCategoryExpansion(category.id)}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedCategories[category.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      {category.description && (
                        <div className="text-sm text-muted-foreground">{category.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category._count.subcategories} subcategorias</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category)
                        setEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="border-t px-4 py-3">
                    <h4 className="mb-2 text-sm font-medium">Subcategorias</h4>
                    {category.subcategories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Nenhuma subcategoria cadastrada</p>
                    ) : (
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="flex items-center justify-between rounded-md border p-2">
                            <div>
                              <div className="font-medium">{subcategory.name}</div>
                              {subcategory.description && (
                                <div className="text-sm text-muted-foreground">{subcategory.description}</div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3.5 w-3.5" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Adicionar Subcategoria
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}

      {/* Create Category Dialog */}
      <CategoryCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateCategory}
      />

      {/* Edit Category Dialog */}
      {selectedCategory && (
        <CategoryEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          category={selectedCategory}
          onSubmit={(data) => handleUpdateCategory(selectedCategory.id, data)}
        />
      )}

      {/* Delete Category Dialog */}
      {selectedCategory && (
        <CategoryDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          category={selectedCategory}
          onConfirm={() => handleDeleteCategory(selectedCategory.id)}
        />
      )}
    </ReportLayout>
  )
}
