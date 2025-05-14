import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TrafficSource {
  source: string
  visits: number
  percentage: number
  bounceRate: number
  avgTimeOnSite: number
}

interface TrafficSourcesTableProps {
  data: TrafficSource[]
}

export function TrafficSourcesTable({ data }: TrafficSourcesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fontes de Tráfego</CardTitle>
        <CardDescription>Detalhes sobre as fontes de tráfego do site</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fonte</TableHead>
              <TableHead className="text-right">Visitas</TableHead>
              <TableHead className="text-right">Porcentagem</TableHead>
              <TableHead className="text-right">Taxa de Rejeição</TableHead>
              <TableHead className="text-right">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((source) => (
              <TableRow key={source.source}>
                <TableCell className="font-medium">{source.source}</TableCell>
                <TableCell className="text-right">{source.visits.toLocaleString()}</TableCell>
                <TableCell className="text-right">{source.percentage.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{source.bounceRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{source.avgTimeOnSite.toFixed(2)} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
