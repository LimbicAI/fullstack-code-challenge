import { observer } from "mobx-react";
import { useEffect } from 'react';

import Swal from 'sweetalert2'
import SwalReactContent from 'sweetalert2-react-content'

import { useQuestionStore } from '../contexts/QuestionContext';
import Question from '../models/Question';
import questionSchema from '../schemas/QuestionSchema';
import global from '../global';

const Questions = observer(() => {
  const questionStore = useQuestionStore();

  useEffect(() => {
    questionStore.get();
  }, [questionStore]);

  // CRUD
  async function Create(){
    const { value: formValues } = await SwalReactContent(Swal).fire({
      title: "Create a Question",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Question Title" required>
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Question Content" required></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          content: (document.getElementById("swal-input2") as HTMLInputElement)?.value
        } as Question;
      }
    });

    if(!formValues) {
      return;
    }

    const { error } = questionSchema.validate(formValues);
    if(error) {
      console.error({ error });
      
      global.showError(error.details[0].message);
      return;
    }
    
    if(await questionStore.post(formValues)){
      global.showMsg('Question created successfully');
    }
  }
  
  async function Edit(question: Question){
    if(!question.id || isNaN(Number(question.id))) return;

    const { value: formValues } = await SwalReactContent(Swal).fire({
      title: "Update a Question",
      html: `
        <input id="swal-input1" class="swal2-input" value="${question.title}" placeholder="Question Title" required>
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Question Content" required>${question.content}</textarea>
      `,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          content: (document.getElementById("swal-input2") as HTMLInputElement)?.value
        } as Question;
      }
    });

    if(!formValues) {
      return;
    }

    const { error } = questionSchema.validate(formValues);
    if(error) {
      console.error({ error });
      
      global.showError(error.details[0].message);
      return;
    }
    
    if(await questionStore.patch({ id: question.id, ...formValues })){
      global.showMsg('Question edited successfully');
    }
  }
  
  async function Delete(id: number | undefined){
    if(!id || isNaN(Number(id))) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(await questionStore.delete(id)){
          global.showMsg("Question has been deleted.");
        }
        else {
          global.showError("Failed to delete the question.");
        }
      }
    });
  }

  return (
    <div>
      <h2>Questions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th></th>
            <th>
              <button className="btn btn-primary" onClick={Create}>Create</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {questionStore.questions.map(question => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.title}</td>
              <td>{question.content}</td>
              <td>
                <button className="btn btn-success" onClick={() => Edit(question)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => Delete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Questions;
