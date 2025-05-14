"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  Users,
  Package,
  BarChart2,
  FileText,
  Shield,
  Settings,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Tag,
  AlertTriangle,
  FileBarChart,
  UserCheck,
  Database,
  Globe,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean
  toggleSidebar: () => void
}

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
  badge?: {
    content: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
}

export default function AdminSidebar({ className, collapsed, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  // Initialize open submenus based on current path
  useEffect(() => {
    const newOpenSubmenus: Record<string, boolean> = {}
    navItems.forEach((item) => {
      if (item.submenu && item.submenu.some((subitem) => pathname.startsWith(subitem.href))) {
        newOpenSubmenus[item.title] = true
      }
    })
    setOpenSubmenus(newOpenSubmenus)
  }, [pathname])

  const toggleSubmenu = (title: string) => {
    if (collapsed) return
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (href: string) => pathname === href
  const isSubActive = (href: string) => pathname.startsWith(href)

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
      submenu: [
        {
          title: "Todos os Usuários",
          href: "/admin/users",
          icon: <UserCheck className="h-4 w-4" />,
        },
        {
          title: "Vendedores",
          href: "/admin/users/sellers",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Moderação",
          href: "/admin/users/moderation",
          icon: <AlertTriangle className="h-4 w-4" />,
          badge: {
            content: "2",
            variant: "destructive",
          },
        },
      ],
    },
    {
      title: "Produtos",
      href: "/admin/products",
      icon: <Package className="h-4 w-4" />,
      submenu: [
        {
          title: "Todos os Produtos",
          href: "/admin/products",
          icon: <Package className="h-4 w-4" />,
        },
        {
          title: "Categorias",
          href: "/admin/products/categories",
          icon: <Tag className="h-4 w-4" />,
        },
        {
          title: "Moderação",
          href: "/admin/products/moderation",
          icon: <AlertTriangle className="h-4 w-4" />,
          badge: {
            content: "5",
            variant: "destructive",
          },
        },
      ],
    },
    {
      title: "Mensagens",
      href: "/admin/messages",
      icon: <MessageSquare className="h-4 w-4" />,
      badge: {
        content: "3",
        variant: "default",
      },
    },
    {
      title: "Relatórios",
      href: "/admin/reports",
      icon: <BarChart2 className="h-4 w-4" />,
      submenu: [
        {
          title: "Vendas",
          href: "/admin/reports/sales",
          icon: <FileBarChart className="h-4 w-4" />,
        },
        {
          title: "Usuários",
          href: "/admin/reports/users",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Tráfego",
          href: "/admin/reports/traffic",
          icon: <Globe className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Logs",
      href: "/admin/logs",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Segurança",
      href: "/admin/security",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      title: "Sistema",
      href: "/admin/system",
      icon: <Database className="h-4 w-4" />,
      submenu: [
        {
          title: "Configurações",
          href: "/admin/settings",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          title: "Backups",
          href: "/admin/system/backups",
          icon: <Database className="h-4 w-4" />,
        },
        {
          title: "Manutenção",
          href: "/admin/system/maintenance",
          icon: <AlertTriangle className="h-4 w-4" />,
        },
      ],
    },
  ]

  const renderNavItem = (item: NavItem) => {
    const isItemActive = isActive(item.href)
    const isItemSubActive = isSubActive(item.href)
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isSubmenuOpen = openSubmenus[item.title]

    if (collapsed) {
      return (
        <TooltipProvider key={item.title} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={hasSubmenu ? (isSubmenuOpen ? "#" : item.href) : item.href}
                onClick={
                  hasSubmenu
                    ? (e) => {
                        e.preventDefault()
                        toggleSubmenu(item.title)
                      }
                    : undefined
                }
              >
                <Button
                  variant={isItemActive || isItemSubActive ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 relative"
                >
                  {item.icon}
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium",
                        item.badge.variant === "destructive"
                          ? "bg-destructive text-destructive-foreground"
                          : item.badge.variant === "secondary"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground",
                      )}
                    >
                      {item.badge.content}
                    </span>
                  )}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {item.title}
              {item.badge && (
                <span
                  className={cn(
                    "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-medium",
                    item.badge.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground"
                      : item.badge.variant === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground",
                  )}
                >
                  {item.badge.content}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <div key={item.title}>
        <Button
          variant={isItemActive || (isItemSubActive && !hasSubmenu) ? "secondary" : "ghost"}
          className={cn("w-full justify-between", isItemSubActive && hasSubmenu && "bg-muted/50")}
          onClick={hasSubmenu ? () => toggleSubmenu(item.title) : undefined}
          asChild={!hasSubmenu}
        >
          {!hasSubmenu ? (
            <Link href={item.href}>
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </span>
              {item.badge && (
                <span
                  className={cn(
                    "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-medium ml-2",
                    item.badge.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground"
                      : item.badge.variant === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground",
                  )}
                >
                  {item.badge.content}
                </span>
              )}
            </Link>
          ) : (
            <>
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </span>
              <div className="flex items-center">
                {item.badge && (
                  <span
                    className={cn(
                      "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-medium mr-2",
                      item.badge.variant === "destructive"
                        ? "bg-destructive text-destructive-foreground"
                        : item.badge.variant === "secondary"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground",
                    )}
                  >
                    {item.badge.content}
                  </span>
                )}
                {isSubmenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </>
          )}
        </Button>

        {hasSubmenu && isSubmenuOpen && (
          <div className="ml-4 mt-1 space-y-1 pl-2 border-l">
            {item.submenu.map((subItem) => (
              <Button
                key={subItem.title}
                variant={isActive(subItem.href) ? "secondary" : "ghost"}
                className="w-full justify-between h-8"
                asChild
              >
                <Link href={subItem.href}>
                  <span className="flex items-center">
                    {subItem.icon}
                    <span className="ml-2 text-sm">{subItem.title}</span>
                  </span>
                  {subItem.badge && (
                    <span
                      className={cn(
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-medium",
                        subItem.badge.variant === "destructive"
                          ? "bg-destructive text-destructive-foreground"
                          : subItem.badge.variant === "secondary"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground",
                      )}
                    >
                      {subItem.badge.content}
                    </span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "h-full border-r bg-background transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Toggle button */}
      <div
        className="absolute -right-3 top-4 z-10 hidden cursor-pointer rounded-full border bg-background shadow-sm h-6 w-6 items-center justify-center lg:flex"
        onClick={toggleSidebar}
        role="button"
        tabIndex={0}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight className={cn("h-3 w-3 transition-transform", collapsed ? "rotate-180" : "")} />
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="py-4">
          <div className="px-3 py-2">
            {!collapsed && (
              <div className="mb-4 px-2">
                <h2 className="text-lg font-semibold tracking-tight">Administração</h2>
                <p className="text-xs text-muted-foreground">Gerencie sua plataforma</p>
              </div>
            )}
            <div className="space-y-1">{navItems.map(renderNavItem)}</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
