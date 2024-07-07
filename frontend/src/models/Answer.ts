export default interface Answer {
  id?: number;
  userId?: number;
  content?: string;
  created_at?: string;
  questionId: number;
  questionTitle?: string;
  questionContent?: string;
}