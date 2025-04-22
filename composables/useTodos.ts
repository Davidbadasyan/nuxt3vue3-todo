// import { ref } from 'vue'
// import type { Todo } from '~/types/todo'

// const todos = ref<Todo[]>([])
// const isLoading = ref(false)
// const error = ref<string | null>(null)

// export const useTodos = () => {
//   const fetchTodos = async (filters = {}) => {
//     isLoading.value = true
//     error.value = null
//     try {
//       const res = await $fetch('/api/todos', {
//         method: 'GET',
//         params: filters
//       })
//       todos.value = res.data || []
//     } catch (e: any) {
//       error.value = e.message
//     } finally {
//       isLoading.value = false
//     }
//   }

//   const addTodo = async (todo: Partial<Todo>) => {
//     await $fetch('/api/todos', {
//       method: 'POST',
//       body: todo
//     })
//     fetchTodos()
//   }

//   const deleteTodo = async (id: number) => {
//     await $fetch('/api/todos', {
//       method: 'DELETE',
//       body: { id }
//     })
//     fetchTodos()
//   }

//   const toggleTodo = async (id: number) => {
//     await $fetch('/api/todos', {
//       method: 'PATCH',
//       body: { id }
//     })
//     fetchTodos()
//   }

//   return {
//     todos,
//     isLoading,
//     error,
//     fetchTodos,
//     addTodo,
//     deleteTodo,
//     toggleTodo
//   }
// }
