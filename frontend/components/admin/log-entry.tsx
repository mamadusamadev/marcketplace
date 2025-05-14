import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, Info, Shield, User } from "lucide-react"

interface LogEntryProps {
  log: {
    id: string
    timestamp: Date
    user?: {
      id: string
      name?: string
      email?: string
      role: string
    }
    action: string
    description: string
    ip?: string
    userAgent?: string
    status: string
    details?: Record<string, any>
  }
}

export function LogEntry({ log }: LogEntryProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="success">Sucesso</Badge>
      case "error":
        return <Badge variant="destructive">Erro</Badge>
      case "warning":
        return <Badge variant="warning">Aviso</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "LOGIN":
        return <Badge variant="outline">Login</Badge>
      case "LOGIN_FAILED":
        return <Badge variant="outline">Login Falhou</Badge>
      case "PRODUCT_CREATE":
        return <Badge variant="outline">Criação de Produto</Badge>
      case "PRODUCT_UPDATE":
        return <Badge variant="outline">Atualização de Produto</Badge>
      case "PRODUCT_DELETE":
        return <Badge variant="outline">Remoção de Produto</Badge>
      case "PURCHASE":
        return <Badge variant="outline">Compra</Badge>
      case "ACCOUNT_CREATE":
        return <Badge variant="outline">Criação de Conta</Badge>
      case "USER_UPDATE":
        return <Badge variant="outline">Atualização de Usuário</Badge>
      case "BACKUP":
        return <Badge variant="outline">Backup do Sistema</Badge>
      case "ERROR":
        return <Badge variant="outline">Erro</Badge>
      case "REVIEW_CREATE":
        return <Badge variant="outline">Criação de Avaliação</Badge>
      case "PAYOUT_REQUEST":
        return <Badge variant="outline">Solicitação de Pagamento</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  const getUserIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-5 w-5 text-primary" />
      case "seller":
        return <User className="h-5 w-5 text-blue-500" />
      case "customer":
        return <User className="h-5 w-5 text-green-500" />
      case "system":
        return <Info className="h-5 w-5 text-amber-500" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  const getUserRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="default">Administrador</Badge>
      case "seller":
        return <Badge variant="blue">Vendedor</Badge>
      case "customer":
        return <Badge variant="green">Cliente</Badge>
      case "system":
        return <Badge variant="amber">Sistema</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getUserIcon(log.user?.role || "")}
              </div>
              <div>
                <div className="font-medium">
                  {log.user?.name || "Sistema"}{" "}
                  {log.user?.email && <span className="text-sm text-muted-foreground">({log.user.email})</span>}
                </div>
                <div className="text-sm text-muted-foreground">{format(log.timestamp, "PPpp", { locale: ptBR })}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {getStatusBadge(log.status)}
              {getActionBadge(log.action)}
              {log.user && getUserRoleBadge(log.user.role)}
            </div>
          </div>

          <p>{log.description}</p>

          {(log.ip || log.userAgent || log.details) && (
            <Collapsible className="w-full">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Detalhes adicionais</div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 p-0">
                    <span className="text-xs">Ver detalhes</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="rounded-md bg-muted p-4 text-sm">
                  {log.ip && (
                    <div className="mb-2">
                      <span className="font-medium">IP:</span> {log.ip}
                    </div>
                  )}
                  {log.userAgent && (
                    <div className="mb-2">
                      <span className="font-medium">User Agent:</span> {log.userAgent}
                    </div>
                  )}
                  {log.details && (
                    <div>
                      <span className="font-medium">Dados:</span>
                      <pre className="mt-1 overflow-x-auto whitespace-pre-wrap text-xs">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
