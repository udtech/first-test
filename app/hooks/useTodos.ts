"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/app/types/todo";

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  const save = (items: Todo[]) => {
    setTodos(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
    };
    save([newTodo, ...todos]);
  };

  const deleteTodo = (id: string) => {
    save(todos.filter((t) => t.id !== id));
  };

  const reorderTodos = (fromIndex: number, toIndex: number) => {
    const next = [...todos];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    save(next);
  };

  return { todos, addTodo, deleteTodo, reorderTodos };
}
