"use client"

import { useState } from "react"
import { useBackups } from "@/hooks/use-backups"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BackupList from "./backup-list"
import BackupStats from "./backup-stats"
import BackupSchedule from "./backup-schedule"
import BackupSettings from "./backup-settings"
import BackupCreateDialog from "./backup-create-dialog"
import BackupProgressDialog from "./backup-progress-dialog"
import BackupListSkeleton from "./backup-list-skeleton"

export default function BackupDashboard() {
  const {
    backups,
    stats,
    settings,
    loading,
    error,
    operationInProgress,
    progressMessage,
    progressPercentage,
    fetchBackups,
    createBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    updateSettings,
  } = useBackups()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <>
      <Tabs defaultValue="backups" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchBackups()}
              disabled={loading || operationInProgress}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)} disabled={loading || operationInProgress}>
              Create Backup
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <TabsContent value="backups" className="space-y-6">
          {stats && <BackupStats stats={stats} />}

          {loading ? (
            <BackupListSkeleton />
          ) : (
            <BackupList
              backups={backups}
              onDelete={deleteBackup}
              onRestore={restoreBackup}
              onDownload={downloadBackup}
            />
          )}
        </TabsContent>

        <TabsContent value="schedule">
          {settings && (
            <BackupSchedule settings={settings} onUpdate={updateSettings} disabled={loading || operationInProgress} />
          )}
        </TabsContent>

        <TabsContent value="settings">
          {settings && (
            <BackupSettings settings={settings} onUpdate={updateSettings} disabled={loading || operationInProgress} />
          )}
        </TabsContent>
      </Tabs>

      <BackupCreateDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSubmit={createBackup} />

      <BackupProgressDialog open={operationInProgress} message={progressMessage} progress={progressPercentage} />
    </>
  )
}
