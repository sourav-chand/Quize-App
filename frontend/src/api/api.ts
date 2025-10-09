import axios from "axios";
import type { Quiz } from "../types/types";

const USE_API = true; // toggle to true to use backend at /api/quizzes
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE
});

export async function fetchQuizzes(): Promise<Quiz[]> {
  if (!USE_API) throw new Error("API disabled");
  const res = await api.get("/quizzes");
  return res.data;
}

export async function fetchQuiz(id: string): Promise<Quiz> {
  const res = await api.get(`/quizzes/${id}`);
  return res.data;
}

export async function createQuizAPI(quiz: Quiz): Promise<Quiz> {
  const res = await api.post("/quizzes", quiz);
  return res.data;
}

export async function updateQuizAPI(id: string, quiz: Quiz): Promise<Quiz> {
  const res = await api.put(`/quizzes/${id}`, quiz);
  return res.data;
}

export async function deleteQuizAPI(id: string): Promise<void> {
  await api.delete(`/quizzes/${id}`);
}

export default {
  fetchQuizzes,
  fetchQuiz,
  createQuizAPI,
  updateQuizAPI,
  deleteQuizAPI
};
