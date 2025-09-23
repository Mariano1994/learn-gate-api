# Learn Gate API

A modern REST API built with Fastify and TypeScript for managing courses. This API provides comprehensive CRUD operations for course management with PostgreSQL database integration, featuring modular architecture, interactive API documentation, and robust validation.

## Features

- **Course Management**: Create, read, and manage courses with full CRUD operations
- **RESTful API**: Clean and intuitive endpoints with comprehensive validation
- **TypeScript**: Type-safe development with ES modules support
- **Fastify**: Fast and efficient web framework with plugin architecture
- **PostgreSQL Database**: Robust data persistence with PostgreSQL 17
- **Drizzle ORM**: Type-safe database operations and migrations
- **Interactive Documentation**: Beautiful API docs powered by Scalar
- **Modular Architecture**: Organized route structure for maintainability
- **Request Validation**: Zod schema validation for all endpoints
- **Docker Support**: Easy database setup with Docker Compose
- **UUID Generation**: Unique identifiers for courses
- **OpenAPI Specification**: Auto-generated API documentation

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
  "title": "Course Title",
  "description": "Optional course description"
}
```
Creates a new course with the provided title and optional description.
- **Validation**: Title must be at least 5 characters
- **Response**: Returns the generated course ID

### Get Course by ID
```
GET /courses/:id
```
Returns a specific course by its unique ID.
- **Validation**: ID must be a valid UUID
- **Error Handling**: Returns 404 if course not found

### API Documentation
```
GET /docs
```
Interactive API documentation powered by Scalar with Kepler theme.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm
- Docker and Docker Compose

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

3. Set up the database:
```bash
# Start PostgreSQL with Docker Compose
docker compose up -d

# Run database migrations
pnpm db:migrate
```

### Running the Application

1. Start the database (if not already running):
```bash
docker compose up -d
```

2. Start the development server:
```bash
pnpm dev
```

The server will start on `http://localhost:3333`

### Accessing the API Documentation

Once the server is running, you can access the interactive API documentation at:
- **API Docs**: `http://localhost:3333/docs`
- **API Endpoints**: `http://localhost:3333/courses`

### Database Configuration

The application uses PostgreSQL 17 with the following configuration:
- **Host**: localhost
- **Port**: 5433
- **Database**: learn_gate
- **Username**: postgres
- **Password**: learn-gate

The database URL is configured in the `.env` file:
```
DATABASE_URL=postgresql://postgres:learn-gate@localhost:5433/learn_gate
```

## Project Structure

```
learn-gate-api/
├── src/
│   ├── database/
│   │   ├── client.ts      # Database connection configuration
│   │   └── schema.ts      # Database schema definitions
│   └── routes/            # Modular API route handlers
│       ├── create-course.ts    # POST /courses endpoint
│       ├── get-courses.ts      # GET /courses endpoint
│       └── get-course-by-id.ts # GET /courses/:id endpoint
├── drizzle/               # Database migration files
├── server.ts              # Main server file with plugin registration
├── docker-compose.yml     # PostgreSQL database configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── requests.http          # HTTP request examples for testing
└── README.md              # This file
```

## Development

The project uses TypeScript with experimental strip types for development, allowing you to run TypeScript files directly without compilation. The architecture follows Fastify's plugin system for modular route organization.

### Available Scripts

- `pnpm dev`: Start the development server with hot reload and file watching
- `pnpm db:migrate`: Run database migrations
- `pnpm db:generate`: Generate new database migrations
- `pnpm db:studio`: Open Drizzle Studio for database management

### Architecture

- **Modular Routes**: Each API endpoint is organized in separate files under `src/routes/`
- **Plugin System**: Routes are registered as Fastify plugins for better organization
- **Type Safety**: Full TypeScript support with Zod validation schemas
- **Auto Documentation**: OpenAPI specification auto-generated from route schemas

## Testing the API

You can test the API using the provided `requests.http` file or any HTTP client like Postman, curl, or VS Code REST Client extension.

## Sample Data

The API comes with some initial course data:
- ReactJS
- NodeJS
- DevOps
- AWS Course

## Error Handling

- **400 Bad Request**: When creating a course with invalid data (title too short, missing required fields)
- **404 Not Found**: When requesting a course that doesn't exist
- **422 Unprocessable Entity**: When request validation fails (invalid UUID, schema validation errors)

## Application Flow

The following diagram illustrates the key flow of the Learn Gate API, showing how requests are processed through the modular architecture:

```mermaid
graph TB
    Client[Client Application] --> Fastify[Fastify Server]
    Fastify --> Validation[Zod Validation]
    Validation --> Routes{Route Handler}
    
    Routes -->|GET /courses| GetCourses[get-courses.ts]
    Routes -->|GET /courses/:id| GetCourseById[get-course-by-id.ts]
    Routes -->|POST /courses| CreateCourse[create-course.ts]
    Routes -->|GET /docs| Docs[Scalar Documentation]
    
    GetCourses --> DB[(PostgreSQL Database)]
    GetCourseById --> DB
    CreateCourse --> DB
    
    DB --> Drizzle[Drizzle ORM]
    Drizzle --> Response[API Response]
    
    Response --> Client
    
    subgraph "Modular Architecture"
        GetCourses
        GetCourseById
        CreateCourse
    end
    
    subgraph "Database Layer"
        DB
        Drizzle
    end
    
    subgraph "Documentation"
        Docs
    end
    
    style Fastify fill:#e1f5fe
    style DB fill:#f3e5f5
    style Routes fill:#e8f5e8
    style Client fill:#fff3e0
```

### Flow Explanation

1. **Client Request**: External applications send HTTP requests to the Fastify server
2. **Validation**: Zod schemas validate request data and parameters
3. **Route Handling**: Modular route handlers process specific endpoints
4. **Database Operations**: Drizzle ORM interacts with PostgreSQL database
5. **Response**: Structured JSON responses are returned to the client
6. **Documentation**: Interactive API docs are served via Scalar

## Technology Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Fastify 5.6.0
- **Language**: TypeScript 5.9.2
- **Database**: PostgreSQL 17
- **ORM**: Drizzle ORM 0.44.5
- **Validation**: Zod 4.1.11
- **Documentation**: Scalar API Reference 1.35.7
- **Package Manager**: pnpm

## Author

Mariano Capiliku

## License

ISC
