import Link from "next/link"
import { AlertCircle, FileText, HelpCircle } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex gap-6">
            <div>
              <Link href="/dashboard" className="flex items-center">
                <span className="text-lg font-bold text-emerald-600">Mercado</span>
                <span className="text-lg font-bold">Fácil</span>
                <span className="ml-1 text-xs text-muted-foreground">Vendedor</span>
              </Link>
            </div>

            <nav>
              <ul className="flex flex-wrap gap-4 text-sm">
                <li>
                  <Link
                    href="/dashboard/ajuda"
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Central de Ajuda</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/regras"
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Regras de Venda</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/contacto"
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Reportar Problema</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-4 text-xs text-muted-foreground md:mt-0">
            <p>© 2025 MercadoFácil. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
