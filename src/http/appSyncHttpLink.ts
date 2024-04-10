/** @format */

import { setContext } from '@apollo/link-context';
import { ApolloLink, HttpLink } from '@apollo/client';
import awsConfig from '../../aws-exports'
import i18n from 'i18next';

// @ts-ignore
export const createAppSyncHttpLink = function ({ appSyncApiUrl, getJwtToken, language }) {
  const authorizationHeaderLink = setContext(async (_request, previousContext) => ({
    ...previousContext,
    headers: {
      ...previousContext.headers,
      applanguage: i18n.language,
      Authorization: await getJwtToken(),
      ...(!(await getJwtToken()) && { 'x-api-key': awsConfig.aws_appsync_apiKey }),
    },
  }));

  return ApolloLink.concat(authorizationHeaderLink as any, new HttpLink({ uri: appSyncApiUrl }));
};
