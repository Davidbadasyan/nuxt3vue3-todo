<template>
  <div class="mb-2 rounded border bg-white p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-start gap-3">
        <div>
          <h2 :class="{ 'text-gray-400 line-through': todo.completed }" class="text-lg font-medium">
            {{ todo.title }}
          </h2>
          <div class="text-sm text-gray-500">
            Priority: {{ todo.priority }} | Due: {{ todo.dueDate || 'N/A' }}
          </div>
          <div class="mt-1 flex flex-wrap gap-1">
            <span v-for="tag in todo.tags" :key="tag" class="rounded-full bg-gray-200 px-2 py-0.5 text-sm">
              {{ tag }}
            </span>
          </div>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              :checked="todo.completed"
              class="mt-1 accent-blue-600"
              @change="emit('toggle')"
            >
            <span>Mark as completed</span>
          </label>
        </div>
      </div>

      <div class="flex items-start gap-2">
        <NuxtLink :to="`/edit/${todo.id}`">
          <button
            :disabled="todo.completed"
            class="text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
          >
            ✏️
          </button>
        </NuxtLink>

        <button
          :disabled="todo.completed"
          class="text-red-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
          @click="emit('delete')"
        >
          🗑
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types/todo';

defineProps<{ todo: Todo }>();

const emit = defineEmits<{
  (event: 'toggle'): void
  (event: 'delete'): void
}>();

</script>
