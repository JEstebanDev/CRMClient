import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const ClientApollo = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: setAuthorizationLink.concat(httpLink),
});

export default ClientApollo;
