"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

// Form schema
const formSchema = z.object({
  receiverId: z.string({
    required_error: "Por favor selecione um destinatário",
  }),
  text: z.string().min(1, "A mensagem não pode estar vazia"),
  productId: z.string().optional(),
  isEncrypted: z.boolean().default(false),
})

// Mock users for recipient selection
const mockUsers = [
  { id: "user1", name: "João Silva", email: "joao.silva@example.com" },
  { id: "user2", name: "Maria Oliveira", email: "maria.oliveira@example.com" },
  { id: "user3", name: "Carlos Mendes", email: "carlos.mendes@example.com" },
  { id: "user4", name: "Ana Pereira", email: "ana.pereira@example.com" },
  { id: "user5", name: "Pedro Santos", email: "pedro.santos@example.com" },
  { id: "user6", name: "Lucia Ferreira", email: "lucia.ferreira@example.com" },
  { id: "user7", name: "Roberto Alves", email: "roberto.alves@example.com" },
  { id: "user8", name: "Camila Costa", email: "camila.costa@example.com" },
  { id: "user9", name: "Fernando Gomes", email: "fernando.gomes@example.com" },
  { id: "user10", name: "Juliana Lima", email: "juliana.lima@example.com" },
]

// Mock products for product selection
const mockProducts = [
  { id: "prod1", title: "iPhone 13 Pro Max" },
  { id: "prod2", title: "MacBook Pro M1" },
  { id: "prod3", title: "Tênis Nike" },
  { id: "prod4", title: "PlayStation 5" },
  { id: "prod5", title: "Câmera Canon EOS R5" },
]

interface MessageCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMessageCreated: (message: any) => void
}

export function MessageCreateDialog({ open, onOpenChange, onMessageCreated }: MessageCreateDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openUserCombobox, setOpenUserCombobox] = useState(false)
  const [openProductCombobox, setOpenProductCombobox] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [productSearchTerm, setProductSearchTerm] = useState("")

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter products based on search term
  const filteredProducts = mockProducts.filter((product) =>
    product.title.toLowerCase().includes(productSearchTerm.toLowerCase()),
  )

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverId: "",
      text: "",
      productId: undefined,
      isEncrypted: false,
    },
  })

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // In a real application, you would call your API
      // await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });

      // Mock response
      const recipient = mockUsers.find((user) => user.id === values.receiverId)
      const product = values.productId ? mockProducts.find((p) => p.id === values.productId) : null

      // Create a mock message object
      const newMessage = {
        id: `msg${Date.now()}`,
        senderId: "admin1",
        senderName: "Administrador",
        receiverId: values.receiverId,
        receiverName: recipient?.name || "Usuário",
        text: values.isEncrypted ? null : values.text,
        encryptedContent: values.isEncrypted ? "encrypted-content-here" : null,
        productId: values.productId || null,
        productTitle: product?.title || null,
        createdAt: new Date().toISOString(),
        read: false,
        flagged: false,
        deleted: false,
        hasAttachments: false,
      }

      // Call the callback with the new message
      onMessageCreated(newMessage)

      // Show success toast
      toast({
        title: "Mensagem enviada",
        description: "A mensagem foi enviada com sucesso.",
      })

      // Reset form and close dialog
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Mensagem</DialogTitle>
          <DialogDescription>Crie uma nova mensagem para enviar a um usuário da plataforma.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Recipient Selection */}
            <FormField
              control={form.control}
              name="receiverId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Destinatário</FormLabel>
                  <Popover open={openUserCombobox} onOpenChange={setOpenUserCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openUserCombobox}
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? mockUsers.find((user) => user.id === field.value)?.name || "Selecionar usuário"
                            : "Selecionar usuário"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar usuário..."
                          value={searchTerm}
                          onValueChange={setSearchTerm}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-auto">
                            {filteredUsers.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.id}
                                onSelect={() => {
                                  form.setValue("receiverId", user.id)
                                  setOpenUserCombobox(false)
                                }}
                              >
                                <div className="flex flex-col">
                                  <span>{user.name}</span>
                                  <span className="text-xs text-muted-foreground">{user.email}</span>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    user.id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Selecione o usuário que receberá esta mensagem.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Selection (Optional) */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Produto (Opcional)</FormLabel>
                  <Popover open={openProductCombobox} onOpenChange={setOpenProductCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openProductCombobox}
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? mockProducts.find((product) => product.id === field.value)?.title || "Selecionar produto"
                            : "Selecionar produto (opcional)"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar produto..."
                          value={productSearchTerm}
                          onValueChange={setProductSearchTerm}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-auto">
                            {filteredProducts.map((product) => (
                              <CommandItem
                                key={product.id}
                                value={product.id}
                                onSelect={() => {
                                  form.setValue("productId", product.id)
                                  setOpenProductCombobox(false)
                                }}
                              >
                                {product.title}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    product.id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Opcionalmente, associe esta mensagem a um produto.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Text */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Encryption Option */}
            <FormField
              control={form.control}
              name="isEncrypted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Criptografar mensagem</FormLabel>
                    <FormDescription>A mensagem será criptografada de ponta a ponta.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Mensagem
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
