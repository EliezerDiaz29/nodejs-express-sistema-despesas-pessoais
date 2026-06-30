# Sistema de Controle de Despesas Pessoais API REST

API RESTful para controle de despesas pessoais, construída com **Node.js, Express, Sequelize e MySQL**, seguindo o padrão **MVC**. O sistema permite cadastrar usuários, fazer login com autenticação JWT, gerenciar categorias e despesas, aplicar filtros de busca e consultar estatísticas em um dashboard financeiro.

> Observação: os nomes de campos, rotas e funções do código estão em inglês porque essa é a convenção padrão usada em APIs RESTful no mercado. Este README explica tudo em português para facilitar o entendimento.

---

## Sumário

1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Estrutura do projeto](#estrutura-do-projeto)
3. [Pré-requisitos](#pré-requisitos)
4. [Como configurar e rodar o projeto](#como-configurar-e-rodar-o-projeto)
5. [Variáveis de ambiente](#variáveis-de-ambiente)
6. [Modelo de dados e relacionamentos](#modelo-de-dados-e-relacionamentos)
7. [Padrão de resposta da API](#padrão-de-resposta-da-api)
8. [Autenticação](#autenticação)
9. [Exemplo de fluxo completo de requisições](#exemplo-de-fluxo-completo-de-requisições)
10. [Rotas da API](#rotas-da-api)
11. [Filtros de busca nas despesas](#filtros-de-busca-nas-despesas)
12. [Estatísticas do dashboard](#estatísticas-do-dashboard)
13. [Coleção do Postman](#coleção-do-postman)

---

## Tecnologias utilizadas

- **Node.js**  ambiente de execução do JavaScript no servidor
- **Express**  framework para criar a API e gerenciar as rotas
- **Sequelize**  ORM usado para conversar com o banco MySQL
- **MySQL**  banco de dados relacional
- **JWT (jsonwebtoken)**  geração e validação dos tokens de autenticação
- **bcrypt** criptografia das senhas dos usuários
- **dotenv** leitura das variáveis de ambiente do arquivo `.env`

O projeto é escrito usando **ES Modules** (`import`/`export`), por isso o `package.json` tem a propriedade `"type": "module"`.

---

## Estrutura do projeto

```text
nodejs-express-sistema-despesas-pessoais/
├── .env                        # Variáveis de ambiente (banco de dados e JWT)
├── .sequelizerc                # Diz ao Sequelize CLI onde estão as migrations, seeders e models
├── package.json
├── EXPENSE API POSTMAN TEST.postman_collection.json
└── src/
    ├── app.js                  # Arquivo principal: monta as rotas e inicia o servidor
    ├── config/
    │   ├── auth.js              # Configuração do JWT (chave secreta e tempo de expiração)
    │   ├── config.cjs           # Configuração do banco usada pela aplicação
    │   └── config.json          # Configuração do banco usada pelo Sequelize CLI (migrations/seeders)
    ├── controllers/
    │   ├── authController.js    # Cadastro e login de usuários
    │   ├── categoryController.js # CRUD de categorias
    │   ├── dashboardController.js # Estatísticas de despesas
    │   └── expenseController.js  # CRUD de despesas e filtros
    ├── database/
    │   ├── migrations/
    │   │   └── 2024063001-create-all-tables.js   # Cria as tabelas users, categories e expenses
    │   └── seeders/
    │       ├── 2024063001-demo-users.js          # Usuários de exemplo
    │       ├── 2024063002-demo-categories.js     # Categorias de exemplo
    │       └── 2024063003-demo-expenses.js       # Despesas de exemplo
    ├── middlewares/
    │   ├── auth.js               # Verifica o token JWT nas rotas protegidas
    │   └── errorHandler.js       # Trata os erros de forma centralizada
    ├── models/
    │   ├── database.js           # Conexão do Sequelize com o MySQL
    │   ├── UserModel.js          # Modelo e funções relacionadas ao Usuário
    │   ├── CategoryModel.js      # Modelo e funções relacionadas à Categoria
    │   ├── expenseModels.js      # Modelo, filtros e validações da Despesa
    │   └── associations.js       # Define os relacionamentos entre os modelos
    ├── routes/
    │   ├── userRoutes.js         # Rotas de cadastro e login
    │   ├── categoryRoutes.js     # Rotas de categorias
    │   ├── expenseRoutes.js      # Rotas de despesas
    │   └── dashboardRoutes.js    # Rotas de estatísticas
    └── views/
        └── ApiResponse.js        # Padroniza o formato das respostas JSON
```

---

## Pré-requisitos

- **Node.js** versão 18 ou superior (testado na versão 22)
- **MySQL** instalado e rodando (local ou remoto)
- **npm** (já vem junto com o Node.js)

---

## Como configurar e rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar o arquivo `.env`

O projeto usa um arquivo `.env` na raiz para guardar as informações de conexão com o banco e a chave do JWT. As variáveis usadas são:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=expenseSys

JWT_SECRET=uma_chave_secreta_bem_grande
JWT_EXPIRES_IN=1d
```

### 3. Criar o banco de dados

No MySQL, criar um banco com o mesmo nome definido em `MYSQL_DATABASE`:

```sql
CREATE DATABASE expenseSys;
```

### 4. Rodar as migrations e os seeders

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Isso cria as tabelas `users`, `categories` e `expenses`, e já insere alguns dados de exemplo (usuários, categorias e despesas) para facilitar os testes.

### 5. Iniciar o servidor

```bash
node src/app.js
```

Ou, para que o servidor reinicie sozinho a cada alteração no código:

```bash
node --watch src/app.js
```

Quando tudo estiver certo, vai aparecer no terminal:


A API fica disponível em `http://localhost:3000`.

---

## Variáveis de ambiente

| Variável | Para que serve |
|---|---|
| `MYSQL_HOST` | Endereço do servidor MySQL |
| `MYSQL_PORT` | Porta do MySQL (geralmente 3306) |
| `MYSQL_USER` | Usuário do banco |
| `MYSQL_PASSWORD` | Senha do banco |
| `MYSQL_DATABASE` | Nome do banco de dados |
| `JWT_SECRET` | Chave usada para assinar e validar os tokens JWT |
| `JWT_EXPIRES_IN` | Tempo de validade do token (exemplo: `1d` = 1 dia) |

---

## Modelo de dados e relacionamentos

### Usuário

| Campo | Tipo | Descrição |
|---|---|---|
| id | número | Identificador único, gerado automaticamente |
| nameUser | texto | Nome do usuário |
| email | texto | E-mail, precisa ser único |
| password | texto | Senha, guardada de forma criptografada |
| createdAt / updatedAt | data | Preenchidos automaticamente pelo Sequelize |

### Categoria

| Campo | Tipo | Descrição |
|---|---|---|
| id | número | Identificador único |
| name | texto | Nome da categoria |
| description | texto | Descrição da categoria |

### Despesa

| Campo | Tipo | Descrição |
|---|---|---|
| id | número | Identificador único |
| title | texto | Título da despesa |
| description | texto | Descrição da despesa |
| amount | número | Valor da despesa |
| date | data | Data da despesa |
| status | texto | `PENDING` (pendente) ou `PAID` (paga) |
| categoryId | número | Categoria à qual a despesa pertence |
| userId | número | Usuário dono da despesa |

### Como as tabelas se relacionam

- Um usuário pode ter várias despesas.
- Uma categoria pode ter várias despesas.
- Cada despesa pertence a um único usuário e a uma única categoria.

---

## Padrão de resposta da API

Todas as respostas seguem o mesmo formato, graças ao `ApiResponse.js`:

```json
{
  "success": true,
  "status": 200,
  "message": "Expenses retrieved successfully",
  "data": [],
  "errors": null
}
```

Quando algum dado enviado está incorreto, a resposta vem assim:

*The database connection has been established
Server running on port 3000*

```json
{
  "success": false,
  "status": 400,
  "message": "Validation error",
  "data": null,
  "errors": ["title is required", "amount must be greater than 0"]
}
```

---

## Autenticação

O fluxo de autenticação funciona assim:

1. **Cadastro** (`POST /api/v1/users`) o usuário envia nome, e-mail e senha. A senha é criptografada com bcrypt antes de ser salva, e a API já devolve um token JWT.
2. **Login** (`POST /api/v1/auth/login`)  o usuário envia e-mail e senha. Se estiverem corretos, a API devolve um novo token JWT.
3. **Acesso às rotas protegidas** para usar as rotas de categorias, despesas e dashboard, é preciso enviar o token no cabeçalho da requisição:

```http
Authorization: Bearer <token>
```

Sem esse cabeçalho (ou com um token inválido/expirado), a API responde com erro `401`.

---

## Exemplo de fluxo completo de requisições

Esta seção mostra, na ordem certa, um exemplo real de uso da API: cadastro do usuário, login, criação de uma categoria e criação de uma despesa já reaproveitando o token e o id gerados em cada passo.

### Passo 1: Cadastrar um usuário (modelo Usuário)

```http
POST /api/v1/users
Content-Type: application/json
```

```json
{
  "nameUser": "Eliezer",
  "email": "eliezer@test.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "success": true,
  "status": 201,
  "message": "User created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SEU_TOKEN_AQUI",
    "user": {
      "id": 1,
      "nameUser": "Eliezer",
      "email": "eliezer@test.com"
    }
  },
  "errors": null
}
```

> O cadastro já devolve um token, mas também é possível gerar um novo a qualquer momento fazendo login (passo 2).

### Passo 2: Fazer login (modelo Usuário)

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "eliezer@test.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SEU_TOKEN_AQUI",
    "user": {
      "id": 1,
      "nameUser": "Eliezer",
      "email": "eliezer@test.com"
    }
  },
  "errors": null
}
```

> A partir daqui, o `token` retornado deve ser usado no cabeçalho `Authorization` de todas as próximas requisições.

### Passo 3: Criar uma categoria (modelo Categoria)

```http
POST /api/v1/categories
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SEU_TOKEN_AQUI
```

```json
{
  "name": "Alimentação",
  "description": "Gastos com comida do dia a dia"
}
```

**Resposta:**

```json
{
  "success": true,
  "status": 201,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Alimentação",
    "description": "Gastos com comida do dia a dia"
  },
  "errors": null
}
```

> O `id` retornado aqui (`1`) é o que será usado no campo `categoryId` ao criar uma despesa, no próximo passo.

### Passo 4: Criar uma despesa (modelo Despesa)

```http
POST /api/v1/expenses
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SEU_TOKEN_AQUI
```

```json
{
  "title": "Almoço",
  "description": "Restaurante perto do trabalho",
  "amount": 35.90,
  "date": "2026-06-30",
  "status": "PENDING",
  "categoryId": 1
}
```

**Resposta:**

```json
{
  "success": true,
  "status": 201,
  "message": "Expense created successfully",
  "data": {
    "id": 1,
    "title": "Almoço",
    "description": "Restaurante perto do trabalho",
    "amount": 35.9,
    "date": "2026-06-30",
    "status": "PENDING",
    "categoryId": 1,
    "userId": 1
  },
  "errors": null
}
```

### Passo 5: Consultar as despesas criadas (usando o mesmo token)

```http
GET /api/v1/expenses
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SEU_TOKEN_AQUI
```

**Resposta:**

```json
{
  "success": true,
  "status": 200,
  "message": "Expenses retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Almoço",
      "description": "Restaurante perto do trabalho",
      "amount": 35.9,
      "date": "2026-06-30",
      "status": "PENDING",
      "categoryId": 1,
      "userId": 1
    }
  ],
  "errors": null
}
```

> Resumindo o fluxo: **cadastro/login → pega o token → usa o token no header `Authorization` → cria categoria → usa o id da categoria para criar a despesa → consulta os dados com o mesmo token.**

---

## Rotas da API

Todas as rotas começam com o prefixo `/api/v1`.

### Verificação de status

```http
GET /api/v1/health
```

### Autenticação (rotas públicas)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/v1/users` | Cadastra um novo usuário |
| POST | `/api/v1/auth/login` | Faz login e retorna o token |

### Categorias (precisa estar autenticado)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v1/categories` | Lista todas as categorias |
| GET | `/api/v1/categories/:id` | Busca uma categoria pelo id |
| POST | `/api/v1/categories` | Cria uma nova categoria |
| PUT | `/api/v1/categories/:id` | Atualiza uma categoria |
| DELETE | `/api/v1/categories/:id` | Remove uma categoria |

### Despesas (precisa estar autenticado)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v1/expenses` | Lista as despesas do usuário logado (aceita filtros) |
| GET | `/api/v1/expenses/:id` | Busca uma despesa específica |
| POST | `/api/v1/expenses` | Cria uma nova despesa |
| PUT | `/api/v1/expenses/:id` | Atualiza uma despesa |
| DELETE | `/api/v1/expenses/:id` | Remove uma despesa |

### Dashboard (precisa estar autenticado)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v1/dashboard/total-expenses` | Soma total das despesas |
| GET | `/api/v1/dashboard/expenses-count` | Quantidade total de despesas |
| GET | `/api/v1/dashboard/expenses-by-category` | Total de gastos agrupado por categoria |

---

## Filtros de busca nas despesas

A rota `GET /api/v1/expenses` aceita os seguintes filtros via query string:

| Parâmetro | Exemplo de uso |
|---|---|
| `categoryId` | `?categoryId=1` |
| `status` | `?status=PAID` |
| `startDate` | `?startDate=2026-01-01` |
| `endDate` | `?endDate=2026-12-31` |
| `minAmount` | `?minAmount=50` |
| `maxAmount` | `?maxAmount=500` |

Os filtros podem ser combinados, por exemplo:

```http
GET /api/v1/expenses?status=PAID&categoryId=1&minAmount=10&maxAmount=200
```

---

## Estatísticas do dashboard

**`GET /api/v1/dashboard/total-expenses`**
```json
{ "total": 3500.5 }
```

**`GET /api/v1/dashboard/expenses-count`**
```json
{ "count": 45 }
```

**`GET /api/v1/dashboard/expenses-by-category`**
```json
[
  { "category": "Comida", "total": 1200 },
  { "category": "Transporte", "total": 800 }
]
```

Essas estatísticas são sempre calculadas apenas com as despesas do usuário que está logado.

---

## Coleção do Postman

O projeto inclui o arquivo `EXPENSE API POSTMAN TEST.postman_collection.json`, organizado em pastas:

- **Health check**
- **Auth** (cadastro e login)
- **Categories** (CRUD completo)
- **Expenses** (CRUD completo)
- **Filters** (por categoria, por data, por valor)
- **Dashboard** (os três endpoints de estatísticas)

Para usar: importe o arquivo no Postman, execute a requisição de **Login** primeiro, copie o `token` retornado e use-o como `Bearer Token` nas demais requisições.