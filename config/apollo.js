import { ApolloClient, InMemoryCache } from "@apollo/client";

const ClientApollo = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default ClientApollo;
