import { useQuery } from '@apollo/client';


import { GET_TODOS } from '../graphQL/queries'
import { Key } from 'react';


interface Location {
    id: null | undefined | Key
    name: String
    description: String | null
    photo: String | null
}

export default function Users() {

    const { loading, error, data } = useQuery(GET_TODOS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return data.locations?.map(({ id, name, description, photo }: Location) => (
        <div key={id}>
            <h3>{name}</h3>
            <img width="400" height="250" alt="location-reference" src={`${photo}`} />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
            <br />
        </div>
    ));
}