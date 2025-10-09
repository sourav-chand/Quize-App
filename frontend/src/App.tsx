import React, { useEffect, useState } from "react";
import QuizList from "./components/QuizList";
import QuizEditor from "./components/QuizEditor";
import QuizPlayer from "./components/QuizPlayer";
import type { Quiz } from "./types/types";
import api from "./api/api";

export default function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [playingQuiz, setPlayingQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes from backend on mount
  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    setLoading(true);
    try {
      const data = await api.fetchQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load quizzes from backend");
    } finally {
      setLoading(false);
    }
  }

  async function createQuiz(quiz: Quiz) {
    try {
      const newQuiz = await api.createQuizAPI(quiz);
      setQuizzes(prev => [newQuiz, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  }

  async function updateQuiz(updated: Quiz) {
    if (!updated._id) return;
    try {
      const saved = await api.updateQuizAPI(updated._id, updated);
      setQuizzes(prev => prev.map(q => (q._id === saved._id ? saved : q)));
    } catch (err) {
      console.error(err);
      alert("Failed to update quiz");
    }
  }

  async function deleteQuiz(id?: string) {
    if (!id) return;
    if (!confirm("Delete this quiz?")) return;
    try {
      await api.deleteQuizAPI(id);
      setQuizzes(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete quiz");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Interactive Quiz Builder</h1>
            <p className="text-sm text-slate-500">
              Connected to backend — CRUD via Express + MongoDB
            </p>
          </div>
          <button
            onClick={() =>
              setEditingQuiz({
                title: "",
                questions: [
                  { text: "", options: ["", "", "", ""], correctIndex: 0 },
                ],
              })
            }
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
          >
            + New Quiz
          </button>
        </header>

        <main>
          {loading ? (
            <div className="text-center p-6">Loading quizzes...</div>
          ) : !editingQuiz && !playingQuiz ? (
            <QuizList
              quizzes={quizzes}
              onEdit={(q) => setEditingQuiz(q)}
              onDelete={(id) => deleteQuiz(id)}
              onPlay={(q) => setPlayingQuiz(q)}
            />
          ) : editingQuiz ? (
            <QuizEditor
              quiz={editingQuiz}
              onCancel={() => setEditingQuiz(null)}
              onSave={(q) => {
                if (q._id) updateQuiz(q);
                else createQuiz(q);
                setEditingQuiz(null);
              }}
            />
          ) : (
            playingQuiz && (
              <QuizPlayer
                quiz={playingQuiz}
                onExit={() => setPlayingQuiz(null)}
              />
            )
          )}
        </main>
      </div>
    </div>
  );
}
















// import  { useEffect, useState } from "react";
// import QuizList from "./components/QuizList";
// import QuizEditor from "./components/QuizEditor";
// import QuizPlayer from "./components/QuizPlayer";
// import type { Quiz } from "./types/types";
// import { useLocalStorage } from "./hooks/useLocalStorage";

// const SAMPLE: Quiz[] = [
//   {
//     id: "sample-1",
//     title: "Flags & Capitals (Sample)",
//     questions: [
//       { text: "Capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], correctIndex: 0 },
//       { text: "Capital of India?", options: ["Mumbai", "New Delhi", "Bengaluru", "Kolkata"], correctIndex: 1 }
//     ]
//   }
// ];

// export default function App() {
//   const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>("quizzes_v1", SAMPLE);
//   const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
//   const [playingQuiz, setPlayingQuiz] = useState<Quiz | null>(null);

//   // CRUD using local state (you can plug in API calls where needed)
//   const createQuiz = (quiz: Quiz) => {
//     const newQuiz = { ...quiz, id: Date.now().toString(), createdAt: new Date().toISOString() };
//     setQuizzes([newQuiz, ...quizzes]);
//   };

//   const updateQuiz = (updated: Quiz) => {
//     setQuizzes(quizzes.map(q => (q.id === updated.id ? updated : q)));
//   };

//   const deleteQuiz = (id?: string) => {
//     setQuizzes(quizzes.filter(q => q.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         <header className="flex items-end justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Interactive Quiz Builder</h1>
//             <p className="text-sm text-slate-500">Create, edit, and play quizzes — data saved in localStorage.</p>
//           </div>
//           <button
//             onClick={() => setEditingQuiz({ title: "", questions: [{ text: "", options: ["", "", "", ""], correctIndex: 0 }], id: undefined })}
//             className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
//           >
//             + New Quiz
//           </button>
//         </header>

//         <main>
//           {!editingQuiz && !playingQuiz && (
//             <QuizList
//               quizzes={quizzes}
//               onEdit={(q) => setEditingQuiz(q)}
//               onDelete={(id) => deleteQuiz(id)}
//               onPlay={(q) => setPlayingQuiz(q)}
//             />
//           )}

//           {editingQuiz && (
//             <QuizEditor
//               quiz={editingQuiz}
//               onCancel={() => setEditingQuiz(null)}
//               onSave={(q) => {
//                 if (q.id) updateQuiz(q); else createQuiz(q);
//                 setEditingQuiz(null);
//               }}
//             />
//           )}

//           {playingQuiz && (
//             <QuizPlayer
//               quiz={playingQuiz}
//               onExit={() => setPlayingQuiz(null)}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
