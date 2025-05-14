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
import { AlertTriangle } from "lucide-react"

interface BackupRestoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  backup: Backup | null
  onConfirm: () => void
}

export default function BackupRestoreDialog({ open, onOpenChange, backup, onConfirm }: BackupRestoreDialogProps) {
  if (!backup) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            Restaurar Backup
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">
              Tem certeza de que deseja restaurar o sistema a partir do backup <strong>{backup.name}</strong>?
            </p>
            <div className="rounded-md bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              <p className="font-medium">Atenção:</p>
              <ul className="mt-2 list-disc pl-5 text-sm">
                <li>Todos os dados atuais serão substituídos pelos dados do backup.</li>
                <li>O sistema ficará indisponível durante o processo de restauração.</li>
                <li>Esta ação não pode ser desfeita.</li>
                <li>Recomendamos criar um backup do estado atual antes de prosseguir.</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-amber-500 text-white hover:bg-amber-600">
            Restaurar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
