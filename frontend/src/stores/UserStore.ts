import { makeAutoObservable } from "mobx";
import apiClient from "../api/apiClient";
import { User } from "../types";

class UserStore {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    const response = await apiClient.get("/users");
    this.users = response.data;
  }
}

export default UserStore;
