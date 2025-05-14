"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  subcategories: any[]
  _count: {
    subcategories: number
  }
}

interface CategoryDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category
  onConfirm: () => Promise<void>
}

export function CategoryDeleteDialog({ open, onOpenChange, category, onConfirm }: CategoryDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
    } finally {
      setIsDeleting(false)
    }
  }

  const hasSubcategories = category._count.subcategories > 0

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
          <AlertDialogDescription>
            {hasSubcategories ? (
              <>
                <p className="mb-2">
                  Esta categoria possui <strong>{category._count.subcategories}</strong> subcategorias que também serão
                  excluídas.
                </p>
                <p>
                  Esta ação não pode ser desfeita. Tem certeza que deseja excluir a categoria{" "}
                  <strong>{category.name}</strong> e todas as suas subcategorias?
                </p>
              </>
            ) : (
              <p>
                Esta ação não pode ser desfeita. Tem certeza que deseja excluir a categoria{" "}
                <strong>{category.name}</strong>?
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Excluindo..." : "Sim, excluir categoria"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
