import { Auth } from 'aws-amplify';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAppContext, User } from '../types'
import { UserContext } from '../context';


export default function Logout() {

    const navigate = useNavigate();
    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);



    useEffect(() => {
        Auth.signOut()
            .then(() => {

                const context = new MyAppContext();
                const user: User = new User();
                user.setUser(undefined, undefined, undefined);
                context.setUser(user);
                context.setLoggedIn(false);
                context.callback = applicationContext.callback;


                // Call the main application Context with the updated information
                // this callback calls setContext of the app, and update the isLoggedIn flag inside the context
                applicationContext.callback(context);


                navigate('/login')
            })
            .catch(err => console.log(err));
    }, [])




    return <></>
}