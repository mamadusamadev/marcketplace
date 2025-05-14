import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Plataforma</CardTitle>
              <CardDescription>Configure as informações básicas da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nome da Plataforma</Label>
                <Input id="platform-name" defaultValue="Marketplace PT" placeholder="Nome da plataforma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-description">Descrição</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Marketplace de compra e venda de produtos novos e usados."
                  placeholder="Descrição da plataforma"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="contato@marketplace.pt"
                  placeholder="Email de contato"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-phone">Telefone de Suporte</Label>
                <Input id="support-phone" defaultValue="+351 123 456 789" placeholder="Telefone de suporte" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Regionais</CardTitle>
              <CardDescription>Configure as opções regionais da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma Padrão</Label>
                <Select defaultValue="pt">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda Padrão</Label>
                <Select defaultValue="eur">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecione uma moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                    <SelectItem value="gbp">Libra Esterlina (£)</SelectItem>
                    <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="europe-lisbon">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione um fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-lisbon">Europa/Lisboa (GMT+0)</SelectItem>
                    <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
                    <SelectItem value="america-saopaulo">América/São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="america-newyork">América/Nova York (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>Personalize a aparência da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Modo de Cor</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="light-mode" name="color-mode" defaultChecked />
                    <Label htmlFor="light-mode">Claro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="dark-mode" name="color-mode" />
                    <Label htmlFor="dark-mode">Escuro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="system-mode" name="color-mode" />
                    <Label htmlFor="system-mode">Sistema</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Cor Primária</Label>
                <div className="flex items-center space-x-2">
                  <Input id="primary-color" type="color" defaultValue="#6366f1" className="h-10 w-10 p-1" />
                  <Input defaultValue="#6366f1" className="flex-1" placeholder="Código da cor" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Cor de Destaque</Label>
                <div className="flex items-center space-x-2">
                  <Input id="accent-color" type="color" defaultValue="#0ea5e9" className="h-10 w-10 p-1" />
                  <Input defaultValue="#0ea5e9" className="flex-1" placeholder="Código da cor" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Raio de Borda</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="border-none" name="border-radius" />
                    <Label htmlFor="border-none">Nenhum</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="border-small" name="border-radius" />
                    <Label htmlFor="border-small">Pequeno</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="border-medium" name="border-radius" defaultChecked />
                    <Label htmlFor="border-medium">Médio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="border-large" name="border-radius" />
                    <Label htmlFor="border-large">Grande</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações por Email</CardTitle>
              <CardDescription>Configure as notificações enviadas por email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-marketing">Marketing</Label>
                  <p className="text-sm text-muted-foreground">Receba atualizações sobre novos produtos e promoções.</p>
                </div>
                <Switch id="email-marketing" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-security">Segurança</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas sobre atividades suspeitas na sua conta.
                  </p>
                </div>
                <Switch id="email-security" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-updates">Atualizações do Sistema</Label>
                  <p className="text-sm text-muted-foreground">Receba notificações sobre atualizações da plataforma.</p>
                </div>
                <Switch id="email-updates" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Receba nossa newsletter mensal.</p>
                </div>
                <Switch id="email-newsletter" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações do Sistema</CardTitle>
              <CardDescription>Configure as notificações exibidas na plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-messages">Mensagens</Label>
                  <p className="text-sm text-muted-foreground">Notificações sobre novas mensagens.</p>
                </div>
                <Switch id="system-messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-orders">Pedidos</Label>
                  <p className="text-sm text-muted-foreground">Notificações sobre atualizações de pedidos.</p>
                </div>
                <Switch id="system-orders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-comments">Comentários</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre novos comentários em seus produtos.
                  </p>
                </div>
                <Switch id="system-comments" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>Configure as opções de autenticação da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Exigir autenticação de dois fatores para todos os administradores.
                  </p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-complexity">Complexidade de Senha</Label>
                  <p className="text-sm text-muted-foreground">Exigir senhas fortes para todos os usuários.</p>
                </div>
                <Switch id="password-complexity" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tempo Limite da Sessão</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Selecione um tempo limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logs e Auditoria</CardTitle>
              <CardDescription>Configure as opções de registro e auditoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-logging">Registro de Atividades</Label>
                  <p className="text-sm text-muted-foreground">Registrar todas as atividades dos usuários.</p>
                </div>
                <Switch id="activity-logging" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="admin-logging">Registro de Administradores</Label>
                  <p className="text-sm text-muted-foreground">Registrar todas as ações dos administradores.</p>
                </div>
                <Switch id="admin-logging" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-retention">Retenção de Logs</Label>
                <Select defaultValue="90">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Selecione um período de retenção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">6 meses</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
