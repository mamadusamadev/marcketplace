"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, ImageIcon, Paperclip, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mock conversation data
const initialConversations = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "Há 5 minutos",
    },
    product: {
      id: "prod1",
      title: "iPhone 13 Pro Max",
      price: 3499.99,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Olá, este produto ainda está disponível?",
    unread: true,
    time: "14:32",
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Pedro Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "Há 2 horas",
    },
    product: {
      id: "prod2",
      title: 'MacBook Pro 16"',
      price: 8999.99,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Aceita 8500€?",
    unread: false,
    time: "Ontem",
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Ana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "Há 1 dia",
    },
    product: {
      id: "prod3",
      title: "AirPods Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Obrigado pela informação!",
    unread: false,
    time: "Seg",
  },
]

// Mock messages for conversations
const conversationMessages = {
  "1": [
    {
      id: "msg1",
      sender: "user1",
      text: "Olá, este produto ainda está disponível?",
      time: "14:32",
    },
    {
      id: "msg2",
      sender: "me",
      text: "Olá! Sim, ainda está disponível.",
      time: "14:35",
    },
    {
      id: "msg3",
      sender: "user1",
      text: "Ótimo! Qual é o estado de conservação? Tem algum arranhão ou marca de uso?",
      time: "14:37",
    },
    {
      id: "msg4",
      sender: "me",
      text: "O estado é excelente, praticamente novo. Foi usado por apenas 3 meses e sempre com capa protetora. Não tem nenhum arranhão ou marca de uso.",
      time: "14:40",
    },
    {
      id: "msg5",
      sender: "user1",
      text: "Perfeito! E o preço é negociável?",
      time: "14:42",
    },
  ],
  "2": [
    {
      id: "msg1",
      sender: "me",
      text: "Olá, tenho interesse no MacBook Pro. Ele ainda está à venda?",
      time: "Ontem, 10:15",
    },
    {
      id: "msg2",
      sender: "user2",
      text: "Olá! Sim, ainda está disponível.",
      time: "Ontem, 10:30",
    },
    {
      id: "msg3",
      sender: "me",
      text: "Qual é o estado da bateria? Quantos ciclos tem?",
      time: "Ontem, 10:32",
    },
    {
      id: "msg4",
      sender: "user2",
      text: "A bateria está em 92% da capacidade original e tem cerca de 120 ciclos.",
      time: "Ontem, 10:40",
    },
    {
      id: "msg5",
      sender: "me",
      text: "Aceita 8500€?",
      time: "Ontem, 11:05",
    },
  ],
  "3": [
    {
      id: "msg1",
      sender: "me",
      text: "Olá, os AirPods Pro ainda estão disponíveis?",
      time: "Segunda, 15:20",
    },
    {
      id: "msg2",
      sender: "user3",
      text: "Olá! Sim, ainda estão disponíveis e são novos, nunca foram usados.",
      time: "Segunda, 15:45",
    },
    {
      id: "msg3",
      sender: "me",
      text: "Ótimo! Tem a nota fiscal? E aceita pagamento por transferência bancária?",
      time: "Segunda, 16:00",
    },
    {
      id: "msg4",
      sender: "user3",
      text: "Sim, tenho a nota fiscal e aceito transferência bancária sem problemas.",
      time: "Segunda, 16:10",
    },
    {
      id: "msg5",
      sender: "me",
      text: "Perfeito! Vou ficar com eles então. Obrigado pela informação!",
      time: "Segunda, 16:15",
    },
  ],
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const sellerParam = searchParams.get("seller")
  const productParam = searchParams.get("product")

  const [conversations, setConversations] = useState(initialConversations)
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(conversationMessages[conversations[0].id])
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle conversation selection
  const handleSelectConversation = (conversation: (typeof conversations)[0]) => {
    setActiveConversation(conversation)
    setMessages(conversationMessages[conversation.id])

    // Mark as read
    if (conversation.unread) {
      setConversations(conversations.map((c) => (c.id === conversation.id ? { ...c, unread: false } : c)))
    }
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: `msg${messages.length + 1}`,
        sender: "me",
        text: messageText,
        time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages([...messages, newMessage])
      setMessageText("")

      // Update last message in conversation list
      setConversations(
        conversations.map((c) =>
          c.id === activeConversation.id ? { ...c, lastMessage: messageText, time: "Agora" } : c,
        ),
      )
    }
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check if there's a seller and product param to start a new conversation
  useEffect(() => {
    if (sellerParam && productParam) {
      // Check if conversation already exists
      const existingConversation = conversations.find(
        (c) => c.user.name === sellerParam && c.product.id === productParam,
      )

      if (existingConversation) {
        handleSelectConversation(existingConversation)
      } else {
        // Create a new conversation
        const newConversation = {
          id: `new-${Date.now()}`,
          user: {
            id: `user-${Date.now()}`,
            name: sellerParam,
            avatar: "/placeholder.svg?height=40&width=40",
            lastActive: "Agora mesmo",
          },
          product: {
            id: productParam,
            title: "Produto de Interesse",
            price: 0,
            image: "/placeholder.svg?height=60&width=60",
          },
          lastMessage: "Nova conversa",
          unread: false,
          time: "Agora",
        }

        setConversations([newConversation, ...conversations])
        setActiveConversation(newConversation)
        setMessages([])
      }
    }
  }, [sellerParam, productParam])

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col md:flex-row">
      {/* Conversation List */}
      <div className="w-full border-r md:w-80">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold">Mensagens</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar conversas..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg p-3 transition-colors hover:bg-muted",
                  activeConversation.id === conversation.id && "bg-muted",
                )}
                onClick={() => handleSelectConversation(conversation)}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                  <AvatarFallback>{conversation.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{conversation.user.name}</div>
                    <div className="text-xs text-muted-foreground">{conversation.time}</div>
                  </div>
                  <div className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</div>
                  <div className="mt-1 text-xs text-muted-foreground truncate">{conversation.product.title}</div>
                </div>
                {conversation.unread && <Badge className="ml-auto shrink-0 self-center">Novo</Badge>}
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">Nenhuma conversa encontrada</div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={activeConversation.user.avatar || "/placeholder.svg"}
                  alt={activeConversation.user.name}
                />
                <AvatarFallback>{activeConversation.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{activeConversation.user.name}</div>
                <div className="text-xs text-muted-foreground">{activeConversation.user.lastActive}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Card className="flex items-center gap-2 p-2">
                  <img
                    src={activeConversation.product.image || "/placeholder.svg"}
                    alt={activeConversation.product.title}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">{activeConversation.product.title}</div>
                    {activeConversation.product.price > 0 && (
                      <div className="text-sm font-bold text-emerald-600">
                        {activeConversation.product.price.toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2",
                          message.sender === "me" ? "bg-emerald-500 text-white" : "bg-muted",
                        )}
                      >
                        <div>{message.text}</div>
                        <div className="mt-1 text-right text-xs opacity-70">{message.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p className="mb-2">Inicie uma conversa com {activeConversation.user.name}</p>
                      <p className="text-sm">Seja educado e claro nas suas mensagens</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Escreva uma mensagem..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">Selecione uma conversa para começar</p>
              <p className="text-sm">Ou inicie uma nova conversa com um vendedor</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
