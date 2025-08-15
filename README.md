# Desafio Node.js - Task Management API

A simple REST API built with Node.js, TypeScript, and Fastify for managing tasks.

## Features

- ✅ Create new tasks
- ✅ List all tasks
- ✅ Get task by ID
- ✅ Update existing tasks
- 🚀 Fast and lightweight with Fastify
- 📝 Written in TypeScript
- 🔄 Hot reload during development

## Tech Stack

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Fastify** - Fast and low overhead web framework
- **pnpm** - Fast, disk space efficient package manager

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd desafio-nodejs
```

2. Install dependencies:
```bash
pnpm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot reload:

```bash
pnpm dev
```

The server will start on `http://localhost:3333`

## API Endpoints

### Base URL
```
http://localhost:3333
```

### Tasks

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/tasks` | Get all tasks | - | `{ tasks: Task[] }` |
| `GET` | `/tasks/:id` | Get task by ID | - | `{ task: Task }` |
| `POST` | `/tasks` | Create a new task | `{ id: string, description: string }` | `{ task: Task }` |
| `PUT` | `/tasks/:id` | Update an existing task | `{ id: string, description: string }` | `{ task: Task }` |

### Task Object Structure

```json
{
  "id": "string",
  "description": "string"
}
```

## API Examples

### Get all tasks
```bash
curl -X GET http://localhost:3333/tasks
```

### Get task by ID
```bash
curl -X GET http://localhost:3333/tasks/1
```

### Create a new task
```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{"id": "3", "description": "New task"}'
```

### Update a task
```bash
curl -X PUT http://localhost:3333/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"id": "1", "description": "Updated task description"}'
```

## Project Structure

```
desafio-nodejs/
├── src/
│   ├── routes/
│   │   ├── index.ts          # Route registration
│   │   └── tasks.ts          # Task routes
│   ├── services/
│   │   └── tasks.ts          # Task business logic
│   └── server.ts             # Application entry point
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── pnpm-lock.yaml          # Lockfile
└── README.md               # This file
```

## Development

### Scripts

- `pnpm dev` - Start the development server with hot reload

### Data Storage

Currently, the application uses in-memory storage for tasks. Data will be lost when the server restarts. For production use, consider implementing a database solution.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Created as part of a Node.js challenge project.