# writespace

A simple, elegant blogging platform built with React, Vite, and Tailwind CSS.

## Features

- User authentication (login/register)
- Create, read, update, and delete blog posts
- Admin dashboard for user management
- Responsive design with dark mode support
- Clean, distraction-free writing interface

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Testing**: Vitest + Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/writespace.git
   cd writespace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Running Tests

```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
writespace/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── stores/        # Zustand stores
│   ├── constants.js   # Application constants
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode

## Environment Variables

| Variable            | Description                     | Default Value               |
|---------------------|---------------------------------|-----------------------------|
| VITE_API_BASE_URL   | Base URL for the backend API    | `http://localhost:3000/api` |

## API Endpoints

The application expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user (admin only)
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.