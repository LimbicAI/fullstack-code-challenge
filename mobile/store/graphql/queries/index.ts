import { gql } from "@/gql/__generated__";

export const GET_QUESTIONS = gql(`
  query Questions($limit: Int, $offset: Int) {
    questions(limit: $limit, offset: $offset) {
      id
      title
      description
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);

export const GET_USER_QUESTIONS = gql(`
  query UserQuestions($userId: Int!, $limit: Int, $offset: Int) {
    userQuestions(userId: $userId, limit: $limit, offset: $offset) {
      id
      title
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      description
      createdAt
      updatedAt
    }
  }
`);

export const GET_USER_ANSWERS = gql(`
  query UserAnswers($userId: Int!, $limit: Int, $offset: Int) {
    userAnswers(userId: $userId, limit: $limit, offset: $offset) {
      id
      answer
      question {
        id
        title
        author {
          birthday
          name
          id
          createdAt
          updatedAt
        }
        description
        createdAt
        updatedAt
      }
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`);

export const GET_QUESTION_ANSWERS = gql(`
  query QuestionAnswers($questionAnswersId: Int!, $offset: Int, $limit: Int) {
    questionAnswers(id: $questionAnswersId, offset: $offset, limit: $limit) {
      id
      answer
      question {
        id
        title
        description
        author {
          id
          name
          birthday
          createdAt
          updatedAt
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
    }
  }
`);

export const GET_USERS = gql(`
  query Users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      birthday
      createdAt
      updatedAt
    }
  }
`);
