import {
    Route,
    Routes as RoutesDOM,
} from 'react-router-dom';

import Users from '../components/Users';
import Login from '../components/login';
import { MyAppContext } from '../types'
import { useContext } from 'react';
import { UserContext } from '../context';
import Logout from '../components/logout';



export default function Root() {

    const url = window.location.href;
    const pathname = new URL(url).pathname;
    const splitUrl = pathname.split('/');
    // console.log(splitUrl);
    const firstParam = splitUrl[1];
    const params = splitUrl[2];

    console.log(`firstParam ${firstParam} params ${params}`);


    const userInfoCTX: MyAppContext = useContext(UserContext);
    console.log("***CONTENT.tsx*** INSIDE CONTENT userInfoCTX IS ", JSON.stringify(userInfoCTX));



    return (
        <>
            <RoutesDOM>
                <Route path="/" element={<Users />} />
                <Route path="/home" element={<Users />} />
                {
                    !userInfoCTX?.loggedIn &&
                    <Route path='/login' element={<Login />} />
                }
                {
                    userInfoCTX?.loggedIn &&
                    <Route path='/logout' element={<Logout />} />
                }
                <Route path='*' element={<Users />} />
                {/* <Route path='platform'>

                </Route> */}

            </RoutesDOM>
        </>
    )
}