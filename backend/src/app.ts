import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import questionRoutes from './routes/questionRoutes';
import answerRoutes from './routes/answerRoutes';
import user from './models/user';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://meetayzahamid:nEgZFxP8EZE9JzJ8@test-db.0s0q3fq.mongodb.net/?retryWrites=true&w=majority&appName=Test-db");

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
