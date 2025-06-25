'use client';

import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初期データの読み込み（後でAPI呼び出しに置き換え）
  useEffect(() => {
    // サンプルデータ
    const sampleTodos: Todo[] = [
      {
        id: '1',
        name: 'Next.jsプロジェクトのセットアップ',
        description: 'TypeScriptとTailwind CSSを使用してプロジェクトを作成',
        completed: true,
      },
      {
        id: '2',
        name: 'Go APIサーバーの実装',
        description: 'GinフレームワークでREST APIを作成',
        completed: false,
      },
    ];
    setTodos(sampleTodos);
  }, []);

  const handleAddTodo = (todoRequest: CreateTodoRequest) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // 一時的なID生成（後でUUIDに変更）
      name: todoRequest.title,
      description: todoRequest.description,
      completed: false,
      
    };
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (id: string, updates: UpdateTodoRequest) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <TodoList
        todos={todos}
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </main>
  );
}