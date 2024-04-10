/** @format */

import { WebSocketLink } from '@apollo/link-ws';
import { UUIDOperationIdSubscriptionClient } from './UUIDOperationIdSubscriptionClient';
import { createAppSyncAuthorizedWebSocket } from './appSyncAuthorizedWebSocket';
import { cacheWithAsyncRefresh } from './asyncUtils';
import { createAppSyncGraphQLOperationAdapter } from './appSyncGraphQLOperationAdapter';

const APPSYNC_MAX_CONNECTION_TIMEOUT_MILLISECONDS = 5 * 60 * 1000;

// @ts-ignore
export const createAppSyncSubscriptionWebsocketLink = async ({ appSyncApiUrl, getJwtToken }) => {
  const appSyncApiHost = new URL(appSyncApiUrl).host;
  const getAppSyncAuthorizationInfo = async () => ({
    host: appSyncApiHost,
    Authorization: await getJwtToken(),
  });

  return new WebSocketLink(
    new (UUIDOperationIdSubscriptionClient as any)(
      `wss://${appSyncApiHost.replace('appsync-api', 'appsync-realtime-api')}/graphql`,
      { timeout: APPSYNC_MAX_CONNECTION_TIMEOUT_MILLISECONDS, reconnect: true, lazy: true },
      // We want to avoid expired authorization information being used but SubscriptionClient synchronously
      // instantiates websockets (on connection/reconnection) so the best we can do is schedule an async refresh
      // and suffer failed connection attempts until a fresh token has been retrieved
      createAppSyncAuthorizedWebSocket(await cacheWithAsyncRefresh(getAppSyncAuthorizationInfo)),
    ).use([createAppSyncGraphQLOperationAdapter(getAppSyncAuthorizationInfo)]),
  );
};
