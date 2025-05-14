"use client"

import type React from "react"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Bell, Heart, User, MessageCircle, ShoppingBag, ChevronDown, Home, LogOut } from "lucide-react"

export function ClienteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [unreadMessages, setUnreadMessages] = useState(2)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("isSellerAccount")
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname === path ? "bg-accent" : ""
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">Mercado</span>
            <span className="text-2xl font-bold">Fácil</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/cliente" passHref>
                  <Button variant="ghost" className={`${isActive("/cliente")}`}>
                    <Home className="mr-2 h-4 w-4" /> Início
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/produtos" passHref>
                  <Button variant="ghost">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Explorar
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden max-w-md flex-1 px-6 md:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="O que procura hoje?"
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cliente/notificacoes">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs" variant="destructive">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cliente/mensagens">
              <MessageCircle className="h-5 w-5" />
              {unreadMessages > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs" variant="destructive">
                  {unreadMessages}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Favorites */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cliente/favoritos">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <User className="h-4 w-4" />
                Minha Conta
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/cliente">Painel do Cliente</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cliente/favoritos">Favoritos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cliente/mensagens">Mensagens</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cliente/compras">Minhas Compras</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cliente/perfil">Meu Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cliente/configuracoes">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Área do Vendedor</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
