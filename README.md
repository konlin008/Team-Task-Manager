# ✅ Team Task Manager

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployment-46E3B7?style=for-the-badge&logo=render&logoColor=black)

A full-stack collaborative task management platform for teams to create workspaces, manage projects, organize tasks with a Kanban workflow, assign members, track deadlines, and communicate in real time through task-based chat.

Team Task Manager is built with a modern MERN-style architecture using React, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, JWT authentication, Google OAuth with Passport.js, and Socket.IO.

---

## ✨ Features

- 🔐 User authentication with email/password and Google OAuth
- 🍪 Cookie-based JWT sessions with protected frontend and backend routes
- 👤 Profile fetching, auth persistence, logout, and profile update flow
- 🏢 Workspace creation with unique invite codes
- 🔎 Workspace search by invite code
- 🙋 Join workspace request workflow
- ✅ Owner approval/rejection for pending member requests
- 👥 Workspace member management
- 📁 Project creation, listing, filtering, details, and deletion
- 🧩 Role-aware project membership with owner/admin/member concepts
- 📝 Task creation, editing, deletion, assignment, and details view
- 🚦 Kanban board with task status columns
- 🎯 Priority tracking with High, Medium, and Low labels
- 📅 Assigned task dashboard and upcoming deadline view
- 📊 Task progress summary cards
- 💬 Real-time task chat using Socket.IO rooms
- ⚡ Server state management with TanStack React Query
- 🧠 Client state management with Zustand
- 🎨 Responsive UI built with Tailwind CSS, Radix/shadcn-style components, and Lucide icons

---

## 🛠 Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Zustand
- TanStack React Query
- React Router
- Axios
- Socket.IO Client
- React Hook Form
- Radix UI / shadcn-style components
- Lucide React
- Recharts
- dnd-kit

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcrypt
- Passport.js
- Google OAuth 2.0
- Cookie Parser
- Express Session
- CORS
- Socket.IO

### Deployment

- Backend: Render
- Frontend: Vercel-ready Vite build
- Database: MongoDB Atlas recommended

---

## 📁 Folder Structure

```bash
Team Task Manager/
├── client/
│   ├── public/
│   │   ├── authPageBg.png
│   │   ├── bg.png
│   │   ├── g.png
│   │   └── icon.png
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.api.js
│   │   │   ├── axios.js
│   │   │   ├── messages.api.js
│   │   │   ├── project.api.js
│   │   │   ├── task.api.js
│   │   │   ├── user.api.js
│   │   │   └── workspace.api.js
│   │   ├── components/
│   │   │   ├── kanbanBoard/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── lib/
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   └── project/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/
│   ├── middleware/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   ├── JoinRequest.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   ├── taskMessage.js
│   │   ├── User.js
│   │   └── WorkSpace.js
│   ├── routes/
│   ├── socket/
│   │   └── index.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB instance
- Google Cloud OAuth credentials

---

## ⚙️ Environment Variables

Create environment files from the examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Server Environment

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=replace_with_a_strong_jwt_secret
SESSION_SECRET=replace_with_a_strong_session_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:8080
```

### Client Environment

```env
VITE_API_URL=http://localhost:8080/api
VITE_SOCKET_URL=http://localhost:8080
```

> Note: The current codebase uses deployed URLs directly inside `client/src/api/axios.js`, `client/src/lib/socket.js`, `server/server.js`, and `server/config/passport.js`. For a cleaner production setup, replace those hardcoded URLs with the environment variables above.

---

## 🔑 Google OAuth Setup

1. Go to the Google Cloud Console.
2. Create a new OAuth 2.0 Client ID.
3. Add the frontend URL to **Authorized JavaScript origins**:

```text
http://localhost:5173
https://your-frontend-domain.com
```

4. Add the backend callback URL to **Authorized redirect URIs**:

```text
http://localhost:8080/api/auth/google/callback
https://your-render-backend.onrender.com/api/auth/google/callback
```

5. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `server/.env`.

After successful Google login, the backend creates a JWT, stores it in an HTTP-only cookie, and redirects the user back to the client with `?auth=success`.

---

## 📡 API Setup

The backend exposes REST APIs under `/api`.

### Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/google
GET  /api/auth/google/callback
GET  /api/auth/me
POST /api/auth/logout
```

### User Routes

```http
GET /api/user/search-workSpace?inviteCode=<code>
GET /api/user/requestToJoin/:workspaceId
GET /api/user/assigned-task
PUT /api/user/update-profile
```

### Workspace Routes

```http
POST /api/workspace
GET  /api/workspace
POST /api/workspace/:id/add-member
GET  /api/workspace/:id/all-members
GET  /api/workspace/:id/all-requests
PUT  /api/workspace/:workspaceId/requests/:requestId
```

### Project Routes

```http
POST   /api/project
GET    /api/project/workspace/:id
GET    /api/project/user
GET    /api/project/:id
DELETE /api/project/:id
```

### Task Routes

```http
POST   /api/task
GET    /api/task/:projectId
GET    /api/task/:id
PUT    /api/task/:id
PUT    /api/task/:id/assign-member/:memberId
GET    /api/task/:id/unassigned-members
DELETE /api/task/:id
```

### Message Routes

```http
GET /api/messages/:taskId
GET /api/comment/:taskId
```

Most workspace, project, task, and user routes are protected by the `isAuthenticated` middleware, which validates the JWT from the `token` cookie.

---

## 💬 Socket.IO Setup

Socket.IO powers real-time task conversations.

The server authenticates socket connections by reading the JWT from the `token` cookie:

```js
const token = cookies.token;
```

Supported socket events:

| Event | Direction | Description |
| --- | --- | --- |
| `join_task` | Client → Server | Joins a task-specific room |
| `joined_task` | Server → Client | Confirms task room join |
| `send_message` | Client → Server | Sends a message to a task room |
| `receive_message` | Server → Client | Broadcasts a saved message |
| `leave_task` | Client → Server | Leaves a task room |

Because sockets use cookie authentication, both client and server must enable credentials and share compatible CORS settings.

---

## 🧭 Auth Flow

1. A user registers or logs in with email/password, or signs in with Google OAuth.
2. The server signs a JWT with a 7-day expiration.
3. The token is stored in an HTTP-only cookie named `token`.
4. The React app calls `/api/auth/me` on startup.
5. Zustand stores the authenticated user in client state.
6. `ProtectedRoute` redirects unauthenticated users to `/login`.
7. `AuthenticatedUser` redirects logged-in users away from `/login` and `/register`.

---

## 💻 Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd "Team Task Manager"
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Start the backend

The server package currently does not define a `dev` script, so run:

```bash
cd server
npx nodemon server.js
```

Or:

```bash
node server.js
```

### 5. Start the frontend

```bash
cd client
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

The backend will run at:

```text
http://localhost:8080
```

---

## ☁️ Deployment Guide

### Backend on Render

1. Push the repository to GitHub.
2. Create a new Render Web Service.
3. Set the root directory to:

```text
server
```

4. Use the following commands:

```bash
Build Command: npm install
Start Command: node server.js
```

5. Add server environment variables in Render.
6. Add your deployed frontend URL to the backend CORS origin.
7. Add your Render OAuth callback URL to Google Cloud:

```text
https://your-render-backend.onrender.com/api/auth/google/callback
```

### Frontend Deployment

For Vercel or any static host:

```bash
cd client
npm run build
```

Deploy the generated `dist` folder or connect the `client` directory as the project root.

Make sure the frontend uses the deployed backend API URL and Socket.IO URL.

---

## 🖼 Screenshots

Add project screenshots here to make the repository more portfolio-friendly.

### Authentication

![Authentication Screenshot](./screenshots/auth.png)

### Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### Projects

![Projects Screenshot](./screenshots/projects.png)

### Kanban Board

![Kanban Board Screenshot](./screenshots/kanban.png)

### Task Chat

![Task Chat Screenshot](./screenshots/task-chat.png)

---

## 🔮 Future Improvements

- Replace hardcoded deployed URLs with environment-based configuration
- Add automated tests for auth, workspace, project, and task APIs
- Add refresh token support and stronger session lifecycle handling
- Add role management UI for project admins and members
- Add task activity logs and audit history
- Add file attachments for task discussions
- Add notifications for assignments, join requests, and due dates
- Add pagination and search for large workspaces
- Add responsive mobile polish for complex dashboard and table views
- Add CI/CD workflow for linting and deployment checks

---

## 👨‍💻 Author

**Aman**

- Portfolio: `Add your portfolio link`
- GitHub: `Add your GitHub profile`
- LinkedIn: `Add your LinkedIn profile`

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub. It helps the project stand out as a portfolio-ready full-stack application.
