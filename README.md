# Express + Supabase REST API

A clean, production-ready REST API built with **Node.js**, **Express**, and **Supabase** (PostgreSQL). 

This project demonstrates direct backend database orchestration using the official `@supabase/supabase-js` SDK, handling request validation, environment configuration, and structured JSON responses.

## Features

- **Express Routing:** Clean, decoupled endpoint structure.
- **Supabase PostgreSQL:** Managed database persistence without local database server setup.
- **Environment Protection:** Sensitive credentials kept server-side via `.env`.
- **Verified Endpoints:** Tested and validated via Postman.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API health check |
| `GET` | `/api/tasks` | Retrieve all tasks ordered by ID |
| `POST` | `/api/tasks` | Create a new task (requires `{ "title": "..." }`) |

## Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/Dhaibhar1703/express-supabase-api.git](https://github.com/Dhaibhar1703/express-supabase-api.git)
cd express-supabase-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project URL and anon public key inside `.env`:
```env
PORT=5000
SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
SUPABASE_ANON_KEY=your-supabase-key
```

### 4. Database Schema
Run the following SQL snippet inside your Supabase project's SQL editor:
```sql
create table if not exists tasks (
  id bigint generated always as identity primary key,
  title text not null,
  is_complete boolean default false,
  created_at timestamptz default now()
);

alter table tasks disable row level security;
```

### 5. Run the server
```bash
node server.js
```
The server will start at `http://localhost:5000`.
