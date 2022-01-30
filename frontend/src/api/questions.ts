import { API_BASE_URL } from "../constants";

const QUESTIONS_ENDPOINT = "/questions";

export const list = async (): Promise<Question[]> => {
  const response = await fetch(`${API_BASE_URL}${QUESTIONS_ENDPOINT}`);

  const data = await response.json();

  return data;
};

export const edit = async ({
  id,
  question,
}: Question): Promise<ApiPostResponse & Question> => {
  const response = await fetch(`${API_BASE_URL}${QUESTIONS_ENDPOINT}/${id}`, {
    method: "POST",
    body: JSON.stringify({ question }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const create = async (
  question: Question["question"]
): Promise<ApiPostResponse & Question> => {
  const response = await fetch(`${API_BASE_URL}${QUESTIONS_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify({ question }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const del = async (id: Question["id"]): Promise<ApiPostResponse> => {
  const response = await fetch(`${API_BASE_URL}${QUESTIONS_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};
