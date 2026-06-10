import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import QuestionForm from "./pages/QuestionForm";
import ImportQuestions from "./pages/ImportQuestions";
import QuestionSetMatrix from "./pages/QuestionSetMatrix";
import QuestionSetRandom from "./pages/QuestionSetRandom";
import QuestionSets from "./pages/QuestionSets";
import AssignmentCreate from "./pages/AssignmentCreate";
import ReadingTasks from "./pages/ReadingTasks";
import Results from "./pages/Results";
import ResultDetail from "./pages/ResultDetail";
import ReadingPlan from "./pages/ReadingPlan";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PlaceholderPage from "./pages/PlaceholderPage";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/create" element={<QuestionForm mode="create" />} />
          <Route path="/questions/:id/edit" element={<QuestionForm mode="edit" />} />
          <Route path="/questions/import" element={<ImportQuestions />} />
          <Route path="/question-sets" element={<QuestionSets />} />
          <Route path="/question-sets/create-matrix" element={<QuestionSetMatrix />} />
          <Route path="/question-sets/create-random" element={<QuestionSetRandom />} />
          <Route path="/assignments/create" element={<AssignmentCreate />} />
          <Route path="/reading-tasks" element={<ReadingTasks />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:id" element={<ResultDetail />} />
          <Route path="/reading-plan" element={<ReadingPlan />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/books/*" element={<PlaceholderPage title="Quản lý sách" />} />
          <Route path="*" element={<PlaceholderPage title="Trang đang được chuẩn bị" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
