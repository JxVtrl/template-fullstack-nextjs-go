# Template FullStack Next.js + Go

Este é um template fullstack que utiliza Next.js para o frontend e Go para o backend. O projeto implementa uma aplicação de Lista de Tarefas (Todo List) para demonstrar a integração entre as tecnologias.

## 🚀 Tecnologias

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- React Hooks

### Backend
- Go 1.21+
- Gin Framework
- CORS middleware
- Docker

## 📁 Estrutura do Projeto

```
.
├── frontend/     # Aplicação Next.js
│   ├── src/
│   │   ├── pages/    # Páginas da aplicação
│   │   └── styles/   # Estilos globais
│   ├── public/       # Arquivos estáticos
│   └── Dockerfile    # Configuração do Docker
│
└── backend/      # API Go
    ├── main.go   # Arquivo principal
    ├── go.mod    # Dependências
    └── Dockerfile # Configuração do Docker
```

## 🛠️ Pré-requisitos

- Node.js 18+ (apenas para desenvolvimento local)
- Go 1.21+ (apenas para desenvolvimento local)
- Docker (recomendado)
- Docker Compose (recomendado)

## 🚀 Como Executar

### Usando Docker Compose (Recomendado)

Esta é a forma mais simples de executar o projeto, pois o Docker Compose já faz o build e execução de ambos os serviços automaticamente.

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/template-fullstack-nextjs-go.git
cd template-fullstack-nextjs-go
```

2. Execute com Docker Compose:
```bash
docker-compose up --build
```

O comando acima irá:
- Construir as imagens Docker do frontend e backend
- Iniciar ambos os serviços
- Configurar a rede entre eles
- Expor as portas necessárias

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:8080`

### Executando Localmente (Alternativo)

Se preferir executar sem Docker, siga estas instruções:

1. Backend:
```bash
cd backend
go mod tidy
go run main.go
```

2. Frontend (em outro terminal):
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Backend:
```env
PORT=8080
```

## 📝 Funcionalidades

- ✅ Criar novas tarefas
- ✅ Listar todas as tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Deletar tarefas
- ✅ Interface responsiva
- ✅ Feedback visual de ações
- ✅ Tratamento de erros
- ✅ Loading states

## 🔍 API Endpoints

- GET `/api/todos` - Lista todas as tarefas
- POST `/api/todos` - Cria uma nova tarefa
- PUT `/api/todos/:id` - Atualiza uma tarefa
- DELETE `/api/todos/:id` - Remove uma tarefa

## 🐳 Docker

O projeto está configurado para ser executado facilmente com Docker. O Docker Compose já gerencia todo o processo de build e execução dos serviços.

### Usando Docker Compose (Recomendado)

```bash
# Iniciar os serviços
docker-compose up --build

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs -f
```

### Executando Serviços Individualmente (Alternativo)

Se precisar executar os serviços separadamente:

Frontend:
```bash
cd frontend
docker build -t frontend .
docker run -p 3000:3000 frontend
```

Backend:
```bash
cd backend
docker build -t backend .
docker run -p 8080:8080 backend
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Gin Framework](https://gin-gonic.com/)
- [Tailwind CSS](https://tailwindcss.com/) 