import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReportMetricCardProps {
  title: string
  value: string
  description?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function ReportMetricCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: ReportMetricCardProps) {
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
                trend === "up" ? "text-emerald-600 dark:text-emerald-500" : "",
                trend === "down" ? "text-rose-600 dark:text-rose-500" : "",
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

interface ReportSummaryCardsProps {
  metrics: ReportMetricCardProps[]
}

export function ReportSummaryCards({ metrics }: ReportSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <ReportMetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
