import { makeAutoObservable, action, runInAction } from "mobx";
import axios from "axios";

import Question from '../models/Question';
import global from '../global';
import login from "../helpers/login";

export class QuestionService {
  questions: Question[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async get() {
    try {
      const response = await axios.get(global.backendUrl + '/api/question', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      runInAction(() => {
        this.questions = response?.data?.data ?? [];
      });

      if(global.debug) console.log({ questions: this.questions });
    } 
    catch(error: any){
      console.error({ error });
      console.error({ result: error?.response?.data });
      global.showError(error?.response?.data?.msg);
    }
  }

  @action
  async post(question: Question) {
    try {
      const response = await axios.post(global.backendUrl + '/api/question', question, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      question.id = response?.data?.data?.id;

      if(global.debug) console.log({ question });

      if(question.id){
        runInAction(() => {
          this.questions.push(question);
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

  @action
  async patch(question: Question) {
    try {
      const response = await axios.patch(global.backendUrl + '/api/question', question, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      if(response.data?.success){
        const index = this.questions.findIndex((q) => q.id === question.id);
        if (index !== -1) {
          runInAction(() => {
            this.questions[index] = question;
          });
          return true;
        }
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

  @action
  async delete(id: number) {
    try {
      const response = await axios.delete(global.backendUrl + '/api/question?' + new URLSearchParams({ id: id+"" }).toString(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: login.getLoggedInToken()
        }
      });

      if(response.data?.success){
        runInAction(() => {
          this.questions = this.questions.filter((q) => q.id !== id);
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

const questionService = new QuestionService();
export default questionService;
