import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MercadoFácil - Compra e venda online",
  description: "Plataforma de compra e venda de produtos novos e usados",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if route is part of a specialized area that has its own header/footer
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const isSpecializedArea =
    pathname.startsWith("/cliente") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth")

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Only show main Header and Footer on main site pages */}
          {!isSpecializedArea && <Header />}

          <div className="min-h-screen">{children}</div>

          {!isSpecializedArea && <Footer />}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
