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
      setTodos(response.data || []);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
      setTodos([]);
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
      setTodos(prevTodos => [...prevTodos, response.data]);
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
      setTodos(prevTodos => prevTodos.map(t => 
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
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-xl sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center justify-center mb-8">
                  <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Lista de Tarefas
                  </h1>
                </div>
                
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
                    <p className="font-medium">Erro</p>
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={addTodo} className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Nova tarefa..."
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    {todos.length > 0 ? 'Suas Tarefas' : 'Nenhuma Tarefa'}
                  </h2>
                  <ul className="space-y-4">
                    {todos && todos.length > 0 ? (
                      todos.map(todo => (
                        <li 
                          key={todo.id} 
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleTodo(todo)}
                              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            />
                            <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {todo.title}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                            title="Deletar tarefa"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-lg font-medium">Nenhuma tarefa encontrada</p>
                        <p className="text-sm mt-2">Adicione uma nova tarefa para começar!</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 