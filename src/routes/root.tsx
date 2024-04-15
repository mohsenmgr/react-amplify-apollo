import {
    Route,
    Routes as RoutesDOM,
} from 'react-router-dom';

import Users from '../components/Users';
import Login from '../components/login';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';


export default function Root() {

    const url = window.location.href;
    const pathname = new URL(url).pathname;
    const splitUrl = pathname.split('/');
    // console.log(splitUrl);
    const firstParam = splitUrl[1];
    const params = splitUrl[2];

    console.log(`firstParam ${firstParam} params ${params}`);


    let [userInfo, setUserInfo] = useState({});


    useEffect(() => {

        async function fetchUserInfo() {
            const currentUserInfo = await Auth.currentUserInfo();
            console.log('current user info', currentUserInfo);
            setUserInfo(currentUserInfo);
        }

        fetchUserInfo();

        // Auth.currentUserInfo().then((currentUserInfo): any => {
        //     console.log(`current user info ${JSON.stringify(currentUserInfo)}`);    
        // });
    }, []);

    return (
        <>
            <RoutesDOM>
                <Route path="/" element={<Users />} />
                <Route path="/home" element={<Users />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='platform'>

                </Route> */}

            </RoutesDOM>
        </>
    )
}