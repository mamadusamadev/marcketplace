"use client"

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
import type { Backup } from "@/types/backup"

interface BackupDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  backup: Backup | null
  onConfirm: () => void
}

export  default function BackupDeleteDialog({ open, onOpenChange, backup, onConfirm }: BackupDeleteDialogProps) {
  if (!backup) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Backup</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir o backup <strong>{backup.name}</strong>? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
