import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DeviceType {
  device: string
  visits: number
  percentage: number
  bounceRate: number
  avgTimeOnSite: number
}

interface TrafficDevicesTableProps {
  data: DeviceType[]
}

export function TrafficDevicesTable({ data }: TrafficDevicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispositivos</CardTitle>
        <CardDescription>Detalhes sobre os dispositivos usados para acessar o site</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dispositivo</TableHead>
              <TableHead className="text-right">Visitas</TableHead>
              <TableHead className="text-right">Porcentagem</TableHead>
              <TableHead className="text-right">Taxa de Rejeição</TableHead>
              <TableHead className="text-right">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((device) => (
              <TableRow key={device.device}>
                <TableCell className="font-medium">{device.device}</TableCell>
                <TableCell className="text-right">{device.visits.toLocaleString()}</TableCell>
                <TableCell className="text-right">{device.percentage.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{device.bounceRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{device.avgTimeOnSite.toFixed(2)} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
