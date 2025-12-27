# Keban Task Manager

A modern, full-stack task management application with a Kanban-style board interface. Built with NestJS backend and Next.js frontend, featuring user authentication, drag-and-drop task management, and real-time task status updates.

## 📋 Overview

Keban Task Manager is a comprehensive task management solution that helps individuals and teams organize their work efficiently. The application provides an intuitive Kanban board interface where users can create, organize, and track tasks across different stages of completion.

## ✨ Key Features

- **🔐 User Authentication**: Secure registration and login system with JWT authentication
- **📊 Kanban Board**: Visual task organization with drag-and-drop functionality
- **🎯 Task Management**: Create, update, and delete tasks with details and deadlines
- **📈 Task Status Tracking**: Track tasks across four stages:
  - Open
  - In Progress
  - Completed
  - On Hold
- **👤 User-Specific Tasks**: Each user has their own isolated task workspace
- **🎨 Modern UI**: Clean, responsive interface with dark mode support
- **🔒 Secure Backend**: Protected API endpoints with authentication guards

## 🛠️ Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework for building efficient server-side applications
- **TypeScript**: Type-safe development
- **Sequelize**: ORM for database management
- **SQLite**: Lightweight database solution
- **JWT**: JSON Web Token for authentication
- **Bcrypt**: Password hashing for security

### Frontend
- **Next.js 14**: React framework with App Router
- **React**: UI library
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **React DnD**: Drag-and-drop functionality
- **Axios**: HTTP client for API requests
- **Universal Cookie**: Cookie management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
SALT_WORK_FACTOR=10
JWT_SECRET=your-secret-key
```

4. Run the backend server:
```bash
# Development mode
yarn run start:dev

# Production mode
yarn run start:prod
```

The backend API will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open your browser:
   - If running frontend only: [http://localhost:3000](http://localhost:3000)
   - If backend is already running on port 3000: [http://localhost:3001](http://localhost:3001) (Next.js will auto-assign the next available port)

**Note**: Ensure the backend is running first, then start the frontend. The frontend will automatically connect to the backend API.

## 📁 Project Structure

```
keban-task-manager/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── task/          # Task management module
│   │   ├── user/          # User management module
│   │   ├── db/            # Database models and configuration
│   │   └── utils/         # Utility functions
│   └── test/              # Test files
├── frontend/
│   ├── app/               # Next.js app directory
│   │   ├── auth/          # Authentication pages
│   │   ├── overview/      # Dashboard page
│   │   └── tasks/         # Task management page
│   ├── components/        # Reusable React components
│   ├── context/           # React context providers
│   └── utils/             # Utility functions
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/logout` - Logout user (protected)
- `GET /auth/user` - Get authenticated user (protected)

### Tasks
- `GET /tasks` - Get all tasks for authenticated user (protected)
- `GET /tasks/:id` - Get a specific task (protected)
- `POST /tasks` - Create a new task (protected)
- `PATCH /tasks/:id` - Update a task (protected)
- `DELETE /tasks/:id` - Delete a task (protected)

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run unit tests
yarn run test

# Run e2e tests
yarn run test:e2e

# Generate test coverage
yarn run test:cov
```

### Code Quality
```bash
cd backend

# Run linter
yarn run lint

# Format code
yarn run format
```

## 👨‍💻 Author

**Samuel Adeyanju**

## 📄 License

This project is unlicensed.
