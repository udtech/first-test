"use client";

import { useState, useRef } from "react";
import { useTodos } from "@/app/hooks/useTodos";

export default function Home() {
  const { todos, addTodo, deleteTodo, reorderTodos } = useTodos();
  const [input, setInput] = useState("");
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addTodo(text);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-stone-950 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <header className="mb-12">
          <p className="text-xs tracking-[0.3em] text-stone-500 uppercase mb-2">Task Manager</p>
          <h1 className="text-2xl font-light text-stone-100 tracking-wide">
            やること
          </h1>
          <div className="mt-4 h-px bg-gradient-to-r from-stone-700 to-transparent" />
        </header>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新しいタスクを追加"
            className="flex-1 bg-transparent border-b border-stone-700 pb-2 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-stone-400 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="text-stone-400 hover:text-stone-100 transition-colors disabled:opacity-20 text-lg pb-2 border-b border-transparent"
          >
            →
          </button>
        </form>

        <p className="text-xs text-stone-600 tracking-widest uppercase mb-6">
          {todos.length === 0 ? "No tasks" : `${todos.length} task${todos.length > 1 ? "s" : ""}`}
        </p>

        <ul className="space-y-1">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              draggable
              onDragStart={() => { dragIndex.current = index; }}
              onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
              onDrop={() => {
                if (dragIndex.current !== null && dragIndex.current !== index) {
                  reorderTodos(dragIndex.current, index);
                }
                dragIndex.current = null;
                setOverIndex(null);
              }}
              onDragEnd={() => { dragIndex.current = null; setOverIndex(null); }}
              className={`group flex items-center gap-4 py-3 px-2 rounded transition-all cursor-grab active:cursor-grabbing ${
                overIndex === index ? "bg-stone-800" : "hover:bg-stone-900"
              }`}
            >
              <span className="text-stone-700 select-none text-xs">⠿</span>
              <span className="flex-1 text-stone-300 text-sm font-light break-all">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-stone-600 hover:text-stone-300 transition-all text-xs tracking-widest"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-stone-700 text-xs tracking-widest mt-20 uppercase">Empty</p>
        )}
      </div>
    </main>
  );
}
