"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Importe o componente Tabs
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, ShoppingBag, Tag, Heart, MessageCircle, AlertCircle, CheckCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock notifications data
const initialNotifications = [
  {
    id: "1",
    type: "product",
    title: "Novo preço para iPhone 13 Pro",
    message: "Um produto que você favoritou teve o preço reduzido em 10%.",
    time: "Há 2 horas",
    read: false,
    link: "/produtos/1",
  },
  {
    id: "2",
    type: "message",
    title: "Nova mensagem de Maria Santos",
    message: "Olá, este produto ainda está disponível?",
    time: "Há 5 horas",
    read: false,
    link: "/cliente/mensagens?seller=Maria%20Santos",
  },
  {
    id: "3",
    type: "order",
    title: "Pedido enviado",
    message: "Seu pedido #ORD-2023-002 foi enviado e está a caminho.",
    time: "Há 1 dia",
    read: true,
    link: "/cliente/compras/ORD-2023-002",
  },
  {
    id: "4",
    type: "alert",
    title: "Alerta de segurança",
    message: "Detectamos um novo acesso à sua conta. Foi você?",
    time: "Há 2 dias",
    read: true,
    link: "/cliente/configuracoes",
  },
  {
    id: "5",
    type: "product",
    title: "Produto de volta ao estoque",
    message: 'MacBook Pro 16" que você favoritou está de volta ao estoque.',
    time: "Há 3 dias",
    read: true,
    link: "/produtos/2",
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedTab, setSelectedTab] = useState("todas")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Tag className="h-5 w-5 text-emerald-500" />
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "order":
        return <ShoppingBag className="h-5 w-5 text-purple-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "favorite":
        return <Heart className="h-5 w-5 text-pink-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Todas as notificações marcadas como lidas",
      description: "Suas notificações foram atualizadas.",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso.",
    })
  }

  const deleteAllNotifications = () => {
    setNotifications([])
    toast({
      title: "Todas as notificações removidas",
      description: "Todas as suas notificações foram removidas.",
    })
  }

  const filteredNotifications =
    selectedTab === "todas"
      ? notifications
      : selectedTab === "nao_lidas"
        ? notifications.filter((notification) => !notification.read)
        : notifications.filter((notification) => notification.type === selectedTab)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notificações</h2>
        {unreadCount > 0 && (
          <Badge variant="secondary" className="text-sm">
            {unreadCount} não {unreadCount === 1 ? "lida" : "lidas"}
          </Badge>
        )}
      </div>

      {/* Substitua a seção de tabs pelo seguinte código: */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Tabs defaultValue="todas" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="nao_lidas">Não lidas</TabsTrigger>
            <TabsTrigger value="product">Produtos</TabsTrigger>
            <TabsTrigger value="order">Pedidos</TabsTrigger>
            <TabsTrigger value="message">Mensagens</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm" onClick={deleteAllNotifications} disabled={notifications.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar todas
          </Button>
        </div>
      </div>

      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="mt-1 rounded-full bg-muted p-2">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-primary"
                      asChild
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Link href={notification.link}>Ver detalhes</Link>
                    </Button>
                    {!notification.read && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Marcar como lida
                      </Button>
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-red-500"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-medium">Nenhuma notificação</h3>
          <p className="mb-6 text-muted-foreground">
            Você não tem notificações {selectedTab !== "todas" && `do tipo "${selectedTab}"`} no momento.
          </p>
          <Button asChild>
            <Link href="/produtos">Explorar Produtos</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
