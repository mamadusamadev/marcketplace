import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AdminAlertCardProps {
  title: string
  description: string
  variant?: "info" | "warning" | "success" | "error"
  icon?: React.ReactNode
  timestamp?: string
  actionLink?: string
  actionText?: string
}

export function AdminAlertCard({
  title,
  description,
  variant = "info",
  icon,
  timestamp,
  actionLink,
  actionText,
}: AdminAlertCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg border p-4",
        variant === "info" && "border-blue-200 bg-blue-50 dark:border-blue-950 dark:bg-blue-950/20",
        variant === "warning" && "border-amber-200 bg-amber-50 dark:border-amber-950 dark:bg-amber-950/20",
        variant === "success" && "border-emerald-200 bg-emerald-50 dark:border-emerald-950 dark:bg-emerald-950/20",
        variant === "error" && "border-rose-200 bg-rose-50 dark:border-rose-950 dark:bg-rose-950/20",
      )}
    >
      {icon && (
        <div
          className={cn(
            "mt-1 flex h-8 w-8 items-center justify-center rounded-full",
            variant === "info" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            variant === "warning" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            variant === "success" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            variant === "error" && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4
            className={cn(
              "font-medium",
              variant === "info" && "text-blue-700 dark:text-blue-400",
              variant === "warning" && "text-amber-700 dark:text-amber-400",
              variant === "success" && "text-emerald-700 dark:text-emerald-400",
              variant === "error" && "text-rose-700 dark:text-rose-400",
            )}
          >
            {title}
          </h4>
          {timestamp && <span className="text-xs text-muted-foreground">{timestamp}</span>}
        </div>
        <p
          className={cn(
            "mt-1 text-sm",
            variant === "info" && "text-blue-600 dark:text-blue-300",
            variant === "warning" && "text-amber-600 dark:text-amber-300",
            variant === "success" && "text-emerald-600 dark:text-emerald-300",
            variant === "error" && "text-rose-600 dark:text-rose-300",
          )}
        >
          {description}
        </p>
        {actionLink && actionText && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 text-xs",
                variant === "info" && "text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30",
                variant === "warning" &&
                  "text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/30",
                variant === "success" &&
                  "text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/30",
                variant === "error" && "text-rose-700 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-900/30",
              )}
              asChild
            >
              <Link href={actionLink}>
                {actionText}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
