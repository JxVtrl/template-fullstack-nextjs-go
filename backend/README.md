# Backend - Go Todo API

Backend da aplicação de Lista de Tarefas construído com Go e Gin Framework.

## Tecnologias Utilizadas

- Go 1.21+
- Gin Framework
- CORS middleware
- Docker

## Estrutura do Projeto

```
backend/
├── main.go      # Arquivo principal da aplicação
├── go.mod       # Gerenciamento de dependências
├── go.sum       # Checksum das dependências
└── Dockerfile   # Configuração do Docker
```

## Pré-requisitos

- Go 1.21+ (apenas para desenvolvimento local)
- Docker (recomendado)
- Docker Compose (recomendado)

## 🚀 Como Executar

### Usando Docker Compose (Recomendado)

Esta é a forma mais simples de executar o projeto, pois o Docker Compose já faz o build e execução de todos os serviços automaticamente.

Na raiz do projeto:
```bash
docker-compose up --build
```

O comando acima irá:
- Construir a imagem Docker do backend
- Iniciar o serviço
- Configurar a rede com o frontend
- Expor a porta 8080

O backend estará disponível em `http://localhost:8080`

### Desenvolvimento Local (Alternativo)

Se preferir executar sem Docker:

1. Instale as dependências:
```bash
go mod tidy
```

2. Execute o servidor:
```bash
go run main.go
```

O servidor estará disponível em `http://localhost:8080`

## Docker

O backend está configurado para ser executado facilmente com Docker. O Docker Compose já gerencia todo o processo de build e execução.

### Usando Docker Compose (Recomendado)

```bash
# Iniciar os serviços
docker-compose up --build

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs -f backend
```

### Executando Individualmente (Alternativo)

Se precisar executar o backend separadamente:
```bash
docker build -t backend .
docker run -p 8080:8080 backend
```

## API Endpoints

### Listar Tarefas
```http
GET /api/todos
```

Resposta:
```json
[
  {
    "id": 1,
    "title": "Exemplo de tarefa",
    "completed": false
  }
]
```

### Criar Tarefa
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Nova tarefa",
  "completed": false
}
```

Resposta:
```json
{
  "id": 1,
  "title": "Nova tarefa",
  "completed": false
}
```

### Atualizar Tarefa
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Tarefa atualizada",
  "completed": true
}
```

Resposta:
```json
{
  "id": 1,
  "title": "Tarefa atualizada",
  "completed": true
}
```

### Deletar Tarefa
```http
DELETE /api/todos/:id
```

Resposta:
```json
{
  "message": "Tarefa removida com sucesso"
}
```

## Funcionalidades

- API RESTful
- Armazenamento em memória
- Sincronização thread-safe
- Validação de dados
- Tratamento de erros
- CORS configurado
- Logging de requisições

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 