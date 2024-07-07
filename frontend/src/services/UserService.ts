import { makeAutoObservable, action, runInAction } from "mobx";
import axios from "axios";

import User from '../models/User';
import global from '../global';
import login from '../helpers/login';

export class UserService {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async get() {
    try {
      const response = await axios.get(global.backendUrl + '/api/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      runInAction(() => {
        this.users = response?.data?.data ?? [];
      });

      if(global.debug) console.log({ users: this.users });
    } 
    catch(error: any){
      console.error({ error });
      console.error({ result: error?.response?.data });
      global.showError(error?.response?.data?.msg);
    }
  }
}

const userService = new UserService();
export default userService;
