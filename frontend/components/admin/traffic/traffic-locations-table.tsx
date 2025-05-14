import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Location {
  location: string
  visits: number
  percentage: number
  bounceRate: number
  avgTimeOnSite: number
}

interface TrafficLocationsTableProps {
  data: Location[]
}

export function TrafficLocationsTable({ data }: TrafficLocationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localizações</CardTitle>
        <CardDescription>Detalhes sobre as localizações dos visitantes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Localização</TableHead>
              <TableHead className="text-right">Visitas</TableHead>
              <TableHead className="text-right">Porcentagem</TableHead>
              <TableHead className="text-right">Taxa de Rejeição</TableHead>
              <TableHead className="text-right">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((location) => (
              <TableRow key={location.location}>
                <TableCell className="font-medium">{location.location}</TableCell>
                <TableCell className="text-right">{location.visits.toLocaleString()}</TableCell>
                <TableCell className="text-right">{location.percentage.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{location.bounceRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{location.avgTimeOnSite.toFixed(2)} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
