"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  text: string | null
  productId: string | null
  productTitle: string | null
  createdAt: string
}

interface MessageDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: Message
  onDelete: () => void
}

export function MessageDeleteDialog({ open, onOpenChange, message, onDelete }: MessageDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Excluir Mensagem
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md p-4 bg-muted/50">
          <div className="font-medium">
            {message.senderName} → {message.receiverName}
          </div>
          <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {message.text || "Sem conteúdo de texto"}
          </div>
          {message.productTitle && (
            <div className="text-xs text-muted-foreground mt-1">Produto: {message.productTitle}</div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
