# 📦 Marketplace Backend API

Este projeto é a API back-end de um marketplace construído com Node.js, Express, TypeScript e Prisma. A plataforma permite que usuários publiquem produtos, ativem contas de vendedor, façam upload de imagens para o AWS S3, filtrem anúncios e muito mais.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- Multer (upload de imagens)
- AWS S3 (armazenamento de arquivos)
- JWT (autenticação)
- Joi (validação)

---

## 📁 Estrutura do Projeto

```
src/
├── controllers/
├── services/
├── middlewares/
├── validations/
├── routes/
├── interfaces/
├── prisma/
│   ├── schema.prisma
│   └── seed/
└── utils/
```

---

## ⚙️ Instalação

```bash
git clone https://github.com/mamadusamadev/marcketplace.git
cd marcketplace
npm install
```

Crie um arquivo `.env` com as seguintes variáveis:

```env
DATABASE_URL=mysql://usuario:senha@localhost:3306/marketplace_db
JWT_SECRET=seu_jwt_seguro
JWT_EXPIRES_IN=7d
EMAIL_GMAIL=seuemail@gmail.com
EMAIL_GMAIL_PASS=senha_app
AWS_ACCESS_KEY_ID=sua_chave
AWS_SECRET_ACCESS_KEY=sua_secreta
AWS_REGION=eu-west-3
AWS_BUCKET_NAME=marketplace-arquivos
```

---

## 🔃 Rodando o projeto

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Servidor rodando em `http://localhost:5000`

---

## 🛠 Funcionalidades Implementadas

### 👤 Usuário
- Registro, login e autenticação com JWT
- Atualização de perfil, senha e foto
- Reset de senha por e-mail
- Soft delete de conta

### 🛍️ Vendedor
- Ativação de modo vendedor pelo cliente
- Envio de documentos
- Verificação pelo admin (status e verificação)
- Campos extras: `slug`, `IBAN`, `documentId`, etc.

### 📦 Produto
- Cadastro com upload de imagens para S3
- Atualização de produto e imagens
- Filtros: `minPrice`, `maxPrice`, `location`, `condition`, `category`, `orderBy`
- Listagem pública e por vendedor

### 🗂️ Categorias
- CRUD de categorias
- Seed de categorias

### 🚚 Frete e Comissão
- Tabelas de frete (`ShippingZone`, `City`)
- Comissão da plataforma (`MarketplaceFee`)
- Seed com zonas de Portugal e Espanha

---

## 🔐 Autenticação e Permissões

| Rota protegida                   | Middleware                          |
|----------------------------------|-------------------------------------|
| Criar produto                    | `isAuthenticated`, `isSellerVerifiedOrAdmin` |
| Verificar vendedor               | `isAuthenticated`, `isAdmin`        |
| Atualizar perfil, senha, foto    | `isAuthenticated`                   |

---

## 🧪 Testando com Insomnia/Postman

### Filtros de produtos:
```http
GET /api/products/fillter?minPrice=100&maxPrice=500&condition=GOOD&orderBy=price_asc&category=Eletrônicos
```

### Upload de imagem:
- `multipart/form-data`
- campo: `images`

---

## 📂 .gitignore

```gitignore
node_modules/
dist/
.env
*.log
prisma/dev.db
coverage/
.vscode/
.idea/
```

---

## 👨‍💻 Autor

Desenvolvido por **Mamadu Sama**. Este projeto faz parte da plataforma Marketplace desenvolvida do zero com backend personalizado, autenticação segura, integração AWS, filtros avançados e estrutura escalável.
