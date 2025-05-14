import type { Metadata } from "next"
import BackupDashboard from "@/components/admin/backups/backup-dashboard"

export const metadata: Metadata = {
  title: "System Backups | Admin Dashboard",
  description: "Manage system backups, create new backups, restore from backups, and configure backup settings.",
}

export default function BackupsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Backups</h1>
        <p className="text-muted-foreground mt-2">
          Create, manage, and restore system backups to protect your marketplace data.
        </p>
      </div>

      <BackupDashboard />
    </div>
  )
}
