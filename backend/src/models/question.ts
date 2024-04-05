import mongoose, { Document, Schema } from 'mongoose';

export interface Question extends Document {
  title: string;
  body: string;
}

const questionSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<Question>('Question', questionSchema);
