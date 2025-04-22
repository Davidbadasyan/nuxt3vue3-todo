import { Todo } from "~/types/todo";


// Initial mock data
const todos: Todo[] = [
  {
    id: 1,
    title: 'Learn Nuxt 3',
    completed: false,
    priority: 'high',
    dueDate: '2023-12-31',
    tags: ['learning', 'tech']
  },
  {
    id: 2,
    title: 'Build a portfolio website',
    completed: false,
    priority: 'medium',
    dueDate: '2024-01-15',
    tags: ['project', 'portfolio']
  },
  {
    id: 3,
    title: 'Read "Clean Code" book',
    completed: true,
    priority: 'low',
    dueDate: null,
    tags: ['reading', 'self-improvement']
  }
];


// const todos: Todo[] = [];

// for(let i = 0; i < 100; i++) {
//   const base = baseTodos[i % baseTodos.length];
//   todos.push({
//     ...base,
//     id: i + 1,
//     title: `${base.title} ${i + 1}`,
//     completed: Math.random() < 0.5,
//     priority: base.priority,
//     dueDate: base.dueDate,
//     tags: [...base.tags, `tag${i}`]
//   } as Todo);
// }

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const query = getQuery(event);
  
  // GET - List todos (with optional filtering)
  if (method === 'GET') {
    if (query.id) {
      const todo = todos.find(t => t.id === Number(query.id));
      return todo ? todo : { error: 'Todo not found' };
    }
    
    let filteredTodos = [...todos];
    
    // Filter by completed status if specified
    if (query.completed !== undefined) {
      const isCompleted = query.completed === 'true';
      filteredTodos = filteredTodos.filter(t => t.completed === isCompleted);
    }
    
    // Filter by priority if specified
    if (query.priority) {
      filteredTodos = filteredTodos.filter(t => t.priority === query.priority);
    }
    
    // Basic pagination
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      data: filteredTodos.slice(start, end),
      total: filteredTodos.length,
      page,
      limit
    };
  }
  
  // POST - Create new todo
  if (method === 'POST') {
    const body = await readBody(event);
    
    if (!body.title) {
      return {
        statusCode: 400,
        error: 'Title is required'
      };
    }
    
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: body.title,
      completed: body.completed || false,
      priority: body.priority || 'medium',
      dueDate: body.dueDate || null,
      tags: body.tags || []
    };
    
    todos.push(newTodo);
    
    return {
      statusCode: 201,
      data: newTodo
    };
  }
  
  // PUT - Update todo
  if (method === 'PUT') {
    const body = await readBody(event);
    
    if (!body.id) {
      return {
        statusCode: 400,
        error: 'Todo ID is required'
      };
    }
    
    const todoIndex = todos.findIndex(t => t.id === Number(body.id));
    
    if (todoIndex === -1) {
      return {
        statusCode: 404,
        error: 'Todo not found'
      };
    }
    
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...body
    };
    
    return {
      statusCode: 200,
      data: todos[todoIndex]
    };
  }
  
  // PATCH - Toggle todo completion status
  if (method === 'PATCH') {
    const body = await readBody(event);
    
    if (!body.id) {
      return {
        statusCode: 400,
        error: 'Todo ID is required'
      };
    }
    
    const todoIndex = todos.findIndex(t => t.id === Number(body.id));
    
    if (todoIndex === -1) {
      return {
        statusCode: 404,
        error: 'Todo not found'
      };
    }
    
    todos[todoIndex].completed = !todos[todoIndex].completed;
    
    return {
      statusCode: 200,
      data: todos[todoIndex]
    };
  }
  
  // DELETE - Remove todo
  if (method === 'DELETE') {
    const body = await readBody(event);
    
    if (!body.id) {
      return {
        statusCode: 400,
        error: 'Todo ID is required'
      };
    }
    
    const todoIndex = todos.findIndex(t => t.id === Number(body.id));
    
    if (todoIndex === -1) {
      return {
        statusCode: 404,
        error: 'Todo not found'
      };
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    return {
      statusCode: 200,
      data: deletedTodo
    };
  }
  
  return {
    statusCode: 405,
    error: 'Method not allowed'
  };
}); 