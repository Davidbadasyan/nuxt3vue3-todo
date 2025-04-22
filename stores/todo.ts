import { defineStore } from 'pinia';
import type { Filters, Todo, TodoResponse } from '~/types/todo';

export const useToDoStore = defineStore('todo', {
  state: (): {
    todos: Todo[]
    total: number
    page: number
    limit: number
    isLoading: boolean
    error: string | null
  } => ({
    todos: [],
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
  }),
  actions: {
    async fetchTodos(filters: Filters = {}) {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await $fetch<TodoResponse>('/api/todos', {
          method: 'GET',
          params: filters,
        });
        this.todos = res.data;
        this.total = res.total;
        this.page = res.page;
        this.limit = res.limit;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTodoById(id: string): Promise<Todo | undefined> {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await $fetch<Todo>('/api/todos', {
          method: 'GET',
          params: { id },
        });
        return res;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async addTodo(todo: Partial<Todo>) {
      await $fetch('/api/todos', {
        method: 'POST',
        body: todo,
      });
      await this.fetchTodos();
    },

    async deleteTodo(id: number, page: number) {
      await $fetch('/api/todos', {
        method: 'DELETE',
        body: { id },
      });
      await this.fetchTodos({ page});
    },

    async updateToDo(todo: Partial<Todo>) {
      await $fetch('/api/todos', {
        method: 'PUT',
        body: todo,
      });
    },

    async toggleTodo(id: number) {
      await $fetch('/api/todos', {
        method: 'PATCH',
        body: { id },
      });
      this.todos = this.todos.map((todo)=> ({
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed,
      }))
    },
  },
});
