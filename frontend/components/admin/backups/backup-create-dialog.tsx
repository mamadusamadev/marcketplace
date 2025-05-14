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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface BackupCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function BackupCreateDialog({ open, onOpenChange, onConfirm }: BackupCreateDialogProps) {
  const [backupName, setBackupName] = useState(`Backup ${new Date().toLocaleDateString("pt-BR")}`)
  const [includeUploads, setIncludeUploads] = useState(true)
  const [includeConfigs, setIncludeConfigs] = useState(true)
  const [includeDatabase, setIncludeDatabase] = useState(true)

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Criar Novo Backup</AlertDialogTitle>
          <AlertDialogDescription>
            Crie um novo backup do sistema. Este processo pode levar alguns minutos dependendo do tamanho dos dados.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="backup-name">Nome do Backup</Label>
            <Input id="backup-name" value={backupName} onChange={(e) => setBackupName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Incluir no Backup:</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-database"
                  checked={includeDatabase}
                  onCheckedChange={(checked) => setIncludeDatabase(checked as boolean)}
                />
                <Label htmlFor="include-database">Banco de dados</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-uploads"
                  checked={includeUploads}
                  onCheckedChange={(checked) => setIncludeUploads(checked as boolean)}
                />
                <Label htmlFor="include-uploads">Arquivos de upload</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-configs"
                  checked={includeConfigs}
                  onCheckedChange={(checked) => setIncludeConfigs(checked as boolean)}
                />
                <Label htmlFor="include-configs">Arquivos de configuração</Label>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Criar Backup</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
