# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based tequila trivia quiz application that recommends either Don Julio cocktails or Casamigos frozen treats based on user answers. The app connects to a backend API hosted on Heroku.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Routing Structure

The application uses React Router v6 with a custom routing setup:
- Entry point: `App.jsx` → `ParentRouter` → `childparentrouter.jsx`
- Route definitions live in `src/components/childparentrouter.jsx`
- Main routes:
  - `/` - Landing/registration page (`registration.jsx`)
  - `/trivia` - Quiz page (`Quiz.jsx`) with loader that defers data fetching
  - `*` - 404 page (`404.jsx`)

All routes are wrapped in a `Layout` component with an `ErrorHandling` error boundary.

### Data Flow

1. **API Layer** (`src/components/api.js`):
   - Centralized API calls using fetch
   - Base URL configured via `VITE_API_BASE_URL` environment variable
   - Key endpoints:
     - `POST /api/players/signup` - User registration
     - `GET /api/questions` - Fetch quiz questions
     - `GET /api/colors` - Fetch UI color themes
     - `PATCH /api/players/signup/:id` - Update player score
   - `fetchData()` function uses `Promise.all()` to load colors and questions in parallel

2. **Authentication** (`src/components/utilis.js`):
   - Uses localStorage with key `"user"` to track logged-in state
   - Stores user object with `userId` and `token` fields
   - `requireAuth()` checks localStorage for user data

3. **Quiz State Management** (`Quiz.jsx`):
   - Uses React Router loaders with `defer()` for async data loading
   - Suspense boundary with `Preloader` while data loads
   - Quiz state tracked via `activeQuestion` array
   - Questions answered sequentially, storing selected answers in order
   - Quiz completion triggers `Summary` component

### Scoring System

Located in `Summary.jsx`:
- Questions map to categories A, B, C, D (corresponding to answer positions)
- Category counts are tallied from `userAnswers` array
- Most frequently selected category determines the recommendation:
  - **A** → "Don Julio Cocktail Person 🍸"
  - **B** → "Casamigos Lolly Person 🍧"
  - **C/D** → "DON MARGARITA" (fallback)
- Score is sent to backend via `updatePlayer({ score: mostChosen })`
- Recommendation text stored in `recommendationMap` object

### Component Architecture

**Parent-Child Flow:**
```
App → ParentRouter → RouterProvider → Layout
                                      ↓
                         Registration OR Quiz (+Summary)
```

**Quiz Component Tree:**
```
Quiz (manages overall state)
├── Scoreboard (displays progress)
└── Question (current question UI)
    └── Answers (answer options with colors)
```

Key components:
- `Quiz.jsx` - Main quiz container with state management
- `question.jsx` - Individual question display with timer
- `Quiztimer.jsx` - Timer component for questions
- `answers.jsx` - Answer options rendering
- `Summary.jsx` - Results screen with recommendation logic
- `Scoreboard.jsx` - Progress tracker

### Audio System

Uses Howler.js for sound effects:
- Correct answer: `src/assets/audio/correct.wav`
- Wrong answer: `src/assets/audio/wrong.wav`

## Important Implementation Details

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (defaults to Heroku instance)
- Access in code via `import.meta.env.VITE_API_BASE_URL`

### Data Loading Pattern

The app uses React Router's defer/Await pattern for async data:
```javascript
// In loader:
return defer({ allData: fetchData() });

// In component:
<Suspense fallback={<Preloader />}>
  <Await resolve={questionPromise.allData}>
    {(data) => /* render with data */}
  </Await>
</Suspense>
```

### UI Frameworks

- Material-UI (MUI) for components
- Materialize CSS for styling
- Bootstrap/React-Bootstrap
- Animate.css for animations
- SweetAlert2 for modals and alerts

## Code Style Notes

- Components use function declarations or arrow functions
- API calls handle errors with try-catch or `.ok` checks
- ESLint configured with React and React Hooks plugins
- Disabled some refresh warnings with inline comments
