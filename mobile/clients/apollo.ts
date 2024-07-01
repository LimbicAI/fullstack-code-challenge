import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import auth from "../store/mobx/auth";
import config from "./config";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { offsetLimitPagination } from "@apollo/client/utilities";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: config.GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = auth.token;

  if (token == null) {
    return { headers };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          questions: offsetLimitPagination(),
          questionAnswers: offsetLimitPagination(),
        },
      },
    },
  }),
  link: authLink.concat(httpLink),
});

export default client;
