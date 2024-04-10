/** @format */

import * as graphqlPrinter from 'graphql/language/printer';

export const createAppSyncGraphQLOperationAdapter = (getAppSyncAuthorizationInfo: {
  (): Promise<{ host: string; Authorization: any }>;
  (): any;
}) => ({
  applyMiddleware: async (options: any, next: any) => {
    // AppSync expects GraphQL operation to be defined as a JSON-encoded object in a 'data' property
    options.data = JSON.stringify({
      query:
        typeof options.query === 'string' ? options.query : graphqlPrinter.print(options.query),
      variables: options.variables,
    });

    // AppSync only permits authorized operations
    options.extensions = { authorization: await getAppSyncAuthorizationInfo() };

    // AppSync does not care about these properties
    delete options.operationName;
    delete options.variables;
    // Not deleting 'query' property as SubscriptionClient validation requires it

    next();
  },
});
