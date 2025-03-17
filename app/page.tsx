'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Sparkles, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserAuth from '@/components/user-auth';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mr-3" />
              <h1 className="text-4xl font-bold text-white">浩宇 TODO</h1>
            </div>
            <UserAuth />
          </div>

          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="添加新任务..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                添加
              </button>
            </div>
          </form>

          <AnimatePresence>
            {todos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="group flex items-center gap-3 bg-white/20 rounded-xl p-4 mb-3 hover:bg-white/30 transition-all duration-200"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-white hover:scale-110 transition-transform duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <span className={`flex-1 text-white ${todo.completed ? 'line-through opacity-50' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-white opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {todos.length === 0 && (
            <div className="text-center text-white/70 py-8">
              <XCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">暂无待办事项，请添加。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}