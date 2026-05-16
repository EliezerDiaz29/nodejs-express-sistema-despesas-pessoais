# nodejs-express-sistema-despesas-pessoais

API em Node.js para gerenciamento de despesas pessoais.

## Features

- Padronização RestFul 
- Padronização de linguagem para o ingles
- Implementação da estrutura MVC contendo a view para respostas de status
- HEALT CHECK da API
- Mudança em nomes de function para a organização do codigo
- Versionamento da API
- Integração de banco de dados com o sequelize
- Criação do banco de dados expenseSys


## 1. Descrição

Esta API permite gerenciar despesas pessoais com operações de:
- Criar despesas
- Listar despesas
- Buscar despesas por ID
- Atualizar despesas
- Remover despesas
- Filtrar por categoria e data
- Obter resumos financeiros

## 2. Tecnologias
- Node.js
- Express
- ORM Sequelize
- JavaScript (ES Modules)

## 3. Como executar

npm install
node --watch src/app.js

Servidor:
http://localhost:3000

## 4. Base URL
/api/v1/expenses

## 5. Rotas da API

GET /api/v1/expenses
GET /api/v1/expenses/:id
POST /api/v1/expenses
PUT /api/v1/expenses/:id
DELETE /api/v1/expenses/:id

Filtros:
GET /api/v1/expenses?category=saude&startDate=YYYY-MM-DD&endDate=YYYY-MM-DDA

## 6. Resumos

GET /api/v1/expenses/summary/total
GET /api/v1/expenses/summary/category

## 7. Modelo de dados

{
  "title": "Consulta médica",
  "amount": 250,
  "category": "saude",
  "date": "2025-03-10",
  "description": "Consulta particular"
}