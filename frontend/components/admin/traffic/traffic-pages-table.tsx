import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Page {
  url: string
  title: string
  visits: number
  uniqueVisitors: number
  bounceRate: number
  avgTimeOnPage: number
}

interface TrafficPagesTableProps {
  data: Page[]
}

export function TrafficPagesTable({ data }: TrafficPagesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Páginas Mais Visitadas</CardTitle>
        <CardDescription>Detalhes sobre as páginas mais visitadas do site</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Página</TableHead>
              <TableHead className="text-right">Visitas</TableHead>
              <TableHead className="text-right">Visitantes Únicos</TableHead>
              <TableHead className="text-right">Taxa de Rejeição</TableHead>
              <TableHead className="text-right">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page) => (
              <TableRow key={page.url}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{page.title}</div>
                    <div className="text-xs text-muted-foreground">{page.url}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{page.visits.toLocaleString()}</TableCell>
                <TableCell className="text-right">{page.uniqueVisitors.toLocaleString()}</TableCell>
                <TableCell className="text-right">{page.bounceRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{page.avgTimeOnPage.toFixed(2)} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
