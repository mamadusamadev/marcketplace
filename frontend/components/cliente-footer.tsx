import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeartHandshake, HelpCircle, MessageSquare, Shield } from "lucide-react"

export function ClienteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 grid gap-6 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-base font-bold">Conta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cliente/perfil" className="text-muted-foreground hover:text-foreground">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link href="/cliente/compras" className="text-muted-foreground hover:text-foreground">
                  Minhas Compras
                </Link>
              </li>
              <li>
                <Link href="/cliente/favoritos" className="text-muted-foreground hover:text-foreground">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link href="/cliente/configuracoes" className="text-muted-foreground hover:text-foreground">
                  Configurações
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-bold">Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cliente/ajuda" className="text-muted-foreground hover:text-foreground">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/cliente/compras/devolucoes" className="text-muted-foreground hover:text-foreground">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link href="/cliente/ajuda/faq" className="text-muted-foreground hover:text-foreground">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/cliente/contato" className="text-muted-foreground hover:text-foreground">
                  Contactar Suporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-bold">Vantagens</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-muted-foreground">Compra 100% segura</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-muted-foreground">Chat direto com vendedores</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-muted-foreground">Suporte dedicado</span>
              </li>
              <li className="flex items-start gap-2">
                <HeartHandshake className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span className="text-muted-foreground">Resolução de disputas</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-bold">Aplicação móvel</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Descarregue a nossa app para uma experiência mais personalizada.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                App Store
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Google Play
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 text-center text-sm text-muted-foreground">
          <p>© 2025 MercadoFácil. Todos os direitos reservados.</p>
          <p className="mt-1">
            <Link href="/legal/privacidade" className="hover:underline">
              Política de Privacidade
            </Link>{" "}
            •{" "}
            <Link href="/legal/termos" className="hover:underline">
              Termos de Uso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
