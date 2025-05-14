import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface AdminMetricCardProps {
  title: string
  value: string
  description?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function AdminMetricCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: AdminMetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline">
          <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
          {trend && trendValue && (
            <span
              className={cn(
                "ml-2 text-xs font-medium",
                trend === "up" ? "text-emerald-600" : "",
                trend === "down" ? "text-rose-600" : "",
                trend === "neutral" ? "text-muted-foreground" : "",
              )}
            >
              <span className="flex items-center">
                {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
                {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
                {trendValue}
              </span>
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
