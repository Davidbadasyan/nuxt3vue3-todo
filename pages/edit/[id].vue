<template>
  <div class="mx-auto mt-10 max-w-xl">
    <div v-if="!todo">
      Loading...
    </div>

    <TodoForm
      v-if="todo"
      :model-value="todo"
      mode="edit"
      @update="handleUpdate"
      @cancel="goBack"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToDoStore } from '~/stores/todo';

import TodoForm from '~/components/TodoForm.vue';

import type { Todo } from '~/types/todo';

const route = useRoute();
const router = useRouter();
const toDoStore = useToDoStore();
const { fetchTodoById, updateToDo } = toDoStore;

const todo = ref<Todo | null>(null);

const itemId = computed(() => String(route.params.id));

const created = async () => {
  const res = await fetchTodoById(itemId.value);
  if (res) {
    todo.value = res;
  }
};

onMounted(() => {
  created();
});

const handleUpdate = async (updatedTodo: Todo): Promise<void> => {
  try {
    await updateToDo(updatedTodo);
    router.push('/');
  } catch (error) {
    console.error('Update failed', error);
  }
};

const goBack = () => router.push('/');
</script>
