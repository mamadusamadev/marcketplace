import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, MapPin, Phone, Mail, Calendar, Clock, AlertTriangle, ShoppingBag, DollarSign, Star } from "lucide-react"

interface SellerDetailsDialogProps {
  seller: any
  open: boolean
  onClose: () => void
}

export function SellerDetailsDialog({ seller, open, onClose }: SellerDetailsDialogProps) {
  if (!seller) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {seller.name}
            {seller.verificationStatus === "verified" && (
              <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 border-green-200">
                <Check className="mr-1 h-3 w-3" />
                Verificado
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{seller.email}</div>
                      <div className="text-sm text-muted-foreground">Email</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{seller.phone}</div>
                      <div className="text-sm text-muted-foreground">Telefone</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{seller.location}</div>
                      <div className="text-sm text-muted-foreground">Localização</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Status da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      {seller.status === "active" ? (
                        <Badge variant="default">Ativo</Badge>
                      ) : seller.status === "inactive" ? (
                        <Badge variant="secondary">Inativo</Badge>
                      ) : (
                        <Badge variant="destructive">Suspenso</Badge>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Status atual</div>
                      <div className="text-sm text-muted-foreground">
                        {seller.status === "active"
                          ? "Conta ativa e operacional"
                          : seller.status === "inactive"
                            ? "Conta temporariamente inativa"
                            : "Conta suspensa por violação de termos"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {format(seller.joinDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                      <div className="text-sm text-muted-foreground">Data de cadastro</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {format(seller.lastActive, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </div>
                      <div className="text-sm text-muted-foreground">Último acesso</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Avaliação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-4xl font-bold flex items-center">
                      {seller.rating.toFixed(1)}
                      <Star className="h-8 w-8 ml-2 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Baseado em avaliações de compradores
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-4xl font-bold flex items-center">
                      {seller.productsCount}
                      <ShoppingBag className="h-7 w-7 ml-2 text-blue-500" />
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">Produtos ativos na plataforma</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Receita Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-3xl font-bold flex items-center">
                      {formatCurrency(seller.revenue)}
                      <DollarSign className="h-7 w-7 ml-1 text-green-500" />
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    {seller.salesCount} vendas realizadas
                  </div>
                </CardContent>
              </Card>
            </div>

            {seller.hasDisputes && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center text-yellow-800">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                    Disputas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-800">
                    Este vendedor possui disputas ativas que precisam de atenção. Verifique a seção de disputas para
                    mais detalhes.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="products" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos do Vendedor</CardTitle>
                <CardDescription>Lista de produtos publicados por {seller.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Dados de produtos seriam carregados aqui de uma API real.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
                <CardDescription>Registro de vendas realizadas por {seller.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Dados de vendas seriam carregados aqui de uma API real.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
