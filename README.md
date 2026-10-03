# Express + Supabase REST API

A modular, production-ready REST API built with Node.js, Express, and Supabase (PostgreSQL). 

Demonstrates direct backend database orchestration using the official `@supabase/supabase-js` SDK, handling request validation, environment configuration, and structured JSON responses.

---

## Features

- **Decoupled Architecture:** Clean separation of concerns between server configuration, routing, and database logic.
- **Supabase PostgreSQL:** Managed cloud database persistence without local database server overhead.
- **Strict Environment Handling:** Sensitive credentials protected server-side via `.env`.
- **Verified Endpoints:** Tested payloads and standard HTTP status codes validated with Postman.

---

## API Specification

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Service health check | `200 OK` |
| `GET` | `/api/tasks` | Fetch all tasks ordered by ID | `200 OK` |
| `POST` | `/api/tasks` | Create a new task (`{ "title": "..." }`) | `201 Created` |

---

## Getting Started

### 1. Clone & Install
```bash
git clone [https://github.com/Dhaibhar1703/express-supabase-api.git](https://github.com/Dhaibhar1703/express-supabase-api.git)
cd express-supabase-api
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
SUPABASE_ANON_KEY=your-supabase-key
```

### 3. Database Schema
Run the following SQL in your Supabase SQL editor:
```sql
create table if not exists tasks (
  id bigint generated always as identity primary key,
  title text not null,
  is_complete boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS and allow public access for demonstration
alter table tasks enable row level security;
create policy "Allow public read and write access" 
on tasks for all 
using (true) 
with check (true);
```

### 4. Run Locally
```bash
node server.js
```
The server will start at `http://localhost:5000`.

---

## Verification & Walkthrough
Every endpoint in this repository is verified against live database transactions using Postman. Test payloads and step-by-step setup are documented in the companion guide:

👉 [Read the Full Implementation Guide on Dev.to](https://dev.to/dhairyabhargava/how-to-build-a-clean-nodejs-rest-api-with-express-and-supabase-59n4)
