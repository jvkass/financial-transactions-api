# 💸 Transaction Service — Sistema de Processamento de Transações Bancárias

Serviço backend desenvolvido em **NestJS**, **PostgreSQL**, **RabbitMQ** e **Redis**, com o objetivo de demonstrar a arquitetura e as boas práticas aplicadas a um sistema financeiro escalável, seguro e consistente.

---

## 🧩 Contexto

O **Transaction Service** é responsável por **processar transações financeiras** entre contas, garantindo:

- **Consistência** (nenhuma transação é duplicada)
- **Segurança** (validações e logs auditáveis)
- **Escalabilidade** (processamento assíncrono via fila)
- **Performance** (uso de cache e mensageria)
- **Rastreabilidade** (histórico completo de operações)

---

## 🧱 Arquitetura

### 🔹 Visão geral

Client → API (NestJS) → RabbitMQ Queue → Worker → PostgreSQL → Redis → Logs & Metrics


### 🔹 Componentes principais

| Componente | Responsabilidade |
|-------------|------------------|
| **NestJS API** | Recebe requisições, valida dados e publica mensagens na fila |
| **RabbitMQ** | Gerencia filas de mensagens de transações |
| **Worker (NestJS)** | Consome mensagens e realiza as operações no banco |
| **PostgreSQL** | Armazena contas e histórico de transações |
| **Redis** | Cache para consultas rápidas de saldo |
| **Docker Compose** | Orquestra todo o ambiente local |
| **Prometheus / Grafana (opcional)** | Métricas e monitoramento |

---

## ⚙️ Stack técnica

- **Node.js 20+**
- **NestJS 10+**
- **TypeORM**
- **PostgreSQL**
- **RabbitMQ** (com plugin de gerenciamento)
- **Redis**
- **Docker & Docker Compose**
- **JWT (autenticação opcional)**
- **Winston / Pino (logs estruturados)**

---

## 🚀 Funcionalidades

### 🔸 Criação de conta

```http
POST /accounts
{
  "name": "Vitor Silva",
  "document": "12345678900",
  "initial_balance": 1000
}
```

### 🔸 Consulta de saldo

```http
GET /accounts/:id/balance
```

### 🔸 Transferência entre contas

```http
POST /transactions/transfer
{
  "from_account_id": "uuid-1",
  "to_account_id": "uuid-2",
  "amount": 250
}
```

### 🔁 Fluxo

1. A **API** publica a transação na exchange `transactions.exchange`.  
2. O **Worker** consome a fila `transactions_queue`.  
3. O **Worker** executa a operação no banco (**transação SQL atômica**).  
4. O **Redis** é atualizado e o evento `transaction.completed` é registrado.

## 🧠 Modelo de dados

### 🗂️ Tabela `accounts`

| Coluna | Tipo | Descrição |
|--------|------|------------|
| id | UUID | Identificador da conta |
| name | VARCHAR | Nome do titular |
| document | VARCHAR | CPF/CNPJ |
| balance | DECIMAL | Saldo atual |
| created_at | TIMESTAMP | Data de criação |

---

### 🗂️ Tabela `transactions`

| Coluna | Tipo | Descrição |
|--------|------|------------|
| id | UUID | Identificador da transação |
| from_account_id | UUID | Conta de origem |
| to_account_id | UUID | Conta de destino |
| amount | DECIMAL | Valor transferido |
| status | ENUM('PENDING', 'COMPLETED', 'FAILED') | Estado da transação |
| created_at | TIMESTAMP | Data de criação |
| processed_at | TIMESTAMP | Data de processamento |

---

## 🧰 Como rodar localmente

### 1️⃣ Pré-requisitos
- Docker + Docker Compose instalados  
- Node.js 20+  
- NPM ou Yarn  

---

### 2️⃣ Subir o ambiente
```bash
docker compose up -d
```

### 🧩 Serviços disponíveis

| Serviço      | Porta | Descrição              |
|---------------|-------|------------------------|
| PostgreSQL    | 5432  | Banco de dados         |
| RabbitMQ      | 5672  | Conexão AMQP           |
| RabbitMQ UI   | 15672 | Painel de gerenciamento|
| Redis         | 6379  | Cache                  |

### 3️⃣ Rodar a aplicação NestJS

```bash
npm install
npm run start:dev
```

A aplicação estará disponível em:  
👉 [http://localhost:3000](http://localhost:3000)

### 🧩 Variáveis de ambiente (.env)

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/transactions
RABBITMQ_URL=amqp://guest:guest@localhost:5672
REDIS_URL=redis://localhost:6379
PORT=3000
```

### 🧪 Testes

- Testes unitários com **Jest**  
- Mocks de **RabbitMQ** e banco  
- Cobertura de testes focada em fluxos críticos  

```bash
npm run test
```

### 🔐 Segurança

- Autenticação **JWT** *(opcional para o case)*  
- Criptografia de dados sensíveis  
- Logs de auditoria imutáveis  
- **Rate limiting** e validação de input  


### 📊 Observabilidade

- Logs estruturados via **Winston**  
- Métricas expostas via **Prometheus**  
- Dashboards com **Grafana**  
- Alertas de falhas e SLAs *(ex: transações falhas > 1%)*  

### 🏗️ Possíveis evoluções

- Módulo de **PIX** e agendamentos  
- Integração com sistema **antifraude**  
- Publicação de eventos para outros microsserviços via **Kafka**  
- **API Gateway** com rate limiting e tracing distribuído  

### 👨‍💻 Autor

**João Vitor Coelho**  
Engenheiro de software Senior Backend • Especialista em **NestJS** e **microsserviços**  
📍 Fortaleza - CE 🇧🇷  
