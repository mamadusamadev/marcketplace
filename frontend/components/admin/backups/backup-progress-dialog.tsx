import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import { Progress } from "@/components/ui/progress"
  import { Loader2 } from "lucide-react"
  
  interface BackupProgressDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    progress: number
    type: "create" | "restore"
  }
  
  export default function BackupProgressDialog({ open, onOpenChange, progress, type }: BackupProgressDialogProps) {
    const isComplete = progress >= 100
  
    const title =
      type === "create"
        ? isComplete
          ? "Backup Criado com Sucesso"
          : "Criando Backup"
        : isComplete
          ? "Restauração Concluída"
          : "Restaurando Backup"
  
    const description =
      type === "create"
        ? isComplete
          ? "O backup foi criado com sucesso e está disponível na lista de backups."
          : "Criando um novo backup do sistema. Isso pode levar alguns minutos."
        : isComplete
          ? "O sistema foi restaurado com sucesso a partir do backup selecionado."
          : "Restaurando o sistema a partir do backup selecionado. Isso pode levar alguns minutos."
  
    return (
      <AlertDialog open={open} onOpenChange={isComplete ? onOpenChange : () => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {!isComplete && <Loader2 className="h-4 w-4 animate-spin" />}
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
  
          <div className="py-6">
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {progress}% {isComplete ? "Concluído" : "Concluído"}
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  