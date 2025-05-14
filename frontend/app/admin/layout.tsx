"use client"

import { useState, useEffect } from "react"
import type React from "react"
import AdminSidebar from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminFooter } from "@/components/admin-footer"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <AdminHeader onMenuClick={toggleMobileMenu} />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1 pt-16">
        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="h-full pt-16">
            <AdminSidebar collapsed={false} toggleSidebar={() => {}} className="w-full rounded-none border-r-0" />
          </div>
        </div>

        {/* Desktop sidebar - Fixed position, doesn't affect layout flow */}
        <div className="hidden lg:block">
          <div className="fixed top-16 bottom-0 left-0 z-30">
            <AdminSidebar
              collapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
              className={cn(sidebarCollapsed ? "w-16" : "w-64")}
            />
          </div>
        </div>

        {/* Main content - Using padding instead of margin for consistent centering */}
        <div className="flex-1 w-full">
          <div
            className={cn(
              "transition-all duration-300 mx-auto max-w-7xl px-4 py-6 md:px-6",
              "lg:pl-[calc(1rem+64px)]", // Base padding when collapsed
              !sidebarCollapsed && "lg:pl-[calc(1rem+256px)]", // Adjusted padding when expanded
            )}
          >
            {children}
          </div>
        </div>
      </div>

      <AdminFooter
        className={cn(
          "transition-all duration-300",
          "lg:pl-[calc(1rem+64px)]", // Base padding when collapsed
          !sidebarCollapsed && "lg:pl-[calc(1rem+256px)]", // Adjusted padding when expanded
        )}
      />
      <Toaster />
    </div>
  )
}
