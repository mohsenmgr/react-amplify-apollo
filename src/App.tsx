
import '@aws-amplify/ui-react/styles.css'
import Content from './Content';
import { UserContext } from './context';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Spinner from './components/spinner';
import { MyAppContext, User } from './types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setApplicationContext = (context: MyAppContext) => {
    setAppContextState(context);
  }

  const appContext: MyAppContext = new MyAppContext();
  const [appContextState, setAppContextState] = useState<MyAppContext>(appContext);
  appContext.callback = setApplicationContext;


  useEffect(() => {

    async function fetchUserInfo() {
      const currentUserInfo = await Auth.currentUserInfo();
      console.log('*** APP.tsx *** currentUserInfo: ', currentUserInfo);
      return currentUserInfo;
    }

    fetchUserInfo().then((userInfo: User) => {
      appContext.setUser(userInfo);
      const isLoggedIn = userInfo?.username ? true : false;
      appContext.setLoggedIn(isLoggedIn);
      setIsLoading(false);
      setAppContextState(appContext);
    });


  }, []);

  if (!isLoading)
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserContext.Provider value={appContextState}>
          <Content />
        </UserContext.Provider>
      </LocalizationProvider>

    );
  else {
    return <Spinner />
  }
}
export default App;
