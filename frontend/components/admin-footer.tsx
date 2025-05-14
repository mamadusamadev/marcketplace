import { cn } from "@/lib/utils"

interface AdminFooterProps {
  className?: string
}

export function AdminFooter({ className }: AdminFooterProps) {
  return (
    <footer className={cn("border-t bg-background py-4", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Marketplace. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Ajuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
