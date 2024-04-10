/** @format */

import i18n from 'i18next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Auth } from 'aws-amplify';
import awsConfig from '../aws-exports';
import { v4 as uuidv4 } from 'uuid';

const getToken = async () => {
  try {
    const res = await Auth.currentSession();
    const accessToken = res.getAccessToken();
    const jwt = accessToken.getJwtToken();
    return jwt;
  } catch (e) {
    return null;
  }
};

import { createAppSyncHybridLink } from './http/appSyncHybridLink';

const language = i18n.language;

const createAppSyncApolloClient = async ({
  appSyncApiUrl,
  getJwtToken,
  cacheConfig,
  connectToDevTools,
}: any) =>
  new ApolloClient({
    link: await createAppSyncHybridLink({ appSyncApiUrl, getJwtToken, language }),
    cache: new InMemoryCache(cacheConfig),
    connectToDevTools,
  });

export const client = createAppSyncApolloClient({
  appSyncApiUrl: awsConfig.aws_appsync_graphqlEndpoint,
  getJwtToken: getToken,
  cacheConfig: {
    resultCaching: false,
    dataIdFromObject() {
      return uuidv4();
    },
  },
});
