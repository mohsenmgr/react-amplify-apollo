import { useLazyQuery } from '@apollo/client';
import { GET_TODOS } from '../graphQL/queries'
import { useContext, useEffect, useState } from 'react';
import { MyAppContext } from '../types';
import { MyTodoContext, UserContext } from '../context';
import { Todo } from '../types/todo';
import MyCard from './MyCard';
import { Grid } from '@mui/material';
import { TodoContext } from '../types/todocontext';


export default function Users() {

    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);
    const myTodoContext: TodoContext = useContext<TodoContext>(MyTodoContext);


    //console.log(`++++++ applicationContext for Users ++++++ ${JSON.stringify(applicationContext)}`);
    const username = applicationContext.user.username;

    const [getData, { refetch }] = useLazyQuery(GET_TODOS);
    const [todos, setTodos] = useState<Array<Todo>>(new Array<Todo>());

    const userItem = {
        userId: username
    }

    const refreshData = async () => {
        console.log("Refresh Data is called");
        try {
            const { data } = await refetch({
                variables: userItem
            });

            const todos: Todo[] | undefined = data?.getTodos;
            const updatedData = todos ? todos?.map((a) => {
                return {
                    ...a,
                    createdAt: new Date(a.createdAt as string).getTime()
                }
            }).sort((a, b) => {
                return a.createdAt - b.createdAt
            }) : [];
            setTodos(updatedData);

            return "success";

        }
        catch (error) {
            console.error(error);
            //throw new Error(error as string);
            return "fail";
        }
    }

    myTodoContext.refreshTodo = refreshData;

    useEffect(() => {
        console.log("use effect is called");
        getData({
            variables: userItem
        }).then(res => {
            const data: Todo[] | undefined = res.data?.getTodos;
            const updatedData = data ? data?.map((a) => {
                return {
                    ...a,
                    createdAt: new Date(a.createdAt as string).getTime()
                }
            }).sort((a, b) => {
                return a.createdAt - b.createdAt
            }) : [];
            setTodos(updatedData);
        });
    }, []);

    return (
        <>
            <Grid container spacing={4} sx={{ mt: 0 }}>
                {
                    todos?.map(({ id, title, description, photo, done, dueDate, createdAt }) => (
                        <Grid item xs={12} sm={6} md={2} key={id}>
                            <MyCard id={id} title={title} description={description} photo={photo} done={done} dueDate={dueDate}
                                createdAt={new Date(createdAt as string).toLocaleDateString('it-IT')} onRefresh={refreshData} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}