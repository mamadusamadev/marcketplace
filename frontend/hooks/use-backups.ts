"use client"

import { useState, useEffect, useCallback } from "react"
import type { Backup, BackupStats, BackupSettings, BackupCreateOptions, BackupRestoreOptions } from "@/types/backup"

export function useBackups() {
  const [backups, setBackups] = useState<Backup[]>([])
  const [stats, setStats] = useState<BackupStats | null>(null)
  const [settings, setSettings] = useState<BackupSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [operationInProgress, setOperationInProgress] = useState(false)
  const [progressMessage, setProgressMessage] = useState("")
  const [progressPercentage, setProgressPercentage] = useState(0)

  // Fetch backups
  const fetchBackups = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/system/backups")
      if (!response.ok) {
        throw new Error("Failed to fetch backups")
      }
      const data = await response.json()
      setBackups(data.backups)
      setStats(data.stats)
      setSettings(data.settings)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  // Create backup
  const createBackup = useCallback(
    async (options: BackupCreateOptions) => {
      try {
        setOperationInProgress(true)
        setProgressMessage("Initiating backup creation...")
        setProgressPercentage(0)

        const response = await fetch("/api/system/backups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        })

        if (!response.ok) {
          throw new Error("Failed to create backup")
        }

        // Simulate progress updates
        const interval = setInterval(() => {
          setProgressPercentage((prev) => {
            if (prev >= 90) {
              clearInterval(interval)
              return 90
            }
            return prev + 10
          })
          setProgressMessage((prev) => {
            if (prev === "Initiating backup creation...") return "Backing up database..."
            if (prev === "Backing up database...") return "Backing up files..."
            if (prev === "Backing up files...") return "Backing up configuration..."
            if (prev === "Backing up configuration...") return "Compressing backup..."
            return "Finalizing backup..."
          })
        }, 1000)

        const data = await response.json()

        // Complete the progress
        clearInterval(interval)
        setProgressPercentage(100)
        setProgressMessage("Backup completed successfully!")

        // Refresh the backups list
        await fetchBackups()

        return data
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setProgressMessage("Backup failed!")
        throw err
      } finally {
        setTimeout(() => {
          setOperationInProgress(false)
          setProgressPercentage(0)
          setProgressMessage("")
        }, 2000)
      }
    },
    [fetchBackups],
  )

  // Restore backup
  const restoreBackup = useCallback(
    async (options: BackupRestoreOptions) => {
      try {
        setOperationInProgress(true)
        setProgressMessage("Initiating backup restoration...")
        setProgressPercentage(0)

        const response = await fetch(`/api/system/backups/${options.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        })

        if (!response.ok) {
          throw new Error("Failed to restore backup")
        }

        // Simulate progress updates
        const interval = setInterval(() => {
          setProgressPercentage((prev) => {
            if (prev >= 90) {
              clearInterval(interval)
              return 90
            }
            return prev + 10
          })
          setProgressMessage((prev) => {
            if (prev === "Initiating backup restoration...") return "Preparing for restoration..."
            if (prev === "Preparing for restoration...") return "Restoring database..."
            if (prev === "Restoring database...") return "Restoring files..."
            if (prev === "Restoring files...") return "Restoring configuration..."
            return "Finalizing restoration..."
          })
        }, 1000)

        const data = await response.json()

        // Complete the progress
        clearInterval(interval)
        setProgressPercentage(100)
        setProgressMessage("Restoration completed successfully!")

        // Refresh the backups list
        await fetchBackups()

        return data
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setProgressMessage("Restoration failed!")
        throw err
      } finally {
        setTimeout(() => {
          setOperationInProgress(false)
          setProgressPercentage(0)
          setProgressMessage("")
        }, 2000)
      }
    },
    [fetchBackups],
  )

  // Delete backup
  const deleteBackup = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/system/backups/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete backup")
        }

        // Refresh the backups list
        await fetchBackups()
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        throw err
      }
    },
    [fetchBackups],
  )

  // Download backup
  const downloadBackup = useCallback((id: string) => {
    window.open(`/api/system/backups/${id}`, "_blank")
  }, [])

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<BackupSettings>) => {
    try {
      const response = await fetch("/api/system/backups/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      })

      if (!response.ok) {
        throw new Error("Failed to update settings")
      }

      const data = await response.json()
      setSettings(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      throw err
    }
  }, [])

  // Load data on component mount
  useEffect(() => {
    fetchBackups()
  }, [fetchBackups])

  return {
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
  }
}
