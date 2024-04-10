import { useLazyQuery } from '@apollo/client';


import { GET_TODOS } from '../graphQL/queries'
import { Key, useEffect, useState } from 'react';


interface Todo {
    id: null | undefined | Key
    title: String
    description: String | null
    photo: String | null
}

export default function Users() {

    const [todos, setTodos] = useState<Array<Todo>>(new Array<Todo>());

    const [getData, { refetch }] = useLazyQuery(GET_TODOS);


    useEffect(() => {
        getData().then(res => {
            const data: Array<Todo> = res.data?.getTodos;
            setTodos(data);
        });
    }, []);




    return todos?.map(({ id, title, description, photo }) => (
        <div key={id}>
            <h3>{title}</h3>
            <br />
            <b>Description:</b>
            <p>{description}</p>
            <br />
            <b>Image</b>
            <br />
            <img width="400" height="250" alt="location-reference" src={`${photo}`} />
        </div>
    ));
}