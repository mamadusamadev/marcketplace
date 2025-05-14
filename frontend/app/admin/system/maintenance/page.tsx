"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  RefreshCw,
  Database,
  HardDrive,
  Server,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Trash2,
  Archive,
  Users,
  Eye,
} from "lucide-react"

export default function SystemMaintenancePage() {
  const { toast } = useToast()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [optimizingDatabase, setOptimizingDatabase] = useState(false)
  const [cleaningCache, setCleaningCache] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [backupInProgress, setBackupInProgress] = useState(false)

  // Toggle maintenance mode
  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode)
    toast({
      title: !maintenanceMode ? "Modo de manutenção ativado" : "Modo de manutenção desativado",
      description: !maintenanceMode
        ? "O site está agora em modo de manutenção. Apenas administradores podem acessá-lo."
        : "O site está agora acessível para todos os usuários.",
    })
  }

  // Start database optimization
  const startDatabaseOptimization = () => {
    setOptimizingDatabase(true)
    toast({
      title: "Otimização de banco de dados iniciada",
      description: "Este processo pode levar alguns minutos.",
    })

    // Simulate optimization process
    setTimeout(() => {
      setOptimizingDatabase(false)
      toast({
        title: "Otimização de banco de dados concluída",
        description: "O banco de dados foi otimizado com sucesso.",
        variant: "success",
      })
    }, 5000)
  }

  // Clean cache
  const cleanCache = () => {
    setCleaningCache(true)
    toast({
      title: "Limpeza de cache iniciada",
      description: "Este processo pode levar alguns segundos.",
    })

    // Simulate cache cleaning process
    setTimeout(() => {
      setCleaningCache(false)
      toast({
        title: "Limpeza de cache concluída",
        description: "O cache foi limpo com sucesso.",
        variant: "success",
      })
    }, 3000)
  }

  // Start backup
  const startBackup = () => {
    setBackupInProgress(true)
    setBackupProgress(0)

    toast({
      title: "Backup iniciado",
      description: "O backup está em andamento. Por favor, aguarde.",
    })

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setBackupInProgress(false)
          toast({
            title: "Backup concluído",
            description: "O backup foi concluído com sucesso.",
            variant: "success",
          })
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manutenção do Sistema</h2>
        <p className="text-muted-foreground">Gerencie e mantenha o sistema em funcionamento ideal.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium">Operacional</span>
              </div>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              >
                100% Uptime
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uso de CPU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Atual</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uso de Memória</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Atual</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uso de Disco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Atual</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="maintenance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>Manutenção</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Banco de Dados</span>
          </TabsTrigger>
          <TabsTrigger value="backups" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            <span>Backups</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span>Logs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modo de Manutenção</CardTitle>
              <CardDescription>
                Ative o modo de manutenção para impedir o acesso de usuários enquanto realiza atualizações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
                  <p className="text-sm text-muted-foreground">
                    Quando ativado, apenas administradores podem acessar o site.
                  </p>
                </div>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={toggleMaintenanceMode} />
              </div>
              {maintenanceMode && (
                <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h4 className="font-medium text-amber-600 dark:text-amber-400">Modo de Manutenção Ativo</h4>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                        O site está atualmente em modo de manutenção. Apenas administradores podem acessá-lo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant={maintenanceMode ? "destructive" : "default"} onClick={toggleMaintenanceMode}>
                {maintenanceMode ? "Desativar Modo de Manutenção" : "Ativar Modo de Manutenção"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limpeza de Cache</CardTitle>
              <CardDescription>Limpe o cache do sistema para liberar espaço e melhorar o desempenho.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Cache de Aplicação</span>
                      </div>
                      <Badge variant="outline">245 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Cache de Consultas</span>
                      </div>
                      <Badge variant="outline">128 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Arquivos Temporários</span>
                      </div>
                      <Badge variant="outline">512 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Cache de Sessão</span>
                      </div>
                      <Badge variant="outline">64 MB</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={cleanCache} disabled={cleaningCache}>
                {cleaningCache ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Limpando Cache...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar Todo o Cache
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Otimização de Banco de Dados</CardTitle>
              <CardDescription>
                Otimize o banco de dados para melhorar o desempenho e reduzir o espaço de armazenamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Status do Banco de Dados</h4>
                    <p className="text-sm text-muted-foreground">Última otimização: 3 dias atrás</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                  >
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Otimização Recomendada
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Estatísticas do Banco de Dados</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Tamanho Total</span>
                      <span className="text-2xl font-bold">4.2 GB</span>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Tabelas</span>
                      <span className="text-2xl font-bold">48</span>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Índices</span>
                      <span className="text-2xl font-bold">124</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Tarefas de Otimização</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Reindexação de tabelas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Remoção de dados temporários</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Otimização de consultas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Compactação de dados</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startDatabaseOptimization} disabled={optimizingDatabase}>
                {optimizingDatabase ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Otimizando...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Iniciar Otimização
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Backups</CardTitle>
              <CardDescription>Crie e gerencie backups do sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Status de Backup</h4>
                    <p className="text-sm text-muted-foreground">Último backup completo: Hoje, 04:30</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Atualizado
                  </Badge>
                </div>
              </div>

              {backupInProgress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Progresso do Backup</h4>
                    <span className="text-sm">{backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Backups Recentes</h4>
                <div className="rounded-md border">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Backup Completo</p>
                        <p className="text-sm text-muted-foreground">Hoje, 04:30</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">4.8 GB</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Backup Completo</p>
                        <p className="text-sm text-muted-foreground">Ontem, 04:30</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">4.7 GB</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Backup Completo</p>
                        <p className="text-sm text-muted-foreground">15/05/2023, 04:30</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">4.6 GB</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Configurações de Backup</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">Realizar backups automáticos diariamente.</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cloud-backup">Backup na Nuvem</Label>
                      <p className="text-sm text-muted-foreground">Armazenar backups em serviços de nuvem.</p>
                    </div>
                    <Switch id="cloud-backup" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startBackup} disabled={backupInProgress}>
                {backupInProgress ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Backup em Andamento...
                  </>
                ) : (
                  <>
                    <Archive className="mr-2 h-4 w-4" />
                    Iniciar Backup Manual
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Logs</CardTitle>
              <CardDescription>Visualize e gerencie os logs do sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Espaço Utilizado por Logs</h4>
                    <p className="text-sm text-muted-foreground">Total de 1.2 GB em arquivos de log</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar Logs Antigos
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Tipos de Logs</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Logs de Erro</span>
                      </div>
                      <Badge variant="outline">245 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Logs de Segurança</span>
                      </div>
                      <Badge variant="outline">380 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-emerald-500" />
                        <span className="font-medium">Logs de Sistema</span>
                      </div>
                      <Badge variant="outline">420 MB</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Logs de Acesso</span>
                      </div>
                      <Badge variant="outline">155 MB</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Configurações de Retenção</h4>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Logs de Erro</p>
                        <p className="text-sm text-muted-foreground">Retenção de 90 dias</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Logs de Segurança</p>
                        <p className="text-sm text-muted-foreground">Retenção de 365 dias</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Logs de Sistema</p>
                        <p className="text-sm text-muted-foreground">Retenção de 30 dias</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Logs de Acesso</p>
                        <p className="text-sm text-muted-foreground">Retenção de 60 dias</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Ativo
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Logs
              </Button>
              <Button>
                <Eye className="mr-2 h-4 w-4" />
                Ver Todos os Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
