"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AlertTriangle, CheckCircle, Paperclip, ShoppingBag, Trash2, User } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  text: string | null
  encryptedContent: string | null
  productId: string | null
  productTitle: string | null
  createdAt: string
  read: boolean
  flagged: boolean
  deleted: boolean
  hasAttachments: boolean
}

interface MessageViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: Message
}

export function MessageViewDialog({ open, onOpenChange, message }: MessageViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detalhes da Mensagem
            {message.flagged && (
              <Badge variant="destructive" className="ml-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Sinalizada
              </Badge>
            )}
            {message.deleted && (
              <Badge variant="outline" className="ml-2">
                <Trash2 className="h-3 w-3 mr-1" />
                Excluída
              </Badge>
            )}
            {!message.flagged && !message.deleted && (
              <Badge variant="outline" className="ml-2 bg-green-50">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Normal
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="message">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="message">Mensagem</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
          </TabsList>

          <TabsContent value="message" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Data e Hora</div>
              <div>{format(new Date(message.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</div>
            </div>

            {message.productId && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Produto Relacionado</div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  {message.productTitle}
                </div>
              </div>
            )}

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{message.senderName}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(message.createdAt), "HH:mm", { locale: ptBR })}
                  </div>
                </div>

                {message.text ? (
                  <div className="text-sm">{message.text}</div>
                ) : message.encryptedContent ? (
                  <div className="text-sm italic text-muted-foreground">
                    Esta mensagem está criptografada e não pode ser visualizada.
                  </div>
                ) : (
                  <div className="text-sm italic text-muted-foreground">Esta mensagem não contém texto.</div>
                )}

                {message.hasAttachments && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Paperclip className="h-4 w-4" />
                    Contém anexos
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <div className="font-medium">Remetente</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Nome:</span> {message.senderName}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">ID:</span> {message.senderId}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <div className="font-medium">Destinatário</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Nome:</span> {message.receiverName}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">ID:</span> {message.receiverId}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ID da Mensagem</div>
                  <div className="font-mono text-xs">{message.id}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Status de Leitura</div>
                  <div>{message.read ? "Lida" : "Não lida"}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Tipo de Conteúdo</div>
              <div>
                {message.text ? "Texto simples" : message.encryptedContent ? "Conteúdo criptografado" : "Sem conteúdo"}
                {message.hasAttachments && " + Anexos"}
              </div>
            </div>

            {message.productId && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">ID do Produto</div>
                <div className="font-mono text-xs">{message.productId}</div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Metadados</div>
              <div className="text-xs font-mono whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    id: message.id,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    createdAt: message.createdAt,
                    read: message.read,
                    flagged: message.flagged,
                    deleted: message.deleted,
                    hasAttachments: message.hasAttachments,
                  },
                  null,
                  2,
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
