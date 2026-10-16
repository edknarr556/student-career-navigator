# Student Career Navigator

A functional **proof-of-life** web application that helps college students explore
careers, find internships and entry-level jobs, get personalized job
recommendations, and track their applications — all running locally in the browser
with **no paid APIs, external databases, or API keys**.

Built with **React + Vite** and plain **JavaScript / HTML / CSS**. All user data
(profile, saved jobs, applications) persists in the browser via **local storage**.

---

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default: <http://localhost:5173>).

To create a production build:

```bash
npm run build
npm run preview
```

---

## Features

| # | Feature | What it does |
|---|---------|--------------|
| 1 | **Student Profile** | Enter and edit name, university, major, graduation year, skills, interests, preferred location, and employment type. Saved to local storage with input validation. |
| 2 | **Career Dashboard** | Personalized welcome, stats, recommended career paths, top job matches, and an application-tracking summary that updates as you interact. |
| 3 | **Job Search** | 15 realistic listings. Working keyword search + filters by employment type, location, and career field. |
| 4 | **Career Matching** | A transparent scoring algorithm compares your major, skills, and interests against each job and shows a **match %** with plain-English reasons. |
| 5 | **Saved Jobs** | Bookmark jobs, view them on a dedicated page, open details, remove, or apply. Persists in local storage. |
| 6 | **Application Tracker** | Track applications across five statuses (Interested → Applied → Interview Scheduled → Offer Received / Rejected). Record applied dates and notes. |
| 7 | **Career Exploration** | Browse 7 career fields with job titles, descriptions, required skills, education, and career paths. |
| 8 | **UX polish** | Empty states, confirmation toasts, input validation, responsive sidebar navigation, and a job-details modal. |

A **Demo Student** profile (Penn State, Enterprise Technology Integration) is
pre-loaded on first run so the app is immediately demonstrable.

---

## Project Structure

```
src/
├── components/     Reusable UI (Sidebar, Layout, JobCard, JobDetailModal, MatchBar, …)
├── pages/          One component per route (Dashboard, JobSearch, Tracker, …)
├── data/           Sample jobs, career fields, demo profile
├── utils/          Local-storage helpers and the matching algorithm
├── context/        Global app state (profile, saved jobs, applications)
├── styles/         Global stylesheet (blue & white theme)
├── App.jsx         Routes (React Router, HashRouter)
└── main.jsx        Entry point
```

---

## Fully Functional vs. Simulated

**Fully functional (real logic + local persistence):**

- Profile create/edit with validation and local-storage persistence
- Keyword search and all filters (type, location, field)
- Dynamic match-percentage calculation and recommendation reasons
- Saving / removing jobs
- Application tracker: add, change status, set applied date, add notes, remove
- All navigation and buttons
- Persistence across page refreshes (local storage)

**Simulated (prototype scope):**

- Job listings are curated sample data in `src/data/jobs.js` (no live job-board API).
- The **Apply** button records the application in your local tracker rather than
  submitting to a real employer.
- There is no multi-user accounts/auth — data is stored per browser.

---

## Tech Stack

- React 18
- React Router 6
- Vite 5
- Browser `localStorage`
