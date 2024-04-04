import axios from "../axiosConfig";
import { SignInResponseType } from "../types";

export const signIn = async (
  username: string
): Promise<SignInResponseType | null> => {
  try {
    const res = await axios.post(`/user/mock_login`, {
      username: username,
    });
    return {
      token: res.data.access_token,
      user: res.data.user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
