import  { useState } from "react";
import type { Quiz } from "../types/types";

export default function QuizPlayer({ quiz, onExit }: { quiz: Quiz; onExit: () => void; }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(Array(quiz.questions.length).fill(null));
  const [complete, setComplete] = useState(false);

  const q = quiz.questions[index];

  function selectOption(optIndex: number) {
    if (answers[index] != null) return; // prevent change after selection
    const newAnswers = [...answers];
    newAnswers[index] = optIndex;
    setAnswers(newAnswers);
    if (optIndex === q.correctIndex) setScore(s => s + 1);
  }

  function next() {
    if (index + 1 < quiz.questions.length) setIndex(index + 1);
    else setComplete(true);
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{quiz.title}</h2>
        <button onClick={onExit} className="text-sm">Exit</button>
      </div>

      {!complete ? (
        <>
          <div className="mb-4">
            <div className="text-sm text-slate-500">Question {index + 1} / {quiz.questions.length}</div>
            <div className="mt-2 text-lg font-medium">{q.text}</div>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[index] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => selectOption(oi)}
                  className={`w-full text-left p-3 rounded border ${selected ? "bg-indigo-50 border-indigo-400" : "bg-white"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-between">
            <button onClick={prev} disabled={index === 0} className="px-3 py-1 border rounded">Previous</button>
            <button onClick={next} className="px-3 py-1 bg-indigo-600 text-white rounded">Next</button>
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">Completed</h3>
          <p className="mt-2">Score: <strong>{score}</strong> / {quiz.questions.length}</p>

          <div className="mt-4 space-y-3">
            <h4 className="font-semibold">Review</h4>
            {quiz.questions.map((qq, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="font-medium">{i+1}. {qq.text}</div>
                <div className="mt-1 text-sm">
                  Correct: {qq.options[qq.correctIndex]}
                </div>
                <div className="text-sm mt-1">
                  Your answer: {answers[i] == null ? "No answer" : qq.options[answers[i] as number]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button onClick={onExit} className="px-3 py-1 border rounded">Back to list</button>
          </div>
        </div>
      )}
    </div>
  );
}
