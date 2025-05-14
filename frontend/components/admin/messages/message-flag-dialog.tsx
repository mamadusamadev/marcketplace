"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Flag } from "lucide-react"

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

interface MessageFlagDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: Message
  onFlag: (reason: string) => void
}

export function MessageFlagDialog({ open, onOpenChange, message, onFlag }: MessageFlagDialogProps) {
  const [flagReason, setFlagReason] = useState<string>("spam")
  const [customReason, setCustomReason] = useState<string>("")

  const handleSubmit = () => {
    const reason = flagReason === "other" ? customReason : flagReason
    onFlag(reason)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-amber-500" />
            Sinalizar Mensagem
          </DialogTitle>
          <DialogDescription>
            Sinalize esta mensagem para revisão adicional. Isso ajudará a manter a plataforma segura.
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

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Motivo da sinalização:</div>
            <RadioGroup value={flagReason} onValueChange={setFlagReason}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spam" id="spam" />
                <Label htmlFor="spam">Spam ou conteúdo comercial não solicitado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inappropriate" id="inappropriate" />
                <Label htmlFor="inappropriate">Conteúdo inapropriado ou ofensivo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scam" id="scam" />
                <Label htmlFor="scam">Tentativa de golpe ou fraude</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external">Tentativa de negociação externa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Outro motivo</Label>
              </div>
            </RadioGroup>
          </div>

          {flagReason === "other" && (
            <div className="space-y-2">
              <Label htmlFor="custom-reason">Especifique o motivo:</Label>
              <Textarea
                id="custom-reason"
                placeholder="Descreva o motivo da sinalização..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={flagReason === "other" && !customReason.trim()}>
            Sinalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
