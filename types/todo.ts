export type Todo = {
  id: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string | null
  tags: string[]
};

export type Filters = {
  page?: number
  limit?: number
  completed?: boolean
  priority?: string
}

export type TodoResponse = {
  data: Todo[]
  total: number
  page: number
  limit: number
}