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

  const cardColors = [
    "bg-yellow-300 border-yellow-400",
    "bg-pink-300 border-pink-400",
    "bg-sky-300 border-sky-400",
    "bg-green-300 border-green-400",
    "bg-purple-300 border-purple-400",
    "bg-orange-300 border-orange-400",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-xl rotate-[-1deg]">
            <p className="text-xs font-bold tracking-widest text-fuchsia-500 uppercase mb-1">✨ Task Manager</p>
            <h1 className="text-4xl font-black text-gray-800">
              やること
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新しいタスクを追加..."
            className="flex-1 bg-white rounded-2xl px-5 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg text-sm font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-white rounded-2xl px-5 py-3 font-black text-xl text-fuchsia-500 shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100"
          >
            +
          </button>
        </form>

        <p className="text-white/80 text-xs font-bold tracking-widest uppercase text-center mb-6">
          {todos.length === 0 ? "タスクなし" : `${todos.length}件のタスク`}
        </p>

        <ul className="space-y-3">
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
              className={`group flex items-center gap-3 px-4 py-3 rounded-2xl border-b-4 shadow-md cursor-grab active:cursor-grabbing transition-all ${
                cardColors[index % cardColors.length]
              } ${overIndex === index ? "scale-105" : "hover:scale-[1.02]"}`}
            >
              <span className="text-gray-500 select-none text-sm">⠿</span>
              <span className="flex-1 text-gray-800 text-sm font-bold break-all">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 bg-white/60 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-500 transition-all text-xs font-black"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-6xl mb-4">📝</p>
            <p className="text-white/70 text-sm font-bold tracking-widest uppercase">タスクを追加しよう！</p>
          </div>
        )}
      </div>
    </main>
  );
}
