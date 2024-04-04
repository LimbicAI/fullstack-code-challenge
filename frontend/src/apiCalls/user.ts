import axios from "../axiosConfig";
import { User } from "../types";
export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const res = await axios.get(`/user`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
