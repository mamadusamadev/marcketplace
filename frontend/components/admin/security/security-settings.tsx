"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Key, Lock, Save, Shield, ShieldAlert, Smartphone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock security settings
const securitySettings = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordHistory: 5,
    expiryDays: 90,
  },
  twoFactorAuth: {
    enforceForAdmins: true,
    enforceForAllUsers: false,
    allowedMethods: ["app", "email", "sms"],
    rememberDeviceDays: 30,
  },
  bruteForceProtection: {
    enabled: true,
    maxAttempts: 5,
    lockoutDuration: 30, // minutes
    incrementalLockout: true,
    notifyAdmin: true,
  },
  sessionSecurity: {
    idleTimeout: 15, // minutes
    absoluteTimeout: 480, // minutes (8 hours)
    enforceOneSessionPerUser: false,
    requireReauthForSensitiveActions: true,
  },
  dataProtection: {
    encryptSensitiveData: true,
    dataRetentionDays: 365,
    anonymizeDeletedUsers: true,
    allowDataExport: true,
    requireApprovalForBulkExport: true,
  },
}

export function SecuritySettings() {
  const [settings, setSettings] = useState(securitySettings)
  const [passwordStrength, setPasswordStrength] = useState(70)

  const handleSave = () => {
    // In a real app, this would save the settings to the backend
    console.log("Saving settings:", settings)
    // Show success message
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="password" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[800px]">
          <TabsTrigger value="password">Senhas</TabsTrigger>
          <TabsTrigger value="2fa">Autenticação 2FA</TabsTrigger>
          <TabsTrigger value="brute-force">Proteção</TabsTrigger>
          <TabsTrigger value="session">Sessões</TabsTrigger>
          <TabsTrigger value="data">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Política de Senhas</CardTitle>
                  <CardDescription>Configure os requisitos de senha para todos os usuários</CardDescription>
                </div>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <FormLabel>Força da senha</FormLabel>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[passwordStrength]}
                    max={100}
                    step={1}
                    className="flex-1"
                    onValueChange={(value) => setPasswordStrength(value[0])}
                  />
                  <Badge
                    variant={passwordStrength >= 80 ? "success" : passwordStrength >= 60 ? "warning" : "destructive"}
                  >
                    {passwordStrength >= 80 ? "Forte" : passwordStrength >= 60 ? "Média" : "Fraca"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Nível de segurança exigido para senhas de usuários</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <FormLabel>Comprimento mínimo</FormLabel>
                  <Select
                    defaultValue={settings.passwordPolicy.minLength.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          minLength: Number.parseInt(value),
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o comprimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 caracteres</SelectItem>
                      <SelectItem value="8">8 caracteres</SelectItem>
                      <SelectItem value="10">10 caracteres</SelectItem>
                      <SelectItem value="12">12 caracteres</SelectItem>
                      <SelectItem value="16">16 caracteres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <FormLabel>Histórico de senhas</FormLabel>
                  <Select
                    defaultValue={settings.passwordPolicy.passwordHistory.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          passwordHistory: Number.parseInt(value),
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o histórico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Desativado</SelectItem>
                      <SelectItem value="3">Últimas 3 senhas</SelectItem>
                      <SelectItem value="5">Últimas 5 senhas</SelectItem>
                      <SelectItem value="10">Últimas 10 senhas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <FormLabel>Expiração de senha</FormLabel>
                  <Select
                    defaultValue={settings.passwordPolicy.expiryDays.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          expiryDays: Number.parseInt(value),
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a expiração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Nunca</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>Requisitos de complexidade</FormLabel>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={settings.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          passwordPolicy: {
                            ...settings.passwordPolicy,
                            requireUppercase: checked === true,
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="uppercase"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Letras maiúsculas (A-Z)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={settings.passwordPolicy.requireLowercase}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          passwordPolicy: {
                            ...settings.passwordPolicy,
                            requireLowercase: checked === true,
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="lowercase"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Letras minúsculas (a-z)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={settings.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          passwordPolicy: {
                            ...settings.passwordPolicy,
                            requireNumbers: checked === true,
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="numbers"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Números (0-9)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="special"
                      checked={settings.passwordPolicy.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          passwordPolicy: {
                            ...settings.passwordPolicy,
                            requireSpecialChars: checked === true,
                          },
                        })
                      }
                    />
                    <label
                      htmlFor="special"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Caracteres especiais (!@#$%^&*)
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="2fa" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
                  <CardDescription>Configure as políticas de autenticação de dois fatores</CardDescription>
                </div>
                <Smartphone className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Recomendação de Segurança</AlertTitle>
                <AlertDescription>
                  Recomendamos fortemente ativar a autenticação de dois fatores para todos os usuários administradores.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Exigir 2FA para administradores</FormLabel>
                    <FormDescription>Todos os usuários com permissões de administrador devem usar 2FA</FormDescription>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth.enforceForAdmins}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: {
                          ...settings.twoFactorAuth,
                          enforceForAdmins: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Exigir 2FA para todos os usuários</FormLabel>
                    <FormDescription>Todos os usuários devem configurar e usar 2FA para fazer login</FormDescription>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth.enforceForAllUsers}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: {
                          ...settings.twoFactorAuth,
                          enforceForAllUsers: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <FormLabel>Métodos de 2FA permitidos</FormLabel>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="app"
                        checked={settings.twoFactorAuth.allowedMethods.includes("app")}
                        onCheckedChange={(checked) => {
                          const methods = [...settings.twoFactorAuth.allowedMethods]
                          if (checked) {
                            if (!methods.includes("app")) methods.push("app")
                          } else {
                            const index = methods.indexOf("app")
                            if (index > -1) methods.splice(index, 1)
                          }
                          setSettings({
                            ...settings,
                            twoFactorAuth: {
                              ...settings.twoFactorAuth,
                              allowedMethods: methods,
                            },
                          })
                        }}
                      />
                      <label
                        htmlFor="app"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Aplicativo Autenticador
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email"
                        checked={settings.twoFactorAuth.allowedMethods.includes("email")}
                        onCheckedChange={(checked) => {
                          const methods = [...settings.twoFactorAuth.allowedMethods]
                          if (checked) {
                            if (!methods.includes("email")) methods.push("email")
                          } else {
                            const index = methods.indexOf("email")
                            if (index > -1) methods.splice(index, 1)
                          }
                          setSettings({
                            ...settings,
                            twoFactorAuth: {
                              ...settings.twoFactorAuth,
                              allowedMethods: methods,
                            },
                          })
                        }}
                      />
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms"
                        checked={settings.twoFactorAuth.allowedMethods.includes("sms")}
                        onCheckedChange={(checked) => {
                          const methods = [...settings.twoFactorAuth.allowedMethods]
                          if (checked) {
                            if (!methods.includes("sms")) methods.push("sms")
                          } else {
                            const index = methods.indexOf("sms")
                            if (index > -1) methods.splice(index, 1)
                          }
                          setSettings({
                            ...settings,
                            twoFactorAuth: {
                              ...settings.twoFactorAuth,
                              allowedMethods: methods,
                            },
                          })
                        }}
                      />
                      <label
                        htmlFor="sms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        SMS
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <FormLabel>Lembrar dispositivo</FormLabel>
                  <Select
                    defaultValue={settings.twoFactorAuth.rememberDeviceDays.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: {
                          ...settings.twoFactorAuth,
                          rememberDeviceDays: Number.parseInt(value),
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Não lembrar</SelectItem>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="14">14 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Período para lembrar dispositivos confiáveis sem solicitar 2FA novamente
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="brute-force" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Proteção Contra Força Bruta</CardTitle>
                  <CardDescription>Configure as proteções contra tentativas de invasão por força bruta</CardDescription>
                </div>
                <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Ativar proteção contra força bruta</FormLabel>
                  <FormDescription>Bloqueia contas após múltiplas tentativas de login falhas</FormDescription>
                </div>
                <Switch
                  checked={settings.bruteForceProtection.enabled}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      bruteForceProtection: {
                        ...settings.bruteForceProtection,
                        enabled: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-1">
                <FormLabel>Número máximo de tentativas</FormLabel>
                <Select
                  defaultValue={settings.bruteForceProtection.maxAttempts.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      bruteForceProtection: {
                        ...settings.bruteForceProtection,
                        maxAttempts: Number.parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o número" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 tentativas</SelectItem>
                    <SelectItem value="5">5 tentativas</SelectItem>
                    <SelectItem value="10">10 tentativas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Número de tentativas de login falhas antes do bloqueio</p>
              </div>

              <div className="space-y-1">
                <FormLabel>Duração do bloqueio</FormLabel>
                <Select
                  defaultValue={settings.bruteForceProtection.lockoutDuration.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      bruteForceProtection: {
                        ...settings.bruteForceProtection,
                        lockoutDuration: Number.parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                    <SelectItem value="-1">Até desbloqueio manual</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Tempo que a conta permanecerá bloqueada</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Bloqueio incremental</FormLabel>
                  <FormDescription>Aumenta o tempo de bloqueio a cada tentativa falha consecutiva</FormDescription>
                </div>
                <Switch
                  checked={settings.bruteForceProtection.incrementalLockout}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      bruteForceProtection: {
                        ...settings.bruteForceProtection,
                        incrementalLockout: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Notificar administrador</FormLabel>
                  <FormDescription>Envia notificação ao administrador quando uma conta for bloqueada</FormDescription>
                </div>
                <Switch
                  checked={settings.bruteForceProtection.notifyAdmin}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      bruteForceProtection: {
                        ...settings.bruteForceProtection,
                        notifyAdmin: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="session" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Segurança de Sessão</CardTitle>
                  <CardDescription>Configure as políticas de segurança para sessões de usuários</CardDescription>
                </div>
                <Key className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <FormLabel>Tempo limite de inatividade</FormLabel>
                <Select
                  defaultValue={settings.sessionSecurity.idleTimeout.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      sessionSecurity: {
                        ...settings.sessionSecurity,
                        idleTimeout: Number.parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Tempo até que um usuário inativo seja desconectado</p>
              </div>

              <div className="space-y-1">
                <FormLabel>Tempo limite absoluto</FormLabel>
                <Select
                  defaultValue={settings.sessionSecurity.absoluteTimeout.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      sessionSecurity: {
                        ...settings.sessionSecurity,
                        absoluteTimeout: Number.parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                    <SelectItem value="480">8 horas</SelectItem>
                    <SelectItem value="720">12 horas</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tempo máximo que uma sessão pode durar, independente da atividade
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Uma sessão por usuário</FormLabel>
                  <FormDescription>Limita cada usuário a apenas uma sessão ativa por vez</FormDescription>
                </div>
                <Switch
                  checked={settings.sessionSecurity.enforceOneSessionPerUser}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      sessionSecurity: {
                        ...settings.sessionSecurity,
                        enforceOneSessionPerUser: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Reautenticação para ações sensíveis</FormLabel>
                  <FormDescription>Exige que o usuário confirme sua senha para ações sensíveis</FormDescription>
                </div>
                <Switch
                  checked={settings.sessionSecurity.requireReauthForSensitiveActions}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      sessionSecurity: {
                        ...settings.sessionSecurity,
                        requireReauthForSensitiveActions: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Proteção de Dados</CardTitle>
                  <CardDescription>Configure as políticas de proteção e retenção de dados</CardDescription>
                </div>
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Criptografar dados sensíveis</FormLabel>
                  <FormDescription>
                    Aplica criptografia adicional para dados sensíveis no banco de dados
                  </FormDescription>
                </div>
                <Switch
                  checked={settings.dataProtection.encryptSensitiveData}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      dataProtection: {
                        ...settings.dataProtection,
                        encryptSensitiveData: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-1">
                <FormLabel>Período de retenção de dados</FormLabel>
                <Select
                  defaultValue={settings.dataProtection.dataRetentionDays.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      dataProtection: {
                        ...settings.dataProtection,
                        dataRetentionDays: Number.parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">180 dias</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                    <SelectItem value="730">2 anos</SelectItem>
                    <SelectItem value="1825">5 anos</SelectItem>
                    <SelectItem value="0">Indefinidamente</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Período para manter dados de usuários inativos ou excluídos
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Anonimizar usuários excluídos</FormLabel>
                  <FormDescription>Substitui dados pessoais por valores anônimos ao excluir usuários</FormDescription>
                </div>
                <Switch
                  checked={settings.dataProtection.anonymizeDeletedUsers}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      dataProtection: {
                        ...settings.dataProtection,
                        anonymizeDeletedUsers: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Permitir exportação de dados</FormLabel>
                  <FormDescription>Permite que usuários exportem seus dados pessoais</FormDescription>
                </div>
                <Switch
                  checked={settings.dataProtection.allowDataExport}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      dataProtection: {
                        ...settings.dataProtection,
                        allowDataExport: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Exigir aprovação para exportação em massa</FormLabel>
                  <FormDescription>
                    Requer aprovação de administrador para exportações de dados em massa
                  </FormDescription>
                </div>
                <Switch
                  checked={settings.dataProtection.requireApprovalForBulkExport}
                  onValueChange={(checked) =>
                    setSettings({
                      ...settings,
                      dataProtection: {
                        ...settings.dataProtection,
                        requireApprovalForBulkExport: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
