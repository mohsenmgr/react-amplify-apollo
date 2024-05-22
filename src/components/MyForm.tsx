import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useContext, useState } from 'react';
import { Todo } from '../types/todo';
import { MakeTodo } from '../graphQL/mutations';

import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MyAppContext } from '../types';
import { MyTodoContext, UserContext } from '../context';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../types/todocontext';





export default function MyForm() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);


    const [mkTodoMutation] = useMutation<Todo>(MakeTodo);
    const navigate = useNavigate();

    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);
    //console.log("*** MyForm.tsx *** applicationContext: ", JSON.stringify(applicationContext));

    const myTodoContext: TodoContext = useContext<TodoContext>(MyTodoContext);
    console.log("*** MyForm.tsx *** Todo Context is: ", JSON.stringify(myTodoContext));



    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    };

    const handleDateChange = (newDate: Dayjs | null) => {
        setDueDate(newDate);
    }

    const onSubmit = async () => {
        // console.log(`title: ${title} , description: ${description} , image: ${image}`)
        const username = applicationContext.user.username;
        const awsDate = dueDate?.toDate();
        const todoItem: Todo = { id: uuidv4(), userId: username, title: title, description: description, photo: image, dueDate: awsDate, done: false };

        setTitle("");
        setDescription("");
        setImage("");
        setDueDate(null);

        console.log(todoItem);

        try {
            const data = await mkTodoMutation({ variables: todoItem });
            console.log(data);
            const res = await myTodoContext.refreshTodo();
            console.log(`Promise has returned ${res}`);

        }
        catch (error) {
            console.error(error);
            throw new Error(error as string);
        }

        navigate("/home")

        // console.log(todoItem);
    }


    return (
        <FormControl>
            <FormLabel>Todo title</FormLabel>
            <TextField type="text" variant='outlined' color='primary' value={title} onChange={handleTitleChange} />

            <FormLabel>Todo description</FormLabel>
            <TextField type="text" variant='outlined' color='primary' value={description} onChange={handleDescriptionChange} />

            <FormLabel>Todo image</FormLabel>
            <TextField type="text" variant='outlined' color='primary' value={image} onChange={handleImageChange} />

            <FormLabel>&nbsp;</FormLabel>
            <DatePicker label="Due Date" value={dueDate} onChange={handleDateChange} />


            <Button onClick={onSubmit}>Submit</Button>
        </FormControl>
    )
}