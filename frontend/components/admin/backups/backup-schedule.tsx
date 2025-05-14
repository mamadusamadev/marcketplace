"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Calendar } from "lucide-react"

export default function BackupSchedule() {
  const [enabled, setEnabled] = useState(true)
  const [frequency, setFrequency] = useState("daily")
  const [time, setTime] = useState("01:00")
  const [day, setDay] = useState("1")
  const [weekday, setWeekday] = useState("monday")
  const [retention, setRetention] = useState("30")
  const [notifications, setNotifications] = useState(true)

  const handleSaveSchedule = () => {
    // In a real application, this would save the schedule to the server
    toast({
      title: "Agendamento salvo",
      description: "O agendamento de backups foi atualizado com sucesso.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agendamento de Backups
        </CardTitle>
        <CardDescription>Configure quando os backups automáticos devem ser executados.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="schedule-enabled" className="flex flex-col space-y-1">
            <span>Backups Automáticos</span>
            <span className="font-normal text-sm text-muted-foreground">
              Ative para executar backups automaticamente
            </span>
          </Label>
          <Switch id="schedule-enabled" checked={enabled} onCheckedChange={setEnabled} />
        </div>

        {enabled && (
          <>
            <div className="space-y-4">
              <Label>Frequência</Label>
              <RadioGroup
                value={frequency}
                onValueChange={setFrequency}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Diário</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Semanal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Mensal</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-time">Horário</Label>
              <Input id="backup-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <p className="text-sm text-muted-foreground">
                Horário em que o backup será iniciado (horário do servidor)
              </p>
            </div>

            {frequency === "weekly" && (
              <div className="space-y-2">
                <Label htmlFor="weekday">Dia da Semana</Label>
                <Select value={weekday} onValueChange={setWeekday}>
                  <SelectTrigger id="weekday">
                    <SelectValue placeholder="Selecione o dia da semana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Segunda-feira</SelectItem>
                    <SelectItem value="tuesday">Terça-feira</SelectItem>
                    <SelectItem value="wednesday">Quarta-feira</SelectItem>
                    <SelectItem value="thursday">Quinta-feira</SelectItem>
                    <SelectItem value="friday">Sexta-feira</SelectItem>
                    <SelectItem value="saturday">Sábado</SelectItem>
                    <SelectItem value="sunday">Domingo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {frequency === "monthly" && (
              <div className="space-y-2">
                <Label htmlFor="day">Dia do Mês</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Selecione o dia do mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Se o dia selecionado não existir no mês atual, o último dia do mês será usado.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="retention">Retenção (dias)</Label>
              <Input
                id="retention"
                type="number"
                min="1"
                max="365"
                value={retention}
                onChange={(e) => setRetention(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Número de dias que os backups serão mantidos antes de serem excluídos automaticamente
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifications"
                checked={notifications}
                onCheckedChange={(checked) => setNotifications(checked as boolean)}
              />
              <Label htmlFor="notifications">Enviar notificações sobre falhas de backup</Label>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSchedule}>Salvar Agendamento</Button>
      </CardFooter>
    </Card>
  )
}
