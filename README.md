# Template FullStack Next.js + Go

Este é um template fullstack que utiliza Next.js para o frontend e Go para o backend. O projeto implementa uma aplicação de Lista de Tarefas (Todo List) para demonstrar a integração entre as tecnologias.

## Estrutura do Projeto

```
.
├── frontend/     # Aplicação Next.js
└── backend/      # API Go
```

## Pré-requisitos

- Node.js 18+
- Go 1.21+
- Docker (opcional)

## Configuração do Backend

1. Entre no diretório do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
go mod tidy
```

3. Execute o servidor:
```bash
go run main.go
```

O servidor backend estará rodando em `http://localhost:8080`

## Configuração do Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## Docker

Para executar o projeto usando Docker:

1. Construa e execute o backend:
```bash
cd backend
docker build -t backend .
docker run -p 8080:8080 backend
```

2. Construa e execute o frontend:
```bash
cd frontend
docker build -t frontend .
docker run -p 3000:3000 frontend
```

Ou use o docker-compose para executar ambos os serviços:
```bash
docker-compose up --build
```

## Funcionalidades

- Criar novas tarefas
- Marcar tarefas como concluídas
- Deletar tarefas
- Listar todas as tarefas
- Interface responsiva e moderna

## API Endpoints

- GET `/api/todos` - Lista todas as tarefas
- POST `/api/todos` - Cria uma nova tarefa
- PUT `/api/todos/:id` - Atualiza uma tarefa existente
- DELETE `/api/todos/:id` - Remove uma tarefa

## Tecnologias Utilizadas

- Frontend:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Axios

- Backend:
  - Go
  - Gin Framework
  - CORS middleware 