import { Skeleton } from "@/components/ui/skeleton"
import BackupListSkeleton from "@/components/admin/backups/backup-list-skeleton"

export default function BackupsLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-5 w-2/4 mt-2" />
      </div>

      <div className="grid gap-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Backup List */}
        <BackupListSkeleton />

        {/* Settings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
