# nodejs-express-sistema-despesas-pessoais
Desenvolver uma API REST em Node.js para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas.


### 1.0 Descrição do Projeto

### Objetivo da API

Esta API REST foi desenvolvida para permitir o **gerenciamento completo de despesas pessoais**. Por meio dela, o usuário consegue registrar seus gastos do dia a dia, consultá-los com filtros, editá-los quando necessário e removê-los. Além disso, a API oferece endpoints de resumo financeiro que calculam automaticamente o total gasto tanto de forma geral quanto separado por categoria, facilitando o controle do orçamento pessoal.

### Tecnologias Usadas

| Tecnologia | Descrição |
|------------|-----------|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript no servidor |
| [Express](https://expressjs.com/) | Framework para criação de APIs REST |
| JavaScript (ES Modules) | Linguagem principal, utilizando sintaxe moderna com `import/export` |

---

## 1.1 Como Executar o Projeto

Antes de começar, certifique-se de ter o **Node.js v18+** e o **npm** instalados na sua máquina.

```bash
npm install
npm start
```

IMPORTANTE: E necessário inserir  o comando node --watch src/app.js na terminal de VS CODE para ver a mensagem de "Servidor rodando na porta 3000"

Servidor rodando em: `http://localhost:3000`

> ⚠️ Os dados são armazenados em memória. Ao reiniciar o servidor, todas as despesas são apagadas.

## 1.2 Rotas da API

Base URL: `http://localhost:3000/despesas`


| Método | Rota                       | Descrição                             |
|--------|----------------------------|---------------------------------------|
| GET    | /despesas                  | Lista todas as despesas               |
| GET    | /despesas/:id              | Busca uma despesa específica por ID   |
| GET    | /despesas/summary/total    | Retorna o valor total de todos os gastos |
| GET    | /despesas/summary/category | Retorna o total gasto agrupado por categoria |
| POST   | /despesas                  | Cria uma nova despesa                 |
| PUT    | /despesas/:id              | Atualiza os dados de uma despesa existente |
| DELETE | /despesas/:id              | Remove permanentemente uma despesa    |

### Filtros disponíveis em `GET /despesas`

Os filtros são opcionais e podem ser combinados entre si na mesma requisição.

| Query Param | Tipo   | Descrição                           |
|-------------|--------|-------------------------------------|
| `category`  | string | Filtra despesas por categoria       |
| `startDate` | string | Retorna despesas a partir desta data (formato `YYYY-MM-DD`) |
| `endDate`   | string | Retorna despesas até esta data (formato `YYYY-MM-DD`)       |

---

## 1.3 Modelo de Dados

### Entidade `Expense`

Abaixo estão todos os campos que compõem uma despesa na aplicação:

| Campo         | Tipo   | Obrigatório | Descrição                                                   |
|---------------|--------|-------------|-------------------------------------------------------------|
| `id`          | string | Auto        | Identificador único gerado automaticamente (ex: `exp_1`)    |
| `title`       | string |  Sim      | Título ou nome da despesa                                   |
| `amount`      | number |  Sim      | Valor da despesa — deve ser maior que `0`                   |
| `category`    | string |  Não      | Categoria do gasto (ex: `moradia`, `transporte`, `saude`)   |
| `date`        | string |  Sim      | Data do gasto no formato `YYYY-MM-DD` — não pode ser futura |
| `description` | string |  Não      | Detalhes adicionais sobre a despesa                         |
| `createdAt`   | string | Auto        | Data e hora em que o registro foi criado (gerado pelo servidor) |

### Exemplo de objeto `Expense` retornado pela API

```json
{
  "id": "exp_1",
  "title": "Consulta médica",
  "amount": 250.00,
  "category": "saude",
  "date": "2025-03-10",
  "description": "Consulta com cardiologista particular",
  "createdAt": "2025-03-10T09:30:00"
}
```

---

## 1.4 Exemplos de Requisições

### ▶ Usando `curl`

---

#### 🟢 GET — Listar todas as despesas

Retorna um array com todas as despesas cadastradas.

```bash
curl http://localhost:3000/despesas
```

**Resposta esperada:**
```json
[
  {
    "id": "exp_1",
    "title": "Consulta médica",
    "amount": 250.00,
    "category": "saude",
    "date": "2025-03-10",
    "description": "Consulta com cardiologista particular",
    "createdAt": "2025-03-10T09:30:00"
  },
  {
    "id": "exp_2",
    "title": "Passagem de ônibus mensal",
    "amount": 180.00,
    "category": "transporte",
    "date": "2025-03-01",
    "description": "Cartão de transporte recarregado",
    "createdAt": "2025-03-01T08:00:00"
  }
]
```

---

#### 🟢 GET — Listar com filtros

Retorna apenas despesas da categoria `saude` dentro de um intervalo de datas.

```bash
curl "http://localhost:3000/despesas?category=saude&startDate=2025-03-01&endDate=2025-03-31"
```

**Resposta esperada:**
```json
[
  {
    "id": "exp_1",
    "title": "Consulta médica",
    "amount": 250.00,
    "category": "saude",
    "date": "2025-03-10",
    "description": "Consulta com cardiologista particular",
    "createdAt": "2025-03-10T09:30:00"
  }
]
```

---

#### 🟢 GET — Buscar despesa por ID

Retorna os dados de uma despesa específica com base no seu ID.

```bash
curl http://localhost:3000/despesas/exp_1
```

**Resposta esperada:**
```json
{
  "id": "exp_1",
  "title": "Consulta médica",
  "amount": 250.00,
  "category": "saude",
  "date": "2025-03-10",
  "description": "Consulta com cardiologista particular",
  "createdAt": "2025-03-10T09:30:00"
}
```

---

#### 🟢 GET — Total gasto geral

Retorna a soma de todos os valores (`amount`) das despesas cadastradas.

```bash
curl http://localhost:3000/despesas/summary/total
```

**Resposta esperada:**
```json
{
  "total": 430.00
}
```

---

#### 🟢 GET — Total gasto por categoria

Retorna o total gasto agrupado por cada categoria.

```bash
curl http://localhost:3000/despesas/summary/category
```

**Resposta esperada:**
```json
{
  "saude": 250.00,
  "transporte": 180.00
}
```

---

#### 🔵 POST — Criar uma nova despesa

Cadastra uma nova despesa. Os campos `title`, `amount` e `date` são obrigatórios.

```bash
curl -X POST http://localhost:3000/despesas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Plano de internet",
    "amount": 99.90,
    "category": "moradia",
    "date": "2025-03-05",
    "description": "Mensalidade da fibra ótica"
  }'
```

**Resposta esperada (201 Created):**
```json
{
  "id": "exp_3",
  "title": "Plano de internet",
  "amount": 99.90,
  "category": "moradia",
  "date": "2025-03-05",
  "description": "Mensalidade da fibra ótica",
  "createdAt": "2025-03-05T14:20:00"
}
```

---

#### 🟡 PUT — Atualizar uma despesa existente

Atualiza um ou mais campos de uma despesa já cadastrada. Apenas os campos enviados serão alterados.

```bash
curl -X PUT http://localhost:3000/despesas/exp_3 \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 109.90,
    "description": "Reajuste na mensalidade da fibra ótica"
  }'
```

**Resposta esperada:**
```json
{
  "id": "exp_3",
  "title": "Plano de internet",
  "amount": 109.90,
  "category": "moradia",
  "date": "2025-03-05",
  "description": "Reajuste na mensalidade da fibra ótica",
  "createdAt": "2025-03-05T14:20:00"
}
```

---

#### 🔴 DELETE — Remover uma despesa

Remove permanentemente uma despesa com base no ID informado.

```bash
curl -X DELETE http://localhost:3000/despesas/exp_3
```

**Resposta esperada:**
```json
{
  "message": "Despesa eliminada con éxito"
}
```

---

### ▶ Usando Postman

O Postman é uma ferramenta visual que facilita o teste de APIs sem precisar usar o terminal.

#### Como configurar cada tipo de requisição:

**GET — Listar ou buscar despesas**
1. Abra o Postman e clique em **New Request**
2. Selecione o método **GET**
3. Insira a URL: `http://localhost:3000/despesas`
4. Para filtros, vá na aba **Params** e adicione as chaves `category`, `startDate` ou `endDate` com os valores desejados ou so escreva na parte de cima o filtro, tambem permite a busca por ID
5. Clique em **Send**

---

**POST — Criar uma despesa**
1. Selecione o método **POST**
2. Insira a URL: `http://localhost:3000/despesas`
3. Vá na aba **Body** → selecione **raw** → escolha **JSON**
4. Insira o corpo abaixo e clique em **Send**:

```json
{
  "title": "Plano de internet",
  "amount": 99.90,
  "category": "moradia",
  "date": "2025-03-05",
  "description": "Mensalidade da fibra ótica"
}
```

---

**PUT — Atualizar uma despesa**
1. Selecione o método **PUT**
2. Insira a URL com o ID da despesa: `http://localhost:3000/despesas/exp_3`
3. Vá na aba **Body** → selecione **raw** → escolha **JSON**
4. Insira apenas os campos que deseja atualizar e clique em **Send**:

```json
{
  "amount": 109.90,
  "description": "Reajuste na mensalidade da fibra ótica"
}
```

---

**DELETE — Remover uma despesa**
1. Selecione o método **DELETE**
2. Insira a URL com o ID da despesa: `http://localhost:3000/despesas/exp_3`
3. Não é necessário enviar nenhum corpo (Body)
4. Clique em **Send**
