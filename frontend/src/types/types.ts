export type Question = {
  text: string;
  options: string[]; // length 4
  correctIndex: number;
};

export type Quiz = {
  _id?: string;
  id?: string;
  title: string;
  questions: Question[];
  createdAt?: string;
};
