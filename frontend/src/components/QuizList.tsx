
import type { Quiz } from "../types/types";
import QuizCard from "./QuizCard";

export default function QuizList({
  quizzes,
  onEdit,
  onDelete,
  onPlay
}: {
  quizzes: Quiz[];
  onEdit: (q: Quiz) => void;
  onDelete: (id?: string) => void;
  onPlay: (q: Quiz) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quizzes.length === 0 ? (
          <div className="p-6 bg-white rounded shadow">No quizzes. Create your first quiz.</div>
        ) : quizzes.map(q => (
          <QuizCard key={q.id || q._id} quiz={q} onEdit={() => onEdit(q)} onDelete={() => onDelete(q.id)} onPlay={() => onPlay(q)} />
        ))}
      </div>
    </div>
  );
}
