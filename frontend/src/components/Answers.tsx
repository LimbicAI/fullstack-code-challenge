import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import SwalReactContent from 'sweetalert2-react-content'

import { useAnswerStore } from '../contexts/AnswerContext';
import Answer from '../models/Answer';
import answerSchema from '../schemas/AnswerSchema';
import global from '../global';

const Answers = observer(() => {
  const answerStore = useAnswerStore();
  const queryStringParams = new URLSearchParams(useLocation().search);
  const userId = queryStringParams.get('userId');

  useEffect(() => {
    // Function to run when component mounts
    if(userId && !isNaN(Number(userId)) && !answerStore.isLoadedOnce) {
      answerStore.get(userId);
      answerStore.isLoadedOnce = true;
    }

    return () => {
      // This code will be executed when the component is unmounted
      runInAction(() => {
        answerStore.answers = [];
      });
      answerStore.isLoadedOnce = false;
    };
  }, [answerStore, userId]);

  // CRUD
  async function Create(answer: Answer){
    const { value: formValues } = await SwalReactContent(Swal).fire({
      title: "Create an Answer",
      html: `
        <textarea id="swal-input1" class="swal2-textarea" placeholder="Answer Content" required></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => {
        return {
          content: (document.getElementById("swal-input1") as HTMLInputElement)?.value,
        };
      }
    });

    if(!formValues) {
      return;
    }

    const { error } = answerSchema.validate({ userId, questionId: answer.questionId, content: formValues.content });
    if(error) {
      console.error({ error });
      
      global.showError(error.details[0].message);
      return;
    }

    runInAction(() => {
      answer.userId = Number(userId);
      answer.content = formValues.content;
    });

    if(await answerStore.post(answer)){
      global.showMsg('Answer created successfully');
    }
  }
  
  async function Delete(id: number | undefined){
    if(!id || isNaN(Number(id))) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this answer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(await answerStore.delete(id)){
          global.showMsg("Answer has been deleted.");
        }
        else {
          global.showError("Failed to delete the answer.");
        }
      }
    });
  }

  return (
    <div>
      <h2>Answers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question Title</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Answerd At</th>
            <th>
              <Link to={`/users`}>
                <button className="btn btn-secondary">Back</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {answerStore.answers.map(answer => (
            <tr key={answer.questionId}>
              <td>{answer.questionId}</td>
              <td>{answer.questionTitle}</td>
              <td>{answer.questionContent}</td>
              <td>{answer.content}</td>
              <td>{answer.created_at ? (new Date(answer.created_at).toISOString().replaceAll("T", " ").substring(0, 19)) : "N/A"}</td>
              <td>
                {answer.id ? <button className="btn btn-danger" onClick={() => Delete(answer.id)}>Delete</button> : 
                             <button className="btn btn-primary" onClick={() => Create(answer)}>Answer</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Answers;
