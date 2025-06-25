'use client';
import React,{useState} from 'react'
import { Plus, Check, X, Edit2, Trash2 } from 'lucide-react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

interface TodoListProps{
    todos:Todo[];
    onAddTodo:(todo:CreateTodoRequest)=>void;
    onUpdateTodo:(id:string,todo:UpdateTodoRequest)=>void;
    onDeleteTodo:(id:string)=>void;
}

export default function TodoList({todos,onAddTodo,onUpdateTodo,onDeleteTodo}:TodoListProps){
    const [newTodo,setNewTodo] = useState({title:"",description:""});
    const [editingId,setEditingId] = useState<string|null>(null);
    const [editingTodo,setEditingTodo] = useState({title:"",description:""});

    const handleAddTodo = (e: React.FormEvent)=>{
        e.preventDefault();
        if (newTodo.title.trim()){
            onAddTodo({
                title:newTodo.title.trim(),
                description:newTodo.description.trim()||undefined,
            });
            setNewTodo({title:"",description:""});
        }
    };

    const handleEditStart = (todo:Todo)=>{
        setEditingId(todo.id);
        setEditingTodo({title:todo.name,description:todo.description||""});
    };

    const handleEditSave = ()=>{
        if(editingId && editingTodo.title.trim()){
            onUpdateTodo(editingId,{
                title:editingTodo.title.trim(),
                description:editingTodo.title.trim()||undefined,
            });
            setEditingId(null)
            setEditingTodo({title:"",description:""})
        }
    };
    
    const handleEditCancel = ()=>{
        setEditingId(null);
        setEditingTodo({title:"",description:""});

    };
    return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Todo List</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="mb-3">
          <input
            type="text"
            placeholder="タスクのタイトル"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="詳細（オプション）"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          追加
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">タスクがありません</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`p-4 border rounded-lg transition-all ${
                todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              {editingId === todo.id ? (
                // Edit Mode
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={2}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditSave}
                      className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      保存
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => onUpdateTodo(todo.id, { completed: e.target.checked })}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <h3 className={`text-lg font-medium ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}>
                        {todo.name}
                      </h3>
                    </div>
                    {todo.description && (
                      <p className={`ml-7 text-sm ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                      }`}>
                        {todo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditStart(todo)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTodo(todo.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {todos.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600">
            <span>合計: {todos.length}</span>
            <span>完了: {todos.filter(t => t.completed).length}</span>
            <span>未完了: {todos.filter(t => !t.completed).length}</span>
          </div>
        </div>
      )}
    </div>
  );
}