# Frontend - Next.js Todo App

Frontend da aplicação de Lista de Tarefas construído com Next.js, TypeScript e Tailwind CSS.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- React Hooks

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/          # Páginas da aplicação
│   └── styles/         # Estilos globais
├── public/             # Arquivos estáticos
├── Dockerfile          # Configuração do Docker
└── next.config.js      # Configuração do Next.js
```

## Pré-requisitos

- Node.js 18+ (apenas para desenvolvimento local)
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
- Construir a imagem Docker do frontend
- Iniciar o serviço
- Configurar a rede com o backend
- Expor a porta 3000

O frontend estará disponível em `http://localhost:3000`

### Desenvolvimento Local (Alternativo)

Se preferir executar sem Docker:

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Configure as variáveis de ambiente:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em `http://localhost:3000`

## Build

Para criar uma build de produção:
```bash
npm run build
# ou
yarn build
```

## Docker

O frontend está configurado para ser executado facilmente com Docker. O Docker Compose já gerencia todo o processo de build e execução.

### Usando Docker Compose (Recomendado)

```bash
# Iniciar os serviços
docker-compose up --build

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs -f frontend
```

### Executando Individualmente (Alternativo)

Se precisar executar o frontend separadamente:
```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## Funcionalidades

- Listagem de tarefas
- Adição de novas tarefas
- Marcação de tarefas como concluídas
- Exclusão de tarefas
- Interface responsiva
- Feedback visual de ações
- Tratamento de erros
- Loading states

## Integração com o Backend

O frontend se comunica com o backend através de uma API REST:

- GET `/api/todos` - Lista todas as tarefas
- POST `/api/todos` - Cria uma nova tarefa
- PUT `/api/todos/:id` - Atualiza uma tarefa
- DELETE `/api/todos/:id` - Remove uma tarefa

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
