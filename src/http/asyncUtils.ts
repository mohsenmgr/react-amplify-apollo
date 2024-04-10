/** @format */

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports'

Amplify.configure({
  Auth: {
    region: awsConfig.aws_project_region,
    userPoolId: awsConfig.aws_user_pools_id,
    userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
  },
});

export const getToken = async (): Promise<string | null> => {
  try {
    const session = await Auth.currentSession();
    return session.getAccessToken().getJwtToken();
  } catch (e) {
    return null;
  }
};

export const cacheWithAsyncRefresh = async (asyncSupplier: any) => {
  let value: any;

  const asyncRefresh = async () => (value = await asyncSupplier());

  // Warm cache
  await asyncRefresh();

  return () => {
    asyncRefresh().catch(console.error);
    return value;
  };
};
