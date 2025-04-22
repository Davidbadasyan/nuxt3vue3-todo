<template>
  <div class="mb-4 flex flex-wrap items-center gap-4">
    <select
      v-model="selectedStatus"
      class="!w-[145px] rounded-lg border border-gray-300 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">
        All
      </option>
      <option value="true">
        Completed
      </option>
      <option value="false">
        Not Completed
      </option>
    </select>

    <select
      v-model="selectedPriority"
      class="!w-[125px] rounded-lg border border-gray-300 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">
        All Priorities
      </option>
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

    <button
      class="h-10 rounded-lg bg-gray-800 px-4 text-sm font-medium text-white transition hover:bg-gray-700"
      @click="applyFilters"
    >
      Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Filters } from '~/types/todo';

const emit = defineEmits<{
  (e: 'filter', filters: Filters): void
}>();

const selectedStatus = ref<boolean>(false);
const selectedPriority = ref<string>('');

const applyFilters = () => {
  emit('filter', {
    completed: selectedStatus.value,
    priority: selectedPriority.value,
  });
};
</script>
