import mongoose, { Document, Schema } from 'mongoose';

export interface Answer extends Document {
  body: string;
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
}

const answerSchema: Schema = new Schema({
  body: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
});

export default mongoose.model<Answer>('Answer', answerSchema);
