"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { MessageViewDialog } from "@/components/admin/messages/message-view-dialog"
import { MessageDeleteDialog } from "@/components/admin/messages/message-delete-dialog"
import { MessageFlagDialog } from "@/components/admin/messages/message-flag-dialog"
import { MessageCreateDialog } from "@/components/admin/messages/message-create-dialog"
import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye, Flag, Trash2, AlertTriangle, CheckCircle, Search, Filter, MessageSquarePlus } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

// Types
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

export default function AdminMessagesPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [messageType, setMessageType] = useState<"all" | "flagged" | "deleted">("all")
  const [filterType, setFilterType] = useState<"all" | "withProduct" | "withAttachments">("all")

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages()
  }, []) // Empty dependency array means this runs once on mount

  // Fetch messages from API
  const fetchMessages = async () => {
    setLoading(true)
    try {
      // In a real application, you would fetch from your API
      // For now, we'll use mock data
      const mockMessages: Message[] = [
        {
          id: "msg1",
          senderId: "user1",
          senderName: "João Silva",
          receiverId: "user2",
          receiverName: "Maria Oliveira",
          text: "Olá, tenho interesse no seu produto. Ainda está disponível?",
          encryptedContent: null,
          productId: "prod1",
          productTitle: "iPhone 13 Pro Max",
          createdAt: new Date(2023, 4, 15, 14, 30).toISOString(),
          read: true,
          flagged: false,
          deleted: false,
          hasAttachments: false,
        },
        {
          id: "msg2",
          senderId: "user2",
          senderName: "Maria Oliveira",
          receiverId: "user1",
          receiverName: "João Silva",
          text: "Sim, ainda está disponível! Podemos combinar a entrega.",
          encryptedContent: null,
          productId: "prod1",
          productTitle: "iPhone 13 Pro Max",
          createdAt: new Date(2023, 4, 15, 15, 45).toISOString(),
          read: true,
          flagged: false,
          deleted: false,
          hasAttachments: false,
        },
        {
          id: "msg3",
          senderId: "user3",
          senderName: "Carlos Mendes",
          receiverId: "user4",
          receiverName: "Ana Pereira",
          text: null,
          encryptedContent: "encrypted-content-here",
          productId: "prod2",
          productTitle: "MacBook Pro M1",
          createdAt: new Date(2023, 4, 16, 9, 15).toISOString(),
          read: false,
          flagged: true,
          deleted: false,
          hasAttachments: true,
        },
        {
          id: "msg4",
          senderId: "user5",
          senderName: "Pedro Santos",
          receiverId: "user6",
          receiverName: "Lucia Ferreira",
          text: "Este produto é uma fraude! Não compre!",
          encryptedContent: null,
          productId: "prod3",
          productTitle: "Tênis Nike Falsificado",
          createdAt: new Date(2023, 4, 17, 11, 20).toISOString(),
          read: true,
          flagged: true,
          deleted: false,
          hasAttachments: false,
        },
        {
          id: "msg5",
          senderId: "user7",
          senderName: "Roberto Alves",
          receiverId: "user8",
          receiverName: "Camila Costa",
          text: "Vamos trocar contatos fora da plataforma para evitar taxas?",
          encryptedContent: null,
          productId: "prod4",
          productTitle: "PlayStation 5",
          createdAt: new Date(2023, 4, 18, 16, 5).toISOString(),
          read: true,
          flagged: true,
          deleted: false,
          hasAttachments: false,
        },
        {
          id: "msg6",
          senderId: "user9",
          senderName: "Fernando Gomes",
          receiverId: "user10",
          receiverName: "Juliana Lima",
          text: "Obrigado pela compra! Espero que goste do produto.",
          encryptedContent: null,
          productId: "prod5",
          productTitle: "Câmera Canon EOS R5",
          createdAt: new Date(2023, 4, 19, 10, 30).toISOString(),
          read: false,
          flagged: false,
          deleted: true,
          hasAttachments: true,
        },
      ]

      setMessages(mockMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mensagens.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle message deletion
  const handleDeleteMessage = async (messageId: string) => {
    try {
      // In a real application, you would call your API
      // await fetch(`/api/messages/${messageId}`, { method: 'DELETE' });

      // Update local state
      setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, deleted: true } : msg)))

      toast({
        title: "Sucesso",
        description: "Mensagem excluída com sucesso.",
      })

      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Error deleting message:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a mensagem.",
        variant: "destructive",
      })
    }
  }

  // Handle message flagging
  const handleFlagMessage = async (messageId: string, reason: string) => {
    try {
      // In a real application, you would call your API
      // await fetch(`/api/messages/${messageId}/flag`, {
      //   method: 'POST',
      //   body: JSON.stringify({ reason })
      // });

      // Update local state
      setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, flagged: true } : msg)))

      toast({
        title: "Sucesso",
        description: "Mensagem sinalizada para revisão.",
      })

      setShowFlagDialog(false)
    } catch (error) {
      console.error("Error flagging message:", error)
      toast({
        title: "Erro",
        description: "Não foi possível sinalizar a mensagem.",
        variant: "destructive",
      })
    }
  }

  // Handle message creation
  const handleMessageCreated = (newMessage: Message) => {
    // Add the new message to the list
    setMessages([newMessage, ...messages])
  }

  // Filter messages based on current filters
  const filteredMessages = messages.filter((message) => {
    // Filter by search term
    const matchesSearch =
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.text && message.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (message.productTitle && message.productTitle.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by message type
    const matchesType =
      messageType === "all" ||
      (messageType === "flagged" && message.flagged) ||
      (messageType === "deleted" && message.deleted)

    // Filter by filter type
    const matchesFilterType =
      filterType === "all" ||
      (filterType === "withProduct" && message.productId) ||
      (filterType === "withAttachments" && message.hasAttachments)

    // Filter by date range
    const messageDate = new Date(message.createdAt)
    const matchesDateRange =
      (!dateRange?.from || messageDate >= dateRange.from) && (!dateRange?.to || messageDate <= dateRange.to)

    return matchesSearch && matchesType && matchesFilterType && matchesDateRange
  })

  // Table columns definition
  const columns: ColumnDef<Message>[] = [
    {
      accessorKey: "senderName",
      header: "Remetente",
      cell: ({ row }) => <div>{row.original.senderName}</div>,
    },
    {
      accessorKey: "receiverName",
      header: "Destinatário",
      cell: ({ row }) => <div>{row.original.receiverName}</div>,
    },
    {
      accessorKey: "text",
      header: "Conteúdo",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.original.text || (
            <span className="text-muted-foreground italic">
              {row.original.encryptedContent ? "Conteúdo criptografado" : "Sem texto"}
            </span>
          )}
          {row.original.hasAttachments && (
            <Badge variant="outline" className="ml-2">
              Anexos
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "productTitle",
      header: "Produto",
      cell: ({ row }) => (
        <div>{row.original.productTitle || <span className="text-muted-foreground italic">Nenhum</span>}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => <div>{format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.flagged && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Sinalizada
            </Badge>
          )}
          {row.original.deleted && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Trash2 className="h-3 w-3" />
              Excluída
            </Badge>
          )}
          {!row.original.read && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Não lida
            </Badge>
          )}
          {!row.original.flagged && !row.original.deleted && row.original.read && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Normal
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedMessage(row.original)
              setShowViewDialog(true)
            }}
            aria-label="Ver mensagem"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedMessage(row.original)
              setShowFlagDialog(true)
            }}
            aria-label="Sinalizar mensagem"
            disabled={row.original.flagged}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedMessage(row.original)
              setShowDeleteDialog(true)
            }}
            aria-label="Excluir mensagem"
            disabled={row.original.deleted}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Mensagens</h2>
            <p className="text-muted-foreground">
              Monitore e gerencie as mensagens trocadas entre usuários na plataforma.
            </p>
          </div>

          {/* Create Message Button */}
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
            <MessageSquarePlus className="h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>

        <Tabs defaultValue="all" value={messageType} onValueChange={(value) => setMessageType(value as any)}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="flagged">Sinalizadas</TabsTrigger>
              <TabsTrigger value="deleted">Excluídas</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filtrar por" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="withProduct">Com produto</SelectItem>
                    <SelectItem value="withAttachments">Com anexos</SelectItem>
                  </SelectContent>
                </Select>

                <DateRangePicker value={dateRange} onChange={setDateRange} className="mb-4" />
              </div>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Todas as Mensagens</CardTitle>
                <CardDescription>Visualize e gerencie todas as mensagens trocadas na plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredMessages}
                  searchColumn="text"
                  searchPlaceholder="Filtrar mensagens..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged" className="m-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Mensagens Sinalizadas</CardTitle>
                <CardDescription>
                  Mensagens que foram sinalizadas para revisão por conteúdo inadequado ou suspeito.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredMessages}
                  searchColumn="text"
                  searchPlaceholder="Filtrar mensagens sinalizadas..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deleted" className="m-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Mensagens Excluídas</CardTitle>
                <CardDescription>Mensagens que foram excluídas por administradores ou usuários.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredMessages}
                  searchColumn="text"
                  searchPlaceholder="Filtrar mensagens excluídas..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Message Dialog */}
      {selectedMessage && (
        <MessageViewDialog open={showViewDialog} onOpenChange={setShowViewDialog} message={selectedMessage} />
      )}

      {/* Delete Message Dialog */}
      {selectedMessage && (
        <MessageDeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          message={selectedMessage}
          onDelete={() => handleDeleteMessage(selectedMessage.id)}
        />
      )}

      {/* Flag Message Dialog */}
      {selectedMessage && (
        <MessageFlagDialog
          open={showFlagDialog}
          onOpenChange={setShowFlagDialog}
          message={selectedMessage}
          onFlag={(reason) => handleFlagMessage(selectedMessage.id, reason)}
        />
      )}

      {/* Create Message Dialog */}
      <MessageCreateDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onMessageCreated={handleMessageCreated}
      />
    </>
  )
}
