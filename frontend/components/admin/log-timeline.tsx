"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface LogTimelineProps {
  logs: any[]
}

export function LogTimeline({ logs }: LogTimelineProps) {
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({})

  const toggleLog = (id: string) => {
    setExpandedLogs((prev) => ({
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

  // Group logs by date
  const groupedLogs: Record<string, any[]> = {}
  logs.forEach((log) => {
    const date = format(log.timestamp, "yyyy-MM-dd")
    if (!groupedLogs[date]) {
      groupedLogs[date] = []
    }
    groupedLogs[date].push(log)
  })

  return (
    <div className="space-y-8">
      {Object.entries(groupedLogs).map(([date, dateLogs]) => (
        <div key={date} className="space-y-4">
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-background py-2">
            <div className="h-px flex-1 bg-border"></div>
            <h3 className="text-sm font-medium">
              {format(new Date(date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </h3>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <div className="space-y-4">
            {dateLogs.map((log) => (
              <Collapsible key={log.id} open={expandedLogs[log.id]} onOpenChange={() => toggleLog(log.id)}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${log.user.name.substring(0, 2)}`}
                              alt={log.user.name}
                            />
                            <AvatarFallback>{log.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="mt-1 h-full w-0.5 bg-border"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{log.user.name}</span>
                            <Badge variant={getRoleBadgeVariant(log.user.role)} className="px-1 py-0 text-[10px]">
                              {log.user.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(log.timestamp, "HH:mm:ss", { locale: ptBR })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.user.email}</p>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <Badge variant="outline" className="capitalize">
                              {log.action.replace("_", " ")}
                            </Badge>
                            <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
                          </div>
                          <p className="pt-2 text-sm">{log.description}</p>
                        </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {expandedLogs[log.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle details</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </CardContent>
                  <CollapsibleContent>
                    <CardFooter className="border-t bg-muted/50 px-4 py-3">
                      <div className="w-full space-y-4">
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
                    </CardFooter>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
