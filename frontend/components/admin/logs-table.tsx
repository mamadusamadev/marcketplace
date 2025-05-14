"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LogsTableProps {
  logs: any[]
}

export function LogsTable({ logs }: LogsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "success"
      case "error":
        return "destructive"
      case "warning":
        return "warning"
      case "pending":
        return "amber"
      default:
        return "outline"
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "seller":
        return "default"
      case "customer":
        return "secondary"
      case "system":
        return "blue"
      default:
        return "outline"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead className="w-[200px]">Usuário</TableHead>
            <TableHead className="w-[150px]">Ação</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[100px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <Collapsible key={log.id} open={expandedRows[log.id]} onOpenChange={() => toggleRow(log.id)} asChild>
              <>
                <TableRow className="group">
                  <TableCell className="p-2">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        {expandedRows[log.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle details</span>
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {format(log.timestamp, "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${log.user.name.substring(0, 2)}`}
                          alt={log.user.name}
                        />
                        <AvatarFallback>{log.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{log.user.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">{log.user.email}</span>
                          <Badge variant={getRoleBadgeVariant(log.user.role)} className="ml-1 px-1 py-0 text-[10px]">
                            {log.user.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="whitespace-nowrap">{log.action.replace("_", " ")}</span>
                  </TableCell>
                  <TableCell>
                    <span className="line-clamp-1">{log.description}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
                  </TableCell>
                </TableRow>
                <CollapsibleContent asChild>
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={6} className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Informações do Usuário</h4>
                            <div className="text-xs">
                              <p>
                                <span className="font-medium">Nome:</span> {log.user.name}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span> {log.user.email}
                              </p>
                              <p>
                                <span className="font-medium">Função:</span> {log.user.role}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Informações da Requisição</h4>
                            <div className="text-xs">
                              <p>
                                <span className="font-medium">IP:</span> {log.ip}
                              </p>
                              <p>
                                <span className="font-medium">User Agent:</span> {log.userAgent}
                              </p>
                              <p>
                                <span className="font-medium">Timestamp:</span>{" "}
                                {format(log.timestamp, "PPpp", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Detalhes Adicionais</h4>
                            <div className="text-xs">
                              {log.details &&
                                Object.entries(log.details).map(([key, value]) => (
                                  <p key={key}>
                                    <span className="font-medium">
                                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
                                    </span>{" "}
                                    {Array.isArray(value)
                                      ? (value as string[]).join(", ")
                                      : typeof value === "object"
                                        ? JSON.stringify(value)
                                        : String(value)}
                                  </p>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </>
            </Collapsible>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhum log encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
