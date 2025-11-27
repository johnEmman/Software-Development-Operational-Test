# Task Manager

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS on the frontend, and Django + Django REST Framework on the backend. This application provides a clean interface for managing daily tasks with full CRUD functionality.

## Features

✅ **Create Tasks** - Add new tasks with title and optional description

✏️ **Edit Tasks** - Update task details inline

☑️ **Toggle Completion** - Mark tasks as completed or active

🗑️ **Delete Tasks** - Remove tasks with confirmation dialog

🔍 **Filter Tasks** - View all tasks, active only, or completed only

📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

⚡ **Real-time Updates** - Optimistic UI updates with loading states

🎨 **Beautiful UI** - Modern design with smooth animations and transitions

🌐 **Error Handling** - Graceful error messages and retry capabilities

## Tech Stack

### Frontend

- React 18 + Hooks
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Lucide React (icons)
- Framer Motion (animations)
- React Hook Form + Zod (form handling & validation)
- TanStack Query (data fetching & caching)

### Backend

- Django 4.x
- Django REST Framework
- SQLite (default, lightweight DB)

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Python 3.9+
- Django 4.x

### Backend Setup (Django + DRF)

1. Create a virtual environment:

\`\`\`bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
\`\`\`

2. Install dependencies:

\`\`\`bash
pip install django djangorestframework
\`\`\`

3. Create Django project and app:

\`\`\`bash
django-admin startproject backend
cd backend
python manage.py startapp tasks
\`\`\`

4. Apply migrations:

\`\`\`bash
python manage.py migrate
\`\`\`

5. Run the development server:

\`\`\`bash
python manage.py runserver
\`\`\`

**Backend API endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks/` | List all tasks |
| POST | `/tasks/` | Create a new task |
| GET | `/tasks/{id}/` | Retrieve task by ID |
| PUT | `/tasks/{id}/` | Update task title & description |
| PATCH | `/tasks/{id}/` | Toggle task completed status |
| DELETE | `/tasks/{id}/` | Delete a task |

### Frontend Setup (React + TypeScript + Tailwind)

1. Clone repository:

\`\`\`bash
git clone <YOUR_REPO_URL>
cd frontend
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Start development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open browser: http://localhost:5173

## Project Structure

\`\`\`
frontend/src/
├── components/          # Reusable components & UI elements
├── pages/               # Pages (Task list, 404)
├── services/            # API service
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── App.tsx              # Root component
├── main.tsx             # App entry point
└── index.css            # Global styles

backend/
├── backend/             # Django project settings
└── tasks/               # Tasks app (models, views, urls)
\`\`\`

## Development Scripts

### Frontend

- `npm run dev` - Start dev server
- `npm run build` - Build production
- `npm run preview` - Preview production build

### Backend

- `python manage.py runserver` - Start backend server
- `python manage.py makemigrations` - Create DB migrations
- `python manage.py migrate` - Apply DB migrations

## Deployment

The frontend is a static build; it can be deployed to Vercel, Netlify, or GitHub Pages.

The backend can be deployed to any Python-supported hosting (Heroku, Railway, Render, etc.)

## Future Enhancements

🔐 User authentication and roles

💾 Persistent storage with PostgreSQL or MySQL

🏷️ Task categories or tags

📅 Due dates & reminders

📊 Analytics & reports

🌙 Dark mode

## Contributing

Contributions are welcome! Please submit pull requests or open issues for bug fixes and features.

## License

MIT License
