import { RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LogsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-10 w-[300px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[130px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-10 w-full md:w-[200px]" />
                <Skeleton className="h-10 w-full md:w-[200px]" />
                <Skeleton className="h-10 w-full md:w-[200px]" />
                <Skeleton className="h-10 w-full flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-1">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>

        <Card>
          <CardContent className="flex h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Carregando logs do sistema...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
