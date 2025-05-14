"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Heart, MessageCircle, BarChart2, User, Settings, LogOut, Menu, X, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"

const sidebarItems = [
  { icon: Package, label: "Meus produtos", href: "/dashboard" },
  { icon: Heart, label: "Favoritos", href: "/dashboard/favoritos" },
  { icon: MessageCircle, label: "Mensagens", href: "/dashboard/mensagens" },
  { icon: BarChart2, label: "Estatísticas", href: "/dashboard/estatisticas" },
  { icon: User, label: "Conta", href: "/dashboard/conta" },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Simulate login check
  useEffect(() => {
    // In a real app, you would check for a token in localStorage or cookies
    const token = localStorage.getItem("userToken")

    if (!token) {
      // Store the token for demo purposes
      localStorage.setItem("userToken", "demo-token")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    toast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta com sucesso.",
    })
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

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

            <div className="mt-6 flex justify-center md:hidden">
              <Button asChild className="w-full">
                <Link href="/dashboard/adicionar-produto" onClick={() => setSidebarOpen(false)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Produto
                </Link>
              </Button>
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

      <DashboardFooter />
    </div>
  )
}
