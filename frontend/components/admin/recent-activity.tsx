import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  user: {
    name: string
    email: string
    image?: string
  }
  action: string
  target: string
  date: string
  status?: "success" | "warning" | "error" | "info"
}

const recentActivities: ActivityItem[] = [
  {
    id: "act-1",
    user: {
      name: "João Silva",
      email: "joao.silva@example.com",
      image: "/diverse-avatars.png",
    },
    action: "adicionou",
    target: "iPhone 13 Pro",
    date: "há 5 minutos",
    status: "success",
  },
  {
    id: "act-2",
    user: {
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      image: "/diverse-avatars.png",
    },
    action: "atualizou",
    target: "Configurações da conta",
    date: "há 15 minutos",
    status: "info",
  },
  {
    id: "act-3",
    user: {
      name: "Carlos Santos",
      email: "carlos.santos@example.com",
      image: "/diverse-avatars.png",
    },
    action: "removeu",
    target: "Produto expirado",
    date: "há 32 minutos",
    status: "warning",
  },
  {
    id: "act-4",
    user: {
      name: "Ana Pereira",
      email: "ana.pereira@example.com",
      image: "/diverse-avatars.png",
    },
    action: "bloqueou",
    target: "Usuário suspeito",
    date: "há 1 hora",
    status: "error",
  },
  {
    id: "act-5",
    user: {
      name: "Roberto Almeida",
      email: "roberto.almeida@example.com",
      image: "/diverse-avatars.png",
    },
    action: "aprovou",
    target: "Solicitação de vendedor",
    date: "há 2 horas",
    status: "success",
  },
]

export function AdminRecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>
              {activity.user.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span> <span>{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.date}</p>
          </div>
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              activity.status === "success" && "bg-emerald-500",
              activity.status === "warning" && "bg-amber-500",
              activity.status === "error" && "bg-rose-500",
              activity.status === "info" && "bg-blue-500",
            )}
          />
        </div>
      ))}
    </div>
  )
}
