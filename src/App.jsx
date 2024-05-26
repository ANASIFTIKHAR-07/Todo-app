// App.jsx

import { useState, useEffect } from 'react';
import { TodoProvider } from './context';
import { TodoForm, TodoItem } from './components';

function App() {
    const [todos, setTodos] = useState([]);
    
    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const togglecomplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)));
    };

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, togglecomplete }}>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex justify-center items-center py-10">
                <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Todoify</h1>
                        <p className="text-gray-600 mb-6">Stay organized and productive</p>
                        <TodoForm />
                        <ul className="mt-8">
                            {todos.map((todo) => (
                                <li key={todo.id} className="mb-4">
                                    <TodoItem todo={todo} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
