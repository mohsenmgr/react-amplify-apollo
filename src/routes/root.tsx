import {
    Route,
    Routes as RoutesDOM,
} from 'react-router-dom';

import Users from '../components/Users';
import Login from '../components/login';


export default function Root() {

    const url = window.location.href;
    const pathname = new URL(url).pathname;
    const splitUrl = pathname.split('/');
    // console.log(splitUrl);
    const firstParam = splitUrl[1];
    const params = splitUrl[2];

    console.log(`firstParam ${firstParam} params ${params}`);

    return (
        <>
            <RoutesDOM>

                <Route path="/" element={<Users />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='platform'>

                </Route> */}

            </RoutesDOM>
        </>
    )
}