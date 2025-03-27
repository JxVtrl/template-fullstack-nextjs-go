import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/todos', {
        title: newTodo,
        completed: false
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      setError('Erro ao adicionar tarefa');
      console.error(err);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(t => 
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8 text-center">Lista de Tarefas</h1>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={addTodo} className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Nova tarefa..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>

                <ul className="space-y-4">
                  {todos.map(todo => (
                    <li key={todo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo)}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.title}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Deletar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 