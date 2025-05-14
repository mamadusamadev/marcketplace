"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, ImageIcon, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock conversation data
const conversations = [
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

// Mock messages for the first conversation
const messages = [
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
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, we would send the message to the API
      console.log("Sending message:", messageText)
      setMessageText("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col md:flex-row">
      {/* Conversation List */}
      <div className="w-full border-r md:w-80">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold">Mensagens</h2>
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg p-3 transition-colors hover:bg-muted",
                  activeConversation.id === conversation.id && "bg-muted",
                )}
                onClick={() => setActiveConversation(conversation)}
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
                  <div className="flex items-center gap-1">
                    <div className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</div>
                    {conversation.unread && <div className="h-2 w-2 rounded-full bg-emerald-500"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
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
                <div className="text-sm font-bold text-emerald-600">
                  {activeConversation.product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
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
            ))}
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
      </div>
    </div>
  )
}
