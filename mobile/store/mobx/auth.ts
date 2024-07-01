import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";

import { fromPromise } from "mobx-utils";
import {
  hydrateStore,
  isHydrated,
  isPersisting,
  makePersistable,
} from "mobx-persist-store";
import * as storage from "expo-secure-store";
import authClient from "@/clients/auth";

const safeStringifying = (value: string | object | undefined) => {
  try {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  } catch (error) {
    console.warn("Could not stringify object. Reason:", error);
    return "";
  }
};

const safeParsing = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

class AuthStore {
  user:
    | {
        id: number;
        fullName: string;
        birthdate: string;
        createdAt: string;
        updatedAt: string;
      }
    | undefined = undefined;

  token: string = "";
  refreshToken: string = "";

  error: any = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "authStore",
      properties: [
        "token",
        "refreshToken",
        { key: "user", serialize: safeStringifying, deserialize: safeParsing },
      ],

      debugMode: true,
      storage: {
        async getItem(key) {
          let item = await storage.getItemAsync(key);
          if (typeof item === "string") {
            item = safeParsing(item);
          }

          return item;
        },
        async setItem(key, value) {
          const safeValue = await safeStringifying(value);
          if (safeValue == null) {
            return;
          }
          return storage.setItemAsync(key, safeValue);
        },

        removeItem(key) {
          return storage.deleteItemAsync(key);
        },
      },
    });
  }

  async hydrateStore() {
    try {
      await hydrateStore(this);
    } catch (error) {
      console.warn(error);
    }
  }

  get isHydrated() {
    return isHydrated(this);
  }

  get isPersisting() {
    return isPersisting(this);
  }

  get isLoggedIn() {
    return this.token != "";
  }

  async authenticateWith(userId: number) {
    try {
      const { token, refreshToken, user } = await authClient.login(userId);
      this.token = token;
      this.refreshToken = refreshToken;
      this.user = user;
    } catch (error) {
      this.error = error;
      throw error;
    }
  }

  logout() {
    runInAction(() => {
      this.token = "";
      this.refreshToken = "";
      this.user = undefined;
    });
  }
}

export default new AuthStore();
