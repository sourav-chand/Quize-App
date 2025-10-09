import { useState } from "react";
import type { Quiz, Question } from "../types/types";

function createEmptyQuestion(): Question {
  return { text: "", options: ["", "", "", ""], correctIndex: 0 };
}

export default function QuizEditor({
  quiz,
  onCancel,
  onSave
}: {
  quiz: Quiz;
  onCancel: () => void;
  onSave: (q: Quiz) => void;
}) {
  const [title, setTitle] = useState(quiz.title || "");
  const [questions, setQuestions] = useState<Question[]>(quiz.questions?.length ? quiz.questions : [createEmptyQuestion()]);

  function updateQuestion(index: number, patch: Partial<Question>) {
    setQuestions(prev => prev.map((q,i) => (i === index ? { ...q, ...patch } : q)));
  }

  function addQuestion() { setQuestions(prev => [...prev, createEmptyQuestion()]); }
  function removeQuestion(i: number) { setQuestions(prev => prev.filter((_, idx) => idx !== i)); }

  function save() {
    // basic validation
    if (!title.trim()) return alert("Enter a title");
    for (const q of questions) {
      if (!q.text.trim()) return alert("All questions must have text");
      if (q.options.some(opt => !opt.trim())) return alert("All options must be filled");
      if (q.options.length !== 4) return alert("Each question must have 4 options");
    }
    onSave({ ...quiz, title: title.trim(), questions });
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{quiz.id ? "Edit Quiz" : "Create Quiz"}</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1" onClick={onCancel}>Cancel</button>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={save}>Save</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-slate-600">Quiz Title</label>
        <input className="mt-1 w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="p-3 border rounded">
            <div className="flex justify-between items-center">
              <strong>Question {idx + 1}</strong>
              <div className="flex gap-2">
                <button className="text-sm" onClick={() => removeQuestion(idx)} disabled={questions.length === 1}>Remove</button>
              </div>
            </div>

            <input className="mt-2 w-full p-2 border rounded" placeholder="Question text" value={q.text} onChange={e => updateQuestion(idx, { text: e.target.value })} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input className="w-full p-2 border rounded" value={opt} onChange={e => {
                    const newOptions = [...q.options]; newOptions[oi] = e.target.value;
                    updateQuestion(idx, { options: newOptions });
                  }} />
                  <label className="text-sm">
                    <input type="radio" name={`correct-${idx}`} checked={q.correctIndex === oi} onChange={() => updateQuestion(idx, { correctIndex: oi })} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="px-3 py-2 border rounded" onClick={addQuestion}>+ Add question</button>
      </div>
    </div>
  );
}
