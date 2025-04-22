<template>
  <form class="mx-auto max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-md" @submit.prevent="submit">
    <h2 class="text-2xl font-bold text-gray-800">
      {{ mode === 'edit' ? '✏️ Edit Todo' : '➕ Add New Todo' }}
    </h2>

    <div>
      <label class="red mb-1 block text-sm font-medium text-gray-700">Title</label>
      <input
        v-model="localTodo.title"
        type="text"
        placeholder="Enter title"
        class="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700">Priority</label>
      <select
        v-model="localTodo.priority"
        class="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="low">
          Low
        </option>
        <option value="medium">
          Medium
        </option>
        <option value="high">
          High
        </option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
      <input
        v-model="localTodo.dueDate"
        type="date"
        class="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700">Tags</label>
      <input
        v-model="tagInput"
        type="text"
        placeholder="e.g. project, personal"
        class="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
    </div>

    <div class="flex justify-end gap-3 pt-3">
      <button
        type="submit"
        class="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
      >
        {{ mode === 'edit' ? 'Update Todo' : 'Add Todo' }}
      </button>
      <button
        type="button"
        class="rounded-xl bg-gray-300 px-5 py-2.5 text-gray-800 transition hover:bg-gray-400"
        @click="handleCancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Todo } from '~/types/todo';

const props = withDefaults(defineProps<{
  modelValue?: Todo
  mode?: string
}>(), {
  mode: 'create',
});

const emit = defineEmits<{
  (event: 'add', todo: Todo): void
  (event: 'update', todo: Todo): void
  (event: 'cancel'): void
}>();

const tagInput = ref('');
const localTodo = ref<Todo>({
  id: 0,
  title: '',
  completed: false,
  priority: 'medium',
  dueDate: null,
  tags: [],
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) return;
    localTodo.value = { ...newValue };
    tagInput.value = newValue.tags.join(', ');
  },
  { immediate: true },
);

const submit = (): void => {
  localTodo.value.tags = tagInput.value.split(',').map((t) => t.trim()).filter(Boolean);

  if (props.mode === 'edit') {
    emit('update', localTodo.value);
  } else {
    emit('add', localTodo.value);
    resetForm()
  }
};

const resetForm = (): void => {
  localTodo.value = {
    id: 0,
    title: '',
    completed: false,
    priority: 'medium',
    dueDate: null,
    tags: [],
  };
  tagInput.value = '';
};

const handleCancel = (): void => props.mode === 'edit' ? emit('cancel') : resetForm();

</script>
