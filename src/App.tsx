
import '@aws-amplify/ui-react/styles.css'
import Content from './Content';
import { UserContext } from './context';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Spinner from './components/spinner';
import { ContextObject, User } from './types';


function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true);


  let myUser: User = new User();
  let appContext: ContextObject = { user: myUser, loggedIn: false };
  const [appContextState, setAppContextState] = useState<ContextObject>(appContext);

  useEffect(() => {

    async function fetchUserInfo() {
      const currentUserInfo = await Auth.currentUserInfo();
      console.log('current user info', currentUserInfo);
      return currentUserInfo;
    }

    fetchUserInfo().then((userInfo: User) => {
      console.log("***APP.tsx*** INSIDE CONTENT USER INFO IS ", userInfo);

      myUser = userInfo;
      const isLoggedIn = userInfo?.id ? true : false;
      setIsLoading(false);
      appContext = { user: myUser, loggedIn: isLoggedIn }
      setAppContextState(appContext);
    });


  }, []);

  if (!isLoading)
    return (
      <UserContext.Provider value={appContextState}>
        <Content />
      </UserContext.Provider>

    );
  else {
    return <Spinner />
  }
}
export default App;
