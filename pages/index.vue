<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-50 p-6">
    <h1 class="mb-6 text-2xl font-bold">
      📝 My Todo List
    </h1>

    <div class="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
      <div class="w-full lg:w-1/2">
        <TodoForm @add="addTodo" />
      </div>

      <div class="w-full lg:w-1/2">
        <FiltersComponent
          class="mb-4"
          @filter="onFilter"
        />

        <div v-if="isLoading">
          Loading...
        </div>
        <div v-if="error" class="text-red-500">
          {{ error }}
        </div>

        <div
          v-if="!isLoading && !error && todos.length === 0"
          class="mt-4 text-center text-gray-500"
        >
          No todos found. Try adding a new one!
        </div>

        <TodoItem
          v-for="(todo, index) in todos"
          :key="`${todo.id}-${index}`"
          :todo="todo"
          @toggle="toggleTodo(todo.id)"
          @delete="deleteTodo(todo.id, page)"
        />

        <div v-if="todos.length" class="mt-4 flex justify-center gap-4">
          <button
            :disabled="page === 1"
            class="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
            @click="prevPage"
          >
            Prev
          </button>
          <span class="text-sm font-medium">
            Page {{ page }}
          </span>
          <button
            :disabled="page * limit >= total"
            class="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TodoForm from '~/components/TodoForm.vue';
import TodoItem from '~/components/TodoItem.vue';
import FiltersComponent from '~/components/Filters.vue';

import { useToDoStore } from '~/stores/todo';
import { storeToRefs } from 'pinia';
import type { Filters } from '~/types/todo';

const toDoStore = useToDoStore();
const { fetchTodos, addTodo, deleteTodo, toggleTodo } = toDoStore;
const { error, isLoading, todos, total, limit, page } = storeToRefs(toDoStore);

const currentFilters = ref<Filters>({});

const fetchWithPage = (targetPage: number): void => {
  fetchTodos({ ...currentFilters.value, page: targetPage });
};

const onFilter = (filters: Filters): void => {
  currentFilters.value = filters;
  fetchWithPage(1);
};

const nextPage = (): void => {
  if (page.value * limit.value < total.value) {
    fetchWithPage(page.value + 1);
  }
};

const prevPage = (): void => {
  if (page.value > 1) {
    fetchWithPage(page.value - 1);
  }
};

onMounted(() => {
  fetchWithPage(1);
});
</script>
