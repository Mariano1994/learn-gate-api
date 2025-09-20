# Learn Gate API

A simple REST API built with Fastify and TypeScript for managing courses. This API provides basic CRUD operations for course management with PostgreSQL database integration.

## Features

- **Course Management**: Create, read, and delete courses
- **RESTful API**: Clean and intuitive endpoints
- **TypeScript**: Type-safe development
- **Fastify**: Fast and efficient web framework
- **PostgreSQL Database**: Robust data persistence with PostgreSQL 17
- **Drizzle ORM**: Type-safe database operations
- **Docker Support**: Easy database setup with Docker Compose
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
│   └── database/
│       └── schema.ts      # Database schema definitions
├── drizzle/               # Database migration files
├── server.ts              # Main server file with API routes
├── docker-compose.yml     # PostgreSQL database configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── requests.http          # HTTP request examples for testing
└── README.md              # This file
```

## Development

The project uses TypeScript with experimental strip types for development, allowing you to run TypeScript files directly without compilation.

### Available Scripts

- `pnpm dev`: Start the development server with hot reload
- `pnpm db:migrate`: Run database migrations
- `pnpm db:generate`: Generate new database migrations
- `pnpm db:studio`: Open Drizzle Studio for database management

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
