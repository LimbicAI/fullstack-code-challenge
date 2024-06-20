import express from "express";
const cors = require("cors");
import bodyParser from "body-parser";
import questionRoutes from "./routes/questionRoutes";
import answerRoutes from "./routes/answerRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/users", userRoutes);
// Error handling middleware
app.use(errorHandler);

export default app;
