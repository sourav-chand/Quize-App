import Quiz from "../models/Quiz.js";

export async function getQuizzes(req, res) {
  const quizzes = await Quiz.find().sort({ createdAt: -1 });
  res.json(quizzes);
}

export async function getQuizById(req, res) {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
}

export async function createQuiz(req, res) {
  const { title, questions } = req.body;
  if (!title || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Invalid payload" });
  }
  const quiz = new Quiz({ title, questions });
  await quiz.save();
  res.status(201).json(quiz);
}

export async function updateQuiz(req, res) {
  const { id } = req.params;
  const update = req.body;
  const quiz = await Quiz.findByIdAndUpdate(id, update, { new: true });
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
}

export async function deleteQuiz(req, res) {
  const { id } = req.params;
  await Quiz.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
}
