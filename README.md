# Documentação do Sitema para Barbearia - Back-end

## Introdução

### 1. Objetivo
Sistema desenvolvido para barbearias de médio porte, que moderniza processos manuais como agendamentos, gestão de clientes e trazendo eficiência e organização.

## 1.1 📌 Visão Geral das Tecnologias Utilizadas
Back-end desenvolvido para o sistema de barbearia

- API RESTful (Node.js + Express)
- Banco de Dados (Railway MySQL com Prisma ORM )
- Autenticação (JWT + Bcrypt)
- Gestão de agendamento (Com validações de horário)

----
## 2.Configuração
### 2.1 Pré-requisitos
- Node.js (v18+)
- MySQL 
- Yarn ou NPM
### 2.2 Instalação
```bash
git clone [https://github.com/Carlos-bub/backend.git]
cd backend
npm install
cp .env.example .env
```
### 3. Váriaveis de Ambiente(`/.envi`)
```ini
DATABASE_URL="postgresql: //USER:SENHA@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3001
```
### 4. Migrações do Banco de Dados
```bash
npx prisma migrate dev
npx prisma generate
```
### 🚀 Execução
---
| Comando               | Descrição                                  |
|-----------------------|--------------------------------------------|
| `npm start`           | Inicia o servidor em produção             |
| `npm run dev`         | Inicia com hot-reload (nodemon)           |

### 📂 Estrutura de Pastas
```bash
src/
├── controllers/     # Lógica das rotas
│   ├── auth.controller.js
│   ├── scheduling.controller.js
├── routes/          # Definição de endpoints
│   ├── auth.routes.js
│   ├── api.routes.js
├── middleware/      # Interceptores
│   ├── auth.js      # Valida JWT
│   ├── errorHandler.js
├── utils/           # Helpers
│   ├── dateUtils.js # Formata datas
│   ├── jwt.js       # Geração de tokens
prisma/
├── schema.prisma   # Modelagem do banco
```
### 🔗 Rotas Principais

#### Autenticação
|Método                        |Rota       |Descrição               |
|-----------------------|---------------------|----------------------|
|POST               |/api/auth/login      | Login(retorna JWT)       |
|POST               |/api/auth/sigup      | Cadastro de Administrador| 
---
### Agendamentos
|Método            |Rota                 |Descrição                |
|------------------|---------------------|-------------------------|
|GET               |/api/scheduling      | Lista todos Agendamentos|
|POST              |/api/scheduling      | Criar novo Agendamento  |
|DELETE            |/api/scheduling/:id  | Cancelar Agendamento    |
---
### 🛡️ Segurança
- Bcrypt: Hash de senhas antes de Salvar no Banco
- JWT: Tokens com expiração (1h por padrão)
- CORS: Restrito a origens autorizadas
- Validação de Inputs: Sanitização de dados em todas as rotas

### 📦 Dependências

#### Principais
---
|Pacote        | Uso                     |
|--------------|-------------------------|
|Express       | Framework HTTP          |
|prisma        | ORM para MySQL          |
|jsonwebtoken  | Autenticação via JWT    |
|date-fns      | Manipulação de datas    |
### Dev
---
|Pacote        | Uso                     |
|--------------|-------------------------|
|nodemon       | Reinicio Automatico     |
## Licença
ISC License - Veja LICENSE para detalhes.