import type { Todo } from "~/types/todo";

export const sampleTodos: Todo[] = [
  {
    id: 1,
    title: 'Learn Nuxt 3 basics',
    completed: false,
    priority: 'high',
    dueDate: '2023-12-31',
    tags: ['learning', 'vue', 'nuxt']
  },
  {
    id: 2,
    title: 'Create a component library',
    completed: true,
    priority: 'medium',
    dueDate: '2023-11-15',
    tags: ['components', 'ui']
  },
  {
    id: 3,
    title: 'Write unit tests',
    completed: false,
    priority: 'high',
    dueDate: '2023-12-10',
    tags: ['testing', 'quality']
  },
  {
    id: 4,
    title: 'Learn about Pinia stores',
    completed: false,
    priority: 'medium',
    dueDate: null,
    tags: ['state', 'pinia']
  },
  {
    id: 5,
    title: 'Research composables',
    completed: true,
    priority: 'low',
    dueDate: '2023-10-05',
    tags: ['composition-api']
  }
] 