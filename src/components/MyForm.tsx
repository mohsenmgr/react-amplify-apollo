import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useContext, useState } from 'react';
import { Todo } from '../types/todo';
import { MakeTodo, ModifyTodo } from '../graphQL/mutations';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { MyTodoContext } from '../context';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../types/todocontext';
import { editType } from '../types/editable';



type FormProps = Todo & editType;

export default function MyForm(props: FormProps) {

    const editOperation = props.edit;
    const todoId = props.id;
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [image, setImage] = useState(props.photo);
    const [dueDate, setDueDate] = useState<dayjs.Dayjs | undefined>(dayjs(props.dueDate));
    const username = props.userId;

    const [mkTodoMutation] = useMutation<Todo>(MakeTodo);
    const [modifyTodoMutation] = useMutation<Omit<Todo, "userId">>(ModifyTodo);
    const navigate = useNavigate();

    //console.log("*** MyForm.tsx *** applicationContext: ", JSON.stringify(applicationContext));

    const myTodoContext: TodoContext = useContext<TodoContext>(MyTodoContext);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    };

    const handleDateChange = (newDate: dayjs.Dayjs | undefined | null) => {
        newDate ? setDueDate(newDate) : setDueDate(undefined)
    }

    const onSubmit = async () => {
        const awsDate = dueDate ? dueDate.toDate().toISOString() : ""

        try {
            if (editOperation) {
                const editTodoItem: Omit<Todo, "userId"> = { id: todoId, title: title, description: description, photo: image, dueDate: awsDate, done: false };
                await modifyTodoMutation({ variables: editTodoItem });
            }
            else {
                const todoItem: Todo = { id: uuidv4(), userId: username, title: title, description: description, photo: image, dueDate: awsDate, done: false };
                await mkTodoMutation({ variables: todoItem });
            }

            await myTodoContext.refreshTodo();
        }
        catch (error) {
            console.error(error);
            throw new Error(error as string);
        }

        setTitle("");
        setDescription("");
        setImage("");
        setDueDate(undefined);

        navigate("/home")
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