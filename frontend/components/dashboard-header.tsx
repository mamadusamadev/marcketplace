"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, ChevronDown, LogOut, Package, Plus, Store, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const router = useRouter()
  const [unreadNotifications, setUnreadNotifications] = useState(2)

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("isSellerAccount")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="mr-4 flex items-center gap-2 rounded-md bg-emerald-600 px-2.5 py-1.5 text-white"
          >
            <Store className="h-5 w-5" />
            <span className="font-semibold">Painel de Vendedor</span>
          </Link>

          <Button variant="outline" size="sm" asChild>
            <Link href="/">Voltar ao site principal</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="default" asChild>
            <Link href="/dashboard/adicionar-produto">
              <Plus className="mr-1 h-4 w-4" /> Novo Produto
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/dashboard/notificacoes">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs" variant="destructive">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/diverse-avatars.png" />
                  <AvatarFallback>VD</AvatarFallback>
                </Avatar>
                <span>Minha Loja</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/diverse-avatars.png" />
                  <AvatarFallback>VD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">João Silva</p>
                  <p className="text-xs text-muted-foreground">joao@example.com</p>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Package className="mr-2 h-4 w-4" /> Meus Produtos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/conta">
                  <User className="mr-2 h-4 w-4" /> Detalhes da Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/configuracoes">Configurações da Loja</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/cliente">Mudar para Conta de Cliente</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
