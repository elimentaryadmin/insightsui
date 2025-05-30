import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import errorHandler from '@/utils/errorHandler';

const apolloErrorLink = onError((error) => errorHandler(error));

const httpLink = new HttpLink({
  uri: '/api/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        askingTask: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: from([apolloErrorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
