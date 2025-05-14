"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [language, setLanguage] = useState("pt-PT")
  const [currency, setCurrency] = useState("EUR")

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Conta excluída",
      description: "Sua conta foi excluída permanentemente.",
      variant: "destructive",
    })
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Configurações</h2>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferências Gerais</CardTitle>
            <CardDescription>Gerencie suas preferências de idioma e moeda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
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
                <SelectTrigger id="currency">
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

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie suas configurações de segurança.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta.</p>
              </div>
              <Switch id="two-factor" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-alerts">Alertas de Login</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas quando sua conta for acessada de um novo dispositivo.
                </p>
              </div>
              <Switch id="login-alerts" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
          </CardFooter>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600 dark:text-red-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Zona de Perigo
            </CardTitle>
            <CardDescription className="text-red-600/80 dark:text-red-400/80">
              Ações irreversíveis que afetam sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600/90 dark:text-red-400/90">
              Excluir sua conta removerá permanentemente todos os seus dados, incluindo anúncios, mensagens e
              avaliações. Esta ação não pode ser desfeita.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Excluir Conta
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
