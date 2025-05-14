"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Home,
  Smartphone,
  Tv,
  Car,
  ShoppingBag,
  Shirt,
  Baby,
  Gamepad2,
  Bike,
  BookOpen,
  User,
  Heart,
  Bell,
  ShoppingCart,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const categories = [
  { icon: Home, label: "Casa e Jardim" },
  { icon: Smartphone, label: "Tecnologia" },
  { icon: Tv, label: "Eletrônicos" },
  { icon: Car, label: "Veículos" },
  { icon: ShoppingBag, label: "Moda" },
  { icon: Shirt, label: "Roupas" },
  { icon: Baby, label: "Bebê e Criança" },
  { icon: Gamepad2, label: "Jogos e Hobbies" },
  { icon: Bike, label: "Esportes" },
  { icon: BookOpen, label: "Livros" },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  // Check if user is logged in (simulated)


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogin = () => {
    router.push("/auth/login")
  }

 

  // Determine if we're in the client dashboard
  //const isClientDashboard = pathname?.startsWith("/cliente")
  // Determine if we're in the seller dashboard
  //const isSellerDashboard = pathname?.startsWith("/dashboard")

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">Mercado</span>
            <span className="text-2xl font-bold">Fácil</span>
          </Link>

          {/* Search - Desktop */}
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

          {/* Actions - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Categorias
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.label}>
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link href="/cliente/favoritos">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>

                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link href="/cliente/notificacoes">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                        variant="destructive"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="h-4 w-4" />
                      Minha Conta
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isSellerDashboard ? (
                      <DropdownMenuItem asChild>
                        <Link href="/cliente">Painel de Cliente</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href={isClientDashboard ? "/cliente" : "/cliente"}>
                          {isClientDashboard ? "Painel de Cliente" : "Minha Conta"}
                        </Link>
                      </DropdownMenuItem>
                    )}
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
                    <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogin}>
                Iniciar sessão
              </Button>
            )}

            <Button asChild>
              <Link
                href= "/auth/login"
                > 
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Comprar
                  </>
              
              </Link>
            </Button>

            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="pb-3 md:hidden">
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
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 border-b bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="container mx-auto divide-y px-4">
          <div className="py-3">
            <div className="grid grid-cols-2 gap-2">
              <Button asChild className="w-full">
                <Link
                  href="/auth/login"
                    
                >
        
                </Link>
              </Button>
              {isLoggedIn ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cliente">Minha Conta</Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleLogin}>
                  Iniciar sessão
                </Button>
              )}
            </div>
          </div>

          {isLoggedIn && (
            <div className="py-3">
              <div className="grid grid-cols-4 gap-4">
                <Link
                  href="/cliente/favoritos"
                  className="flex flex-col items-center gap-1 rounded-md p-2 text-center hover:bg-muted"
                >
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-xs">Favoritos</span>
                </Link>
                <Link
                  href="/cliente/mensagens"
                  className="flex flex-col items-center gap-1 rounded-md p-2 text-center hover:bg-muted"
                >
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-xs">Mensagens</span>
                </Link>
                <Link
                  href="/cliente/compras"
                  className="flex flex-col items-center gap-1 rounded-md p-2 text-center hover:bg-muted"
                >
                  <ShoppingBag className="h-5 w-5 text-emerald-500" />
                  <span className="text-xs">Compras</span>
                </Link>
                <Link
                  href="/cliente/notificacoes"
                  className="flex flex-col items-center gap-1 rounded-md p-2 text-center hover:bg-muted"
                >
                  <div className="relative">
                    <Bell className="h-5 w-5 text-amber-500" />
                    {unreadNotifications > 0 && (
                      <Badge
                        className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 text-[10px]"
                        variant="destructive"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs">Notificações</span>
                </Link>
              </div>
            </div>
          )}

          <div className="py-3">
            <div className="grid grid-cols-2 gap-y-2">
              {categories.map((category) => (
                <Link
                  key={category.label}
                  href="#"
                  className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <category.icon className="h-5 w-5 text-emerald-600" />
                  <span>{category.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {isLoggedIn && (
            <div className="py-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
