# CHIARISSIME

An independent fashion journal. No advertisers, no affiliates — just writing about clothes, collections, films, and the culture that connects them.

Built as a full-stack web application with a React frontend and a Node.js/Express backend, backed by MongoDB.

---

## What it is

CHIARISSIME is a content-driven journal organized around three sections:

- **Editorials** — in-depth features on fashion and cinema, written as criticism rather than coverage
- **Runway** — season reviews from the collections that actually matter
- **Culture** — where fashion meets film, art, and music; the ideas behind the clothes

Readers can create an account, save articles to come back to, and subscribe to the newsletter. Admins can publish, edit, and delete articles from a dedicated panel — no CMS needed.

---

## Tech stack

**Frontend**
- React (Vite)
- React Router v6
- Tailwind CSS
- Lucide icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer for image uploads

---

## Project structure

```
CHIARISSIME/
├── client/                  # React frontend
│   ├── public/images/       # Static images (editorials, runway, about, uploads)
│   └── src/
│       ├── components/      # Nav, NewsletterSection
│       └── pages/           # Home, Editorials, Runway, Culture, ArticleDetail,
│                            # About, Contact, Login, Register, Dashboard, Admin, NotFound
│
└── server/                  # Express backend
    ├── controllers/         # Auth, articles
    ├── middleware/          # JWT verification, admin guard
    ├── models/              # User, Article, Subscriber
    └── routes/              # Auth, articles, bookmarks, newsletter
```

---

## Getting started

You need Node.js and a running MongoDB instance (local or Atlas).

**1. Install dependencies**

```bash
# from the root
cd server && npm install
cd ../client && npm install
```

**2. Configure environment**

Create a `.env` file inside `/server`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**3. Run the app**

Open two terminals:

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

The frontend runs on `http://localhost:5173`, the API on `http://localhost:5000`.

---

## Creating an admin user

There's a script for it:

```bash
cd server && node scripts/createAdmin.js
```

Or use the `makeAdmin.js` utility to promote an existing user by email.

Once you're an admin, the Admin Panel is accessible from your dashboard or directly at `/admin`.

---

## API routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Sign in, returns JWT |
| GET | `/api/articles` | — | All articles (filter with `?page=editorials\|runway\|culture`) |
| GET | `/api/articles/:id` | — | Single article |
| POST | `/api/articles` | Admin | Create article |
| PUT | `/api/articles/:id` | Admin | Update article |
| DELETE | `/api/articles/:id` | Admin | Delete article |
| GET | `/api/bookmarks` | User | Get saved articles |
| POST | `/api/bookmarks/:id` | User | Toggle bookmark |
| POST | `/api/newsletter` | — | Subscribe to newsletter |
| POST | `/api/upload` | Admin | Upload image |

---

## Features

- **Dark mode** — toggle in the nav, preference saved to localStorage
- **Search** — client-side filtering on Editorials, Runway, and Culture pages
- **Bookmarks** — logged-in users can save articles from any article page
- **Newsletter** — email collection with duplicate detection
- **Image uploads** — admin can upload images directly from the article form; files are saved to `client/public/images/uploads/`
- **E2E tests** — Cypress test suite covering all major flows (auth, browsing, admin CRUD, newsletter)

---

## Running tests

```bash
cd client
npx cypress open     # interactive
npx cypress run      # headless
```

Tests require both the frontend and backend to be running.

---

*© 2025 CHIARISSIME. All rights reserved.*
