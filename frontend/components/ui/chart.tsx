import * as React from "react"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn("rounded-md border bg-card text-card-foreground shadow-sm", className)} ref={ref} {...props} />
  ),
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn("text-sm text-muted-foreground", className)} ref={ref} {...props} />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn("text-sm text-muted-foreground", className)} ref={ref} {...props} />
  ),
)
ChartLegend.displayName = "ChartLegend"

const ChartGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn("text-sm text-muted-foreground", className)} ref={ref} {...props} />
  ),
)
ChartGrid.displayName = "ChartGrid"

const ChartLine = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn("text-sm text-muted-foreground", className)} ref={ref} {...props} />
  ),
)
ChartLine.displayName = "ChartLine"

export { ChartContainer, ChartTooltip, ChartLegend, ChartGrid, ChartLine }
