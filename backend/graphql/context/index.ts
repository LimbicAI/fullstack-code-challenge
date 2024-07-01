import { BaseContext } from '@apollo/server';
import { User } from '../../db/schemas';

export interface Context extends BaseContext {
  user: User;
  userId: number;
}
