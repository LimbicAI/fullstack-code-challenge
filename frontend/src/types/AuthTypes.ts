import { User } from "./UserTypes";

export type LogInInputType = {
  username: string;
  password: string;
};

export type SignInResponseType = {
  token: string;
  user: User;
}
