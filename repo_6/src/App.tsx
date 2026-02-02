/**
 * Minimalist Academic Network Platform
 * 
 * To get started:
 * 1. Run `pnpm dev` - This starts both the JSON Server (port 3001) and Vite dev server
 * 2. Open http://localhost:5173 in your browser
 * 3. Use demo credentials: demo@student.edu / demo123
 * 
 * Features:
 * - Clean authentication (Login/Signup)
 * - Q&A Forum with filtering and sorting
 * - Student Directory with search
 * - User Profiles with activity stats
 * - Question posting and answering
 * 
 * Tech Stack:
 * - React 19 + TypeScript
 * - React Router v7 for navigation
 * - Tailwind CSS 4 for styling
 * - shadcn/ui components
 * - JSON Server for mock backend
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import QuestionDetail from '@/pages/QuestionDetail';
import NewQuestion from '@/pages/NewQuestion';
import Profile from '@/pages/Profile';
import StudentDirectory from '@/pages/StudentDirectory';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/questions/new" element={<NewQuestion />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/students" element={<StudentDirectory />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
