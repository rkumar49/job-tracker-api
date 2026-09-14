# Job Tracker API

A RESTful API backend for tracking job applications. Built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## 🚀 Live Demo
- **Frontend:** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
- **Backend API:** [https://your-render-link.onrender.com/health](https://your-render-link.onrender.com/health)

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Deployment:** Render

## 📋 Features
- Create, Read, Update, and Delete (CRUD) job applications
- Input validation using Zod
- CORS enabled for frontend integration

## 💻 Local Setup
1. Clone the repo: `https://github.com/rkumar49/job-tracker-api.git`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your local Postgres URL:
   `DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5433/job_tracker"`
4. Run migrations: `npx prisma migrate dev`
5. Start the server: `npm run dev`