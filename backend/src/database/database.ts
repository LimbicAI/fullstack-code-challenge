import config from "config";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/userModel";
import { Question } from "../models/questionModel";
import { Answer } from "../models/answerModel";

type DatabaseConfig = {
  name: string;
  dialect: string;
  username: string;
  password: string;
  port: number;
  host: string;
  logEnabled: boolean;
};

const dbConfig = config.get<DatabaseConfig>("database");

const sequelize = new Sequelize({
  database: dbConfig.name,
  dialect: dbConfig.dialect as any,
  username: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  host: dbConfig.host,
  models: [User, Question, Answer],
  logging: dbConfig.logEnabled,
});

export default sequelize;
