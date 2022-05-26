import React from "React";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3333/graphql",
  cache: new InMemoryCache(),
});

interface RenderWithGraphQLType {
  children: React.ReactNode;
}

export const RenderWithGraphQL: React.FC<RenderWithGraphQLType> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
