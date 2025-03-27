package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Todo struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var (
	todos   []Todo
	mu      sync.RWMutex
	nextID  = 1
)

func main() {
	router := gin.Default()

	// Configuração do CORS mais permissiva para desenvolvimento
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Permite todas as origens
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60, // 12 horas
	}))

	// Middleware para logging
	router.Use(func(c *gin.Context) {
		log.Printf("Requisição: %s %s", c.Request.Method, c.Request.URL.Path)
		c.Next()
	})

	// Listar todas as tarefas
	router.GET("/api/todos", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, todos)
	})

	// Criar nova tarefa
	router.POST("/api/todos", func(c *gin.Context) {
		var todo Todo
		if err := c.ShouldBindJSON(&todo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		mu.Lock()
		todo.ID = nextID
		nextID++
		todos = append(todos, todo)
		mu.Unlock()

		c.JSON(http.StatusCreated, todo)
	})

	// Atualizar tarefa
	router.PUT("/api/todos/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
			return
		}

		var updatedTodo Todo
		if err := c.ShouldBindJSON(&updatedTodo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		mu.Lock()
		defer mu.Unlock()

		for i, todo := range todos {
			if todo.ID == id {
				updatedTodo.ID = id
				todos[i] = updatedTodo
				c.JSON(http.StatusOK, updatedTodo)
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"error": "Tarefa não encontrada"})
	})

	// Deletar tarefa
	router.DELETE("/api/todos/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
			return
		}
		
		mu.Lock()
		defer mu.Unlock()

		for i, todo := range todos {
			if todo.ID == id {
				todos = append(todos[:i], todos[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "Tarefa removida com sucesso"})
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"error": "Tarefa não encontrada"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Servidor rodando na porta %s", port)
	router.Run(":" + port)
} 