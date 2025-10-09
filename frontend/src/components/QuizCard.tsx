
import type { Quiz } from "../types/types";

export default function QuizCard({ quiz, onEdit, onDelete, onPlay }: { quiz: Quiz; onEdit: () => void; onDelete: () => void; onPlay: () => void; }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{quiz.title}</h3>
          <div className="text-sm text-slate-500 mt-1">{quiz.questions.length} questions</div>
        </div>
        <div className="flex gap-2">
          <button className="text-indigo-600 hover:underline" onClick={onPlay}>Play</button>
          <button className="text-slate-600 hover:underline" onClick={onEdit}>Edit</button>
          <button className="text-red-600 hover:underline" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
