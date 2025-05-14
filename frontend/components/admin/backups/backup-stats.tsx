import type { BackupStats as BackupStatsType } from "@/types/backup"

interface BackupStatsProps {
  stats: BackupStatsType
}

export default function BackupStats({ stats }: BackupStatsProps) {
  // Format storage
  const formatStorage = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
}
