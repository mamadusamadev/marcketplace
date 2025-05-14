"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Download, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReportLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  exportOptions?: string[]
  filterOptions?: {
    userTypes?: boolean
    categories?: boolean
    status?: boolean
  }
  viewOptions?: string[]
  onDateRangeChange?: (range: { from: Date; to: Date }) => void
  onFilterChange?: (filterType: string, value: string) => void
  onViewChange?: (view: string) => void
  onRefresh?: () => void
  onExport?: (format: string) => void
  isLoading?: boolean
}

export function ReportLayout({
  title,
  description,
  children,
  exportOptions = ["PDF", "Excel", "CSV"],
  filterOptions = {
    userTypes: true,
    categories: true,
    status: true,
  },
  viewOptions = ["Tabela", "Gráfico"],
  onDateRangeChange,
  onFilterChange,
  onViewChange,
  onRefresh,
  onExport,
  isLoading = false,
}: ReportLayoutProps) {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [view, setView] = useState(viewOptions[0])
  const [exportFormat, setExportFormat] = useState(exportOptions[0])

  const handleDateSelect = (selectedDate: { from?: Date; to?: Date }) => {
    const newDate = {
      from: selectedDate.from || date.from,
      to: selectedDate.to || date.to,
    }
    setDate(newDate)
    onDateRangeChange?.(newDate)
  }

  const handleViewChange = (newView: string) => {
    setView(newView)
    onViewChange?.(newView)
  }

  const handleExport = () => {
    onExport?.(exportFormat)
  }

  const handleRefresh = () => {
    onRefresh?.()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "P", { locale: ptBR })} - {format(date.to, "P", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "P", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Select defaultValue={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                {exportOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>

            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Refine os dados do relatório usando os filtros abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {filterOptions.userTypes && (
                <div className="w-full md:w-[200px]">
                  <Select defaultValue="all" onValueChange={(value) => onFilterChange?.("userType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Usuários</SelectItem>
                      <SelectItem value="customer">Clientes</SelectItem>
                      <SelectItem value="seller">Vendedores</SelectItem>
                      <SelectItem value="admin">Administradores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {filterOptions.categories && (
                <div className="w-full md:w-[200px]">
                  <Select defaultValue="all" onValueChange={(value) => onFilterChange?.("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      <SelectItem value="electronics">Eletrônicos</SelectItem>
                      <SelectItem value="fashion">Moda</SelectItem>
                      <SelectItem value="home">Casa & Decoração</SelectItem>
                      <SelectItem value="sports">Esportes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {filterOptions.status && (
                <div className="w-full md:w-[200px]">
                  <Select defaultValue="all" onValueChange={(value) => onFilterChange?.("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {viewOptions.length > 1 && (
          <Tabs defaultValue={view} className="w-full" onValueChange={handleViewChange}>
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              {viewOptions.map((option) => (
                <TabsTrigger key={option} value={option}>
                  {option}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {isLoading ? (
          <Card>
            <CardContent className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Carregando dados do relatório...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
