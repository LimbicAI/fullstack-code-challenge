import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Question } from "./questionModel";
import { Answer } from "./answerModel";

@Table
export class User extends Model {
  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => Question)
  questions!: Question[];

  @HasMany(() => Answer)
  answers!: Answer[];
}
