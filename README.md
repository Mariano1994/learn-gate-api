# Learn Gate API

A simple REST API built with Fastify and TypeScript for managing courses. This API provides basic CRUD operations for course management.

## Features

- **Course Management**: Create, read, and delete courses
- **RESTful API**: Clean and intuitive endpoints
- **TypeScript**: Type-safe development
- **Fastify**: Fast and efficient web framework
- **UUID Generation**: Unique identifiers for courses

## API Endpoints

### Get All Courses
```
GET /courses
```
Returns a list of all available courses.

### Create a New Course
```
POST /courses
Content-Type: application/json

{
  "title": "Course Title"
}
```
Creates a new course with the provided title.

### Get Course by ID
```
GET /courses/:id
```
Returns a specific course by its unique ID.

### Delete Course
```
DELETE /courses/:id
```
Removes a course from the system.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learn-gate-api
```

2. Install dependencies:
```bash
pnpm install
```

### Running the Application

Start the development server:
```bash
pnpm dev
```

The server will start on `http://localhost:3333`

## Project Structure

```
learn-gate-api/
├── server.ts          # Main server file with API routes
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── requests.http      # HTTP request examples for testing
└── README.md          # This file
```

## Development

The project uses TypeScript with experimental strip types for development, allowing you to run TypeScript files directly without compilation.

### Available Scripts

- `pnpm dev`: Start the development server with hot reload

## Testing the API

You can test the API using the provided `requests.http` file or any HTTP client like Postman, curl, or VS Code REST Client extension.

## Sample Data

The API comes with some initial course data:
- React Js
- React Native  
- Node Js

## Error Handling

- **400 Bad Request**: When creating a course without a title
- **404 Not Found**: When requesting a course that doesn't exist

## Author

Mariano Capiliku

## License

ISC
