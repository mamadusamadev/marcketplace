"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MessageCircle,
  ShoppingBag,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Home,
  Store,
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ClienteHeader } from "@/components/cliente-header"
import { ClienteFooter } from "@/components/cliente-footer"

const sidebarItems = [
  { icon: Home, label: "Início", href: "/cliente" },
  { icon: Heart, label: "Favoritos", href: "/cliente/favoritos" },
  { icon: MessageCircle, label: "Mensagens", href: "/cliente/mensagens" },
  { icon: ShoppingBag, label: "Minhas Compras", href: "/cliente/compras" },
  { icon: Bell, label: "Notificações", href: "/cliente/notificacoes" },
  { icon: User, label: "Meu Perfil", href: "/cliente/perfil" },
  { icon: Settings, label: "Configurações", href: "/cliente/configuracoes" },
  { icon: HelpCircle, label: "Central de Ajuda", href: "/cliente/ajuda" },
]

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSellerAccount, setIsSellerAccount] = useState(false)

  // Simulate login check
  useEffect(() => {
    // In a real app, you would check for a token in localStorage or cookies
    const token = localStorage.getItem("userToken")

    if (!token) {
      // Store the token for demo purposes
      localStorage.setItem("userToken", "demo-token")
    }

    // Check if user is a seller
    const sellerStatus = localStorage.getItem("isSellerAccount")
    setIsSellerAccount(sellerStatus === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    toast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta com sucesso.",
    })
    router.push("/")
  }

  const handleSellerToggle = (checked: boolean) => {
    setIsSellerAccount(checked)
    localStorage.setItem("isSellerAccount", checked.toString())

    if (checked) {
      toast({
        title: "Conta de vendedor ativada",
        description: "Você agora tem acesso ao painel de vendedor.",
      })
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ClienteHeader />

      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Mobile sidebar toggle */}
          <div className="flex items-center justify-between md:hidden">
            <h1 className="text-2xl font-bold">Minha Conta</h1>
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Sidebar */}
          <div
            className={cn(
              "fixed inset-0 z-50 bg-background p-4 md:static md:z-0 md:w-64 md:shrink-0 md:p-0",
              sidebarOpen ? "block" : "hidden md:block",
            )}
          >
            <div className="hidden items-center justify-between md:flex">
              <h1 className="text-2xl font-bold">Minha Conta</h1>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}

              <div className="mt-6 space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="seller-mode" className="text-sm font-medium">
                      Queres começar a vender?
                    </Label>
                    <p className="text-xs text-muted-foreground">Ativa tua conta de vendedor</p>
                  </div>
                  <Switch id="seller-mode" checked={isSellerAccount} onCheckedChange={handleSellerToggle} />
                </div>
                {isSellerAccount && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard">
                      <Store className="mr-2 h-4 w-4" />
                      Ir para Painel de Vendedor
                    </Link>
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                className="mt-4 w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>

      <ClienteFooter />
    </div>
  )
}
