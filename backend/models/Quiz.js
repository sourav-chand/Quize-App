import mongoose from "mongoose";
const { Schema } = mongoose;

const OptionSchema = new Schema({
  text: { type: String, required: true }
});

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }], // array of 4 strings
  correctIndex: { type: Number, required: true } // 0-3
});

const QuizSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
