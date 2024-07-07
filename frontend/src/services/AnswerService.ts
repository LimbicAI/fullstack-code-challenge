import { makeAutoObservable, action, runInAction } from "mobx";
import axios from "axios";

import Answer from '../models/Answer';
import global from '../global';
import login from '../helpers/login';

export class AnswerService {
  answers: Answer[] = [];
  isLoadedOnce = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async get(userId: string) {
    try {
      const response = await axios.get(global.backendUrl + '/api/answer?' + new URLSearchParams({ userId: userId+"" }).toString(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      runInAction(() => {
        this.answers = response?.data?.data ?? [];
      });

      if(global.debug) console.log({ answers: this.answers });
    } 
    catch(error: any){
      console.error({ error });
      console.error({ result: error?.response?.data });
      global.showError(error?.response?.data?.msg);
    }
  }

  @action
  async post(answer: Answer) {
    try {
      const response = await axios.post(global.backendUrl + '/api/answer', answer, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });
  
      if(response?.data?.data?.id){
        runInAction(() => {
          answer.id = response?.data?.data?.id;
          answer.created_at = new Date().toISOString();
        });

        if(global.debug) console.log({ answer });
        return true;
      }

      runInAction(() => {
        answer.content = undefined;
        answer.userId = undefined;
      });

      return false;
      
    } 
    catch(error: any){
      console.error({ error });
      console.error({ result: error?.response?.data });
      global.showError(error?.response?.data?.msg);
      
      return false;
    }
  }

  @action
  async delete(id: number) {
    try {
      const response = await axios.delete(global.backendUrl + '/api/answer?' + new URLSearchParams({ id: id+"" }).toString(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      if(response.data?.success){
        runInAction(() => {
          this.answers = this.answers.filter((a) => a.id !== id);
        });
        return true;
      }
      return false;
    } 
    catch(error: any){
      console.error({ error });
      console.error({ result: error?.response?.data });
      global.showError(error?.response?.data?.msg);
      
      return false;
    }
  }
}

const answerService = new AnswerService();
export default answerService;
