export interface Backup {
    id: string
    name: string
    createdAt: string
    size: number
    status: "completed" | "in-progress" | "failed"
    type: "full" | "database" | "files" | "config"
    description?: string
    path?: string
  }
  
  export interface BackupStats {
    total: number
    completed: number
    failed: number
    storage: {
      used: number
      total: number
    }
    lastBackup: string | null
    nextScheduled: string | null
  }
  
  export interface BackupSettings {
    autoBackup: boolean
    schedule: "daily" | "weekly" | "monthly"
    retention: number
    includeDatabase: boolean
    includeFiles: boolean
    includeConfig: boolean
    compressionLevel: number
    encryptBackups: boolean
    storageLocation: "local" | "cloud"
    notifyOnCompletion: boolean
    notifyOnFailure: boolean
  }
  
  export interface BackupCreateOptions {
    name: string
    description?: string
    type: "full" | "database" | "files" | "config"
    compress: boolean
    encrypt: boolean
  }
  
  export interface BackupRestoreOptions {
    id: string
    restoreDatabase: boolean
    restoreFiles: boolean
    restoreConfig: boolean
    createBackupBeforeRestore: boolean
  }
  