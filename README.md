# QueueGo

A mobile-first React app that lets users report and check real-time queue wait times at public places like government offices, clinics, and post offices.

**Live Demo:** [queuego-react-app.vercel.app](https://queuego-react-app.vercel.app)  
**GitHub:** [GitHub URL here]

---

## The Problem

People waste time showing up to government offices, clinics, and post offices without knowing how crowded it is. QueueGo solves this with crowd-sourced, real-time queue reports - submitted by users, visible to everyone.

## Who It's For

- **Citizens** visiting public services who want to plan their visit
- **Frequent visitors** who want alerts when their favorite places get busy

---

## Features

- **Home** - Browse and search nearby places, see live queue statuses
- **Report** - Submit a queue crowding level (Low / Medium / High) with optional notes
- **Favorites** - Save places and toggle favorites with a heart button
- **Profile** - View your report history and account stats
- **Auth** - Email/password signup + Google OAuth via Supabase

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Google OAuth) |
| Real-time | Supabase Realtime (WebSockets) |
| Email | EmailJS |
| Deployment | Vercel |

---

## External Services

| Service | Purpose | How it's used |
|---|---|---|
| Supabase Auth | Authentication | Email/password + Google OAuth login |
| Supabase Realtime | Live updates | Queue reports update instantly for all users without page refresh |
| EmailJS | Email notifications | Sends a confirmation email to the user after submitting a report |

---

## Database Schema (ERD)

Three tables in Supabase:

**`places`** - Public service locations  
**`queue_reports`** - User-submitted crowding reports (FK to places + auth.users)  
**`favorites`** - User-saved places (FK to places + auth.users, unique per pair)

> See `/supabase/schema.sql` for the full SQL including RLS policies and seed data.

---

## Running Locally

### 1. Clone and install

```bash
git clone <your-repo-url>
cd queuego-react-app
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. In **Authentication > Providers**, enable Google OAuth
4. In **Database > Replication**, add `queue_reports` to the publication for Realtime

### 4. Set up EmailJS

1. Create an account at [emailjs.com](https://emailjs.com)
2. Add an Email Service and create a Template with these variables:
   - `{{to_email}}`, `{{to_name}}`, `{{place_name}}`, `{{queue_level}}`, `{{notes}}`
3. Copy your Service ID, Template ID, and Public Key to `.env.local`

### 5. Run

```bash
npm run dev
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add the environment variables from `.env.local` in the Vercel dashboard
4. Deploy
