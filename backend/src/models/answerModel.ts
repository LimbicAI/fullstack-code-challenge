import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./userModel";
import { Question } from "./questionModel";

@Table
export class Answer extends Model {
  @Column
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Question)
  @Column
  questionId!: number;

  @BelongsTo(() => Question)
  question!: Question;
}
