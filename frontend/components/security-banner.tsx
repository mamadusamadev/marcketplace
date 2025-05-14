import { ShieldCheck } from "lucide-react"

export default function SecurityBanner() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
      <ShieldCheck className="h-5 w-5 shrink-0" />
      <div>
        <p className="font-medium">Proteção ao Comprador</p>
        <p className="text-sm">Garantimos a devolução do dinheiro se o produto não corresponder à descrição.</p>
      </div>
    </div>
  )
}
