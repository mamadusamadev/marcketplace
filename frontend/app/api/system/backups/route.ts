import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, hasRole } from "@/lib/auth"

// GET /api/system/backups - List all backups
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)

    if (!user || !hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // In a real application, this would fetch backups from a database or file system
    const backups = [
      {
        id: "backup-1",
        name: "Backup Diário - 03/05/2025",
        status: "completed",
        createdAt: "2025-05-03T01:00:00Z",
        size: 1024 * 1024 * 256, // 256 MB
        type: "auto",
      },
      {
        id: "backup-2",
        name: "Backup Semanal - 27/04/2025",
        status: "completed",
        createdAt: "2025-04-27T01:00:00Z",
        size: 1024 * 1024 * 512, // 512 MB
        type: "auto",
      },
      {
        id: "backup-3",
        name: "Backup Manual - Atualização do Sistema",
        status: "completed",
        createdAt: "2025-04-20T15:30:00Z",
        size: 1024 * 1024 * 350, // 350 MB
        type: "manual",
      },
      {
        id: "backup-4",
        name: "Backup Diário - 02/05/2025",
        status: "failed",
        createdAt: "2025-05-02T01:00:00Z",
        size: 0,
        type: "auto",
        error: "Erro de conexão com o banco de dados",
      },
      {
        id: "backup-5",
        name: "Backup em Andamento",
        status: "in_progress",
        createdAt: new Date().toISOString(),
        size: 1024 * 1024 * 100, // 100 MB (partial)
        type: "manual",
      },
    ]

    const storageUsed = backups.reduce((total, backup) => total + backup.size, 0)
    const storageLimit = 1024 * 1024 * 1024 * 10 // 10 GB
    const lastBackupDate = new Date("2025-05-03T01:00:00Z")

    return NextResponse.json({
      backups,
      storageUsed,
      storageLimit,
      lastBackupDate,
    })
  } catch (error) {
    console.error("Error fetching backups:", error)
    return NextResponse.json({ error: "Erro ao buscar backups" }, { status: 500 })
  }
}

// POST /api/system/backups - Create a new backup
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)

    if (!user || !hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const data = await request.json()

    // In a real application, this would create a backup
    // For now, we'll just simulate a successful response

    const newBackup = {
      id: `backup-${Date.now()}`,
      name: data.name || `Backup Manual - ${new Date().toLocaleDateString("pt-BR")}`,
      status: "completed",
      createdAt: new Date().toISOString(),
      size: 1024 * 1024 * 300, // 300 MB
      type: "manual",
    }

    // Log the backup creation
    console.log("Backup created:", newBackup)

    return NextResponse.json(newBackup)
  } catch (error) {
    console.error("Error creating backup:", error)
    return NextResponse.json({ error: "Erro ao criar backup" }, { status: 500 })
  }
}
