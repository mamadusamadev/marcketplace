"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Mail, Phone } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [language, setLanguage] = useState("pt-PT")
  const [currency, setCurrency] = useState("EUR")
  const [notificationSettings, setNotificationSettings] = useState({
    emailMessages: true,
    emailOffers: true,
    emailMarketing: false,
    pushMessages: true,
    pushOffers: true,
    pushUpdates: true,
    smsMessages: false,
    smsOffers: false,
  })

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    })
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Configurações</h2>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Personalize a aparência da interface.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tema</Label>
                <p className="text-sm text-muted-foreground">
                  Escolha entre tema claro, escuro ou siga as configurações do sistema.
                </p>
              </div>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências Regionais</CardTitle>
            <CardDescription>Gerencie suas preferências de idioma e moeda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Selecione um idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder="Selecione uma moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                  <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                  <SelectItem value="GBP">Libra Esterlina (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings}>Salvar Preferências</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Gerencie como deseja receber notificações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Por Email</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-messages">Mensagens</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações quando alguém enviar uma mensagem.
                    </p>
                  </div>
                  <Switch
                    id="email-messages"
                    checked={notificationSettings.emailMessages}
                    onCheckedChange={() => handleNotificationChange("emailMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-offers">Ofertas</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações sobre ofertas em produtos que você favoritou.
                    </p>
                  </div>
                  <Switch
                    id="email-offers"
                    checked={notificationSettings.emailOffers}
                    onCheckedChange={() => handleNotificationChange("emailOffers")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing</Label>
                    <p className="text-xs text-muted-foreground">Receba emails sobre novidades e promoções.</p>
                  </div>
                  <Switch
                    id="email-marketing"
                    checked={notificationSettings.emailMarketing}
                    onCheckedChange={() => handleNotificationChange("emailMarketing")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Notificações Push</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-messages">Mensagens</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações push quando alguém enviar uma mensagem.
                    </p>
                  </div>
                  <Switch
                    id="push-messages"
                    checked={notificationSettings.pushMessages}
                    onCheckedChange={() => handleNotificationChange("pushMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-offers">Ofertas</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações push sobre ofertas em produtos que você favoritou.
                    </p>
                  </div>
                  <Switch
                    id="push-offers"
                    checked={notificationSettings.pushOffers}
                    onCheckedChange={() => handleNotificationChange("pushOffers")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-updates">Atualizações</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações push sobre atualizações de pedidos.
                    </p>
                  </div>
                  <Switch
                    id="push-updates"
                    checked={notificationSettings.pushUpdates}
                    onCheckedChange={() => handleNotificationChange("pushUpdates")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Por SMS</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-messages">Mensagens</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações por SMS quando alguém enviar uma mensagem.
                    </p>
                  </div>
                  <Switch
                    id="sms-messages"
                    checked={notificationSettings.smsMessages}
                    onCheckedChange={() => handleNotificationChange("smsMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-offers">Ofertas</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba notificações por SMS sobre ofertas em produtos que você favoritou.
                    </p>
                  </div>
                  <Switch
                    id="sms-offers"
                    checked={notificationSettings.smsOffers}
                    onCheckedChange={() => handleNotificationChange("smsOffers")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings}>Salvar Preferências</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacidade</CardTitle>
            <CardDescription>Gerencie suas configurações de privacidade.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visibility">Visibilidade do Perfil</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários vejam seu perfil e avaliações.
                </p>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="location-visibility">Mostrar Localização</Label>
                <p className="text-sm text-muted-foreground">Mostrar sua localização aproximada nos anúncios.</p>
              </div>
              <Switch id="location-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-tracking">Rastreamento de Atividade</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que coletemos dados sobre sua atividade para melhorar a experiência.
                </p>
              </div>
              <Switch id="activity-tracking" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
