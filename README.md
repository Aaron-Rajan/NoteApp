# Notes App (React + TS + Vite • Node/Express + MongoDB)

Simple full-stack notes CRUD. Frontend: React + Vite + TS. Backend: Node/Express + TS. DB: MongoDB.

## ✨ Features

- CRUD notes: create, list, update, delete
- Friendly, dark-themed UI (Vite + React + TS)
- RESTful API (Node/Express + TS)
- MongoDB persistence (local or Docker)
- CORS configured for local dev
- Environment-based configuration
- Ready for Docker Compose (optional)

---

## 🧱 Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite dev server
- Fetch/axios calling a configurable API base URL

**Backend**
- Node.js + Express (TypeScript)
- Mongoose (or official driver) for MongoDB
- nodemon / ts-node-dev for live reload in dev

**Database**
- MongoDB (local install or Docker)

---

## 📦 Project Structure

```
note-app/
├─ backend/
│  ├─ src/
│  │  ├─ index.ts             # app bootstrap
│  │  ├─ routes/notes.ts      # REST endpoints
│  │  ├─ models/Note.ts       # Note schema/model
│  │  └─ ...                  # controllers, middleware, etc.
│  ├─ package.json
│  └─ tsconfig.json
├─ frontend/
│  ├─ src/
│  │  ├─ App.tsx              # UI entry
│  │  ├─ pages/               # e.g., ShowNotes, CreateNote
│  │  ├─ components/          # NoteCard, etc.
│  │  └─ lib/api.ts           # API client
│  ├─ index.html
│  └─ package.json
├─ docker-compose.yml         # optional (Mongo + services)
└─ README.md
```

> Folder names may vary slightly; this README assumes the common two‑folder layout `frontend/` and `backend/` you’re using.

---

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env   # or create with values below
npm i
npm run dev            # or: npm start
```

**backend/.env**
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/noteapp
CORS_ORIGIN=http://localhost:5173
```

### Frontend
```bash
cd frontend
cp .env.example .env   # or create with values below
npm i
npm run dev            # opens http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:8080
```

## API (typical)
Base: `http://localhost:8080/api`

- `GET /notes` – list notes
- `GET /notes/:id` – get one
- `POST /notes` – `{ title, content }`
- `PUT /notes/:id` – `{ title?, content? }`
- `DELETE /notes/:id` – remove
