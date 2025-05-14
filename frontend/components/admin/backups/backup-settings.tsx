"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Settings, Database, Lock } from "lucide-react"

export default function BackupSettings() {
  const [compressionLevel, setCompressionLevel] = useState(5)
  const [encryptBackups, setEncryptBackups] = useState(true)
  const [backupLocation, setBackupLocation] = useState("local")
  const [customPath, setCustomPath] = useState("/var/backups")
  const [includeUploads, setIncludeUploads] = useState(true)
  const [includeConfigs, setIncludeConfigs] = useState(true)
  const [includeDatabase, setIncludeDatabase] = useState(true)
  const [maxBackupSize, setMaxBackupSize] = useState("10")

  const handleSaveSettings = () => {
    // In a real application, this would save the settings to the server
    toast({
      title: "Configurações salvas",
      description: "As configurações de backup foram atualizadas com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
          <CardDescription>Configure as opções gerais para os backups do sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Nível de Compressão</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[compressionLevel]}
                min={1}
                max={9}
                step={1}
                onValueChange={(value) => setCompressionLevel(value[0])}
                className="flex-1"
              />
              <span className="w-8 text-center">{compressionLevel}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Níveis mais altos resultam em arquivos menores, mas o processo é mais lento
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-backup-size">Tamanho Máximo de Backup (GB)</Label>
            <Input
              id="max-backup-size"
              type="number"
              min="1"
              max="1000"
              value={maxBackupSize}
              onChange={(e) => setMaxBackupSize(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Limite o tamanho máximo de cada backup (0 = sem limite)</p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="encrypt-backups" className="flex flex-col space-y-1">
              <span>Criptografar Backups</span>
              <span className="font-normal text-sm text-muted-foreground">
                Aumenta a segurança, mas pode reduzir o desempenho
              </span>
            </Label>
            <Switch id="encrypt-backups" checked={encryptBackups} onCheckedChange={setEncryptBackups} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Conteúdo do Backup
          </CardTitle>
          <CardDescription>Selecione quais dados devem ser incluídos nos backups.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-database"
              checked={includeDatabase}
              onCheckedChange={(checked) => setIncludeDatabase(checked as boolean)}
            />
            <Label htmlFor="include-database">Banco de dados</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-uploads"
              checked={includeUploads}
              onCheckedChange={(checked) => setIncludeUploads(checked as boolean)}
            />
            <Label htmlFor="include-uploads">Arquivos de upload</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-configs"
              checked={includeConfigs}
              onCheckedChange={(checked) => setIncludeConfigs(checked as boolean)}
            />
            <Label htmlFor="include-configs">Arquivos de configuração</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Local de Armazenamento
          </CardTitle>
          <CardDescription>Configure onde os backups serão armazenados.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="backup-location">Local de Armazenamento</Label>
            <Select value={backupLocation} onValueChange={setBackupLocation}>
              <SelectTrigger id="backup-location">
                <SelectValue placeholder="Selecione o local de armazenamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Armazenamento Local</SelectItem>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                <SelectItem value="azure">Azure Blob Storage</SelectItem>
                <SelectItem value="ftp">Servidor FTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {backupLocation === "local" && (
            <div className="space-y-2">
              <Label htmlFor="custom-path">Caminho Personalizado</Label>
              <Input id="custom-path" value={customPath} onChange={(e) => setCustomPath(e.target.value)} />
              <p className="text-sm text-muted-foreground">
                Caminho absoluto no servidor onde os backups serão armazenados
              </p>
            </div>
          )}

          {backupLocation === "s3" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="s3-bucket">Nome do Bucket</Label>
                <Input id="s3-bucket" placeholder="meu-bucket-de-backups" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s3-region">Região</Label>
                <Input id="s3-region" placeholder="us-east-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s3-access-key">Chave de Acesso</Label>
                <Input id="s3-access-key" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s3-secret-key">Chave Secreta</Label>
                <Input id="s3-secret-key" type="password" />
              </div>
            </div>
          )}

          {/* Similar fields for other storage options would go here */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
