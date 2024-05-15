import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useContext, useState } from 'react';
import { Todo } from '../types/todo';
import { MakeTodo } from '../graphQL/mutations';

import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MyAppContext } from '../types';
import { UserContext } from '../context';





export default function MyForm() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const [mkTodoMutation] = useMutation<Todo>(MakeTodo);

    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);
    console.log("*** MyForm.tsx *** applicationContext: ", JSON.stringify(applicationContext));


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    };

    const onSubmit = () => {
        // console.log(`title: ${title} , description: ${description} , image: ${image}`)
        const userId = applicationContext.user.id;
        const todoItem: Todo = { id: uuidv4(), userId: userId, title: title, description: description, photo: image };

        setTitle("");
        setDescription("");
        setImage("");

        console.log(todoItem);

        mkTodoMutation({ variables: todoItem }).then((data) => console.log(data)).catch((error) => console.error(error));

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

            <Button onClick={onSubmit}>Submit</Button>
        </FormControl>
    )
}