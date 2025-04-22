# Frontend Technical Assessment

This is a technical assessment for Frontend Developer candidates. The assessment is designed to evaluate your skills in:

- Vue.js 3 and Nuxt 3
- Component-based architecture
- State management with Pinia
- API integration
- Unit testing
- UI/UX considerations

## Prerequisites

- Node.js 20+ installed
- Git

## Getting Started

1. Clone this repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/components` - Vue components
- `/composables` - Reusable composition functions
- `/pages` - Application pages
- `/stores` - Pinia stores
- `/server/api` - Mock API endpoints
- `/tests` - Unit tests

## Mock API

The project includes a mock API for todos at `/api/todos` that supports:

- GET - Retrieve todos (with filtering options)
- POST - Create a new todo
- PUT - Update a todo
- PATCH - Toggle todo completion
- DELETE - Remove a todo

## Starter Templates

To help you get started quickly, we've provided some skeleton code for each task:

- Basic component templates with commented sections to implement
- Store templates with function stubs
- Composable templates to extend
- Test file templates with test cases to implement

Look for comments like `<!-- Task X: ... -->` or `// Task X: ...` that indicate what needs to be implemented for each task.

## Development Process

This assessment uses a progressive task approach. You'll receive tasks incrementally as you complete each stage.

## Testing

Run unit tests with:
```bash
npm run test
```

Or watch mode:
```bash
npm run test:watch
```

## Good luck!

We're excited to see your approach to these challenges. Focus on code quality, component design, and user experience.
