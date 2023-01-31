import "@/styles/globals.css";
import "@/styles/output.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import ClientApollo from "../../config/apollo";
import OrderState from "context/orderState";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ClientApollo}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  );
}
