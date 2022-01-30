import { API_BASE_URL } from "../constants";

const USERS_ENDPOINT = "/users";
const ANSWERS_ENDPOINT = "/answers";

export const list = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}${USERS_ENDPOINT}`);

  const data = await response.json();

  return data;
};

export const read = async (id: User["id"]): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}${USERS_ENDPOINT}/${id}`);

  const data = await response.json();

  return data;
};

export const editAnswer = async (
  userId: User["id"],
  { id, question, answer }: UserAnswer
): Promise<ApiPostResponse & UserAnswer> => {
  const response = await fetch(
    `${API_BASE_URL}${USERS_ENDPOINT}/${userId}${ANSWERS_ENDPOINT}/${id}`,
    {
      method: "POST",
      body: JSON.stringify({ question, answer }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const createAnswer = async (
  userId: User["id"],
  { answer, question }: Omit<UserAnswer, "id">
): Promise<ApiPostResponse & UserAnswer> => {
  const response = await fetch(
    `${API_BASE_URL}${USERS_ENDPOINT}/${userId}${ANSWERS_ENDPOINT}`,
    {
      method: "POST",
      body: JSON.stringify({ answer, question }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const delAnswer = async (
  userId: User["id"],
  id: UserAnswer["id"]
): Promise<ApiPostResponse> => {
  const response = await fetch(
    `${API_BASE_URL}${USERS_ENDPOINT}/${userId}${ANSWERS_ENDPOINT}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};
