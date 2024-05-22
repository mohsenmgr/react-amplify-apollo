import ReactDOM from 'react-dom/client'
import './App.css'
import { Auth } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import App from './App';

import awsConfig from '../aws-exports';

import { client } from './apollo.config';

Auth.configure(awsConfig);

client.then(clientResponse => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <ApolloProvider client={clientResponse}>
      <div className='App'>
        <App />
      </div>
    </ApolloProvider>
  );
});