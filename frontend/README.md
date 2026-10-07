Cognitive Assessment — Run & Verify Guide
1. Project Structure

project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── cognitive/
│   │   │       ├── MemoryExercise.jsx
│   │   │       ├── AttentionExercise.jsx
│   │   │       ├── ReactionTimeExercise.jsx
│   │   │       └── PatternExercise.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── CognitiveAssessment.jsx
│   │   │
│   │   ├── services/
│   │   │   └── cognitiveApi.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
└── backend/
    └── ...
2. Start the FastAPI Backend

Open a terminal and navigate to the backend directory:

cd backend

Activate your Python virtual environment if you have one.

Windows
.\venv\Scripts\activate

Then start FastAPI:

uvicorn app.main:app --reload

If your FastAPI entry file is different, replace main accordingly.

For example:

uvicorn app:app --reload
Expected output

You should see something similar to:

INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.

Keep this terminal running.

3. Verify FastAPI Is Running

Open your browser and visit:

http://localhost:8000/docs

You should see the FastAPI Swagger UI.

Look for the cognitive assessment endpoint:

POST /api/cognitive/session

If this endpoint appears, the backend route is registered correctly.

4. Start the React Frontend

Open a second terminal.

Navigate to the frontend:

cd frontend

Install dependencies if this is the first time:

npm install

Start Vite:

npm run dev

You should see something similar to:

VITE ready


Local: http://localhost:5173/

Open the displayed URL in your browser.
5. Check the Browser Console

Open:

Developer Tools → Console

After clicking Submit Assessment, you should see:

Backend response: ...

For example:

Backend response:
{
  message: "Assessment received successfully"
}

This means:

React
  ↓
cognitiveApi.js
  ↓
HTTP POST
  ↓
FastAPI

is working.

At that point, your React Cognitive Assessment → FastAPI integration is working end-to-end.