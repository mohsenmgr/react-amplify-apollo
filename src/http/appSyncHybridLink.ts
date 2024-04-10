/** @format */

import { ApolloLink } from '@apollo/client';
import { createAppSyncSubscriptionWebsocketLink } from './appSyncSubscriptionWebSocketLink';
import { createAppSyncHttpLink } from './appSyncHttpLink';
import { getMainDefinition } from '@apollo/client/utilities';

// @ts-ignore
export const createAppSyncHybridLink = async ({ appSyncApiUrl, getJwtToken, language }) =>
  ApolloLink.split(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isSubscriptionOperation,
    (await createAppSyncSubscriptionWebsocketLink({ appSyncApiUrl, getJwtToken })) as any,
    createAppSyncHttpLink({ appSyncApiUrl, getJwtToken, language }),
  );

// @ts-ignore
const isSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query) as any;
  return kind === 'OperationDefinition' && operation === 'subscription';
};
