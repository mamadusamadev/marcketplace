import { ReportLayout } from "@/components/admin/report-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function SellersLoading() {
  return (
    <ReportLayout
      title="Gerenciamento de Vendedores"
      description="Visualize, edite e gerencie as contas de vendedores da plataforma"
      exportOptions={["Excel", "CSV", "PDF"]}
      filterOptions={{
        userTypes: false,
        categories: false,
        status: true,
      }}
      viewOptions={["Tabela", "Cards"]}
      isLoading={true}
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-10 w-[200px]" />
            </div>

            <div className="border rounded-md">
              <div className="border-b h-12 px-4 flex items-center">
                <div className="grid grid-cols-9 w-full gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="border-b h-16 px-4 flex items-center">
                  <div className="grid grid-cols-9 w-full gap-4">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[200px]" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ReportLayout>
  )
}
