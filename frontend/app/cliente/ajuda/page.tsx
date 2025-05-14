import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, HelpCircle, MessageSquare, FileText, Phone } from "lucide-react"
import Link from "next/link"

// Mock FAQ data
const faqItems = [
  {
    question: "Como faço para comprar um produto?",
    answer:
      "Para comprar um produto, navegue até a página do produto desejado, clique no botão 'Comprar' ou 'Contactar vendedor' para iniciar uma negociação. Você pode fazer o pagamento através da plataforma ou combinar diretamente com o vendedor.",
  },
  {
    question: "Como posso rastrear meu pedido?",
    answer:
      "Você pode rastrear seu pedido na seção 'Minhas Compras' do seu painel de cliente. Lá você encontrará informações sobre o status do pedido e, quando disponível, o número de rastreamento para acompanhar a entrega.",
  },
  {
    question: "O que fazer se o produto recebido não corresponder à descrição?",
    answer:
      "Se o produto recebido não corresponder à descrição, entre em contato com o vendedor através da plataforma. Caso não consiga resolver o problema, você pode abrir uma disputa na seção 'Minhas Compras' e nossa equipe de suporte irá ajudar.",
  },
  {
    question: "Como posso devolver um produto?",
    answer:
      "Para devolver um produto, acesse 'Minhas Compras', selecione o pedido em questão e clique em 'Solicitar devolução'. Siga as instruções para completar o processo. Lembre-se que as políticas de devolução podem variar de acordo com o vendedor.",
  },
  {
    question: "Como posso me tornar um vendedor?",
    answer:
      "Para se tornar um vendedor, acesse seu painel de cliente e ative a opção 'Queres começar a vender? Ativa tua conta de vendedor' no menu lateral. Você será redirecionado para o painel de vendedor onde poderá começar a cadastrar seus produtos.",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer:
      "Aceitamos diversas formas de pagamento, incluindo cartões de crédito, transferência bancária, PayPal e pagamento na entrega (para alguns produtos). As opções disponíveis serão mostradas durante o processo de compra.",
  },
]

export default function HelpCenterPage() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Central de Ajuda</h2>

      <div className="mb-8 rounded-lg bg-muted/50 p-6">
        <h3 className="mb-4 text-xl font-medium">Como podemos ajudar?</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Pesquisar na Central de Ajuda..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="mb-6">
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            Perguntas Frequentes
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="guides">
            <FileText className="mr-2 h-4 w-4" />
            Guias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns dos nossos usuários.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contacto</CardTitle>
              <CardDescription>Nossa equipe está pronta para ajudar com suas dúvidas.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Chat ao Vivo</h4>
                      <p className="text-sm text-muted-foreground">Disponível de segunda a sexta, das 9h às 18h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Telefone</h4>
                      <p className="text-sm text-muted-foreground">+351 210 123 456</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <textarea
                      id="message"
                      className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Descreva sua dúvida ou problema..."
                    />
                  </div>
                  <Button className="w-full">Enviar Mensagem</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Como comprar"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Como comprar no MercadoFácil</CardTitle>
                <CardDescription>Um guia passo a passo para realizar sua primeira compra.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0" asChild>
                  <Link href="#">Ver guia completo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Dicas de segurança"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Dicas de segurança para compradores</CardTitle>
                <CardDescription>Aprenda a comprar com segurança na plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0" asChild>
                  <Link href="#">Ver guia completo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Resolução de problemas"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Resolução de problemas com pedidos</CardTitle>
                <CardDescription>O que fazer quando algo não sai como esperado.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0" asChild>
                  <Link href="#">Ver guia completo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
