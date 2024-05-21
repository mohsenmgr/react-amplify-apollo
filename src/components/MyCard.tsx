import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Checkbox, Chip, FormControlLabel } from '@mui/material';
import { Todo } from '../types/todo';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RemoveTodo, ModifyTodo } from '../graphQL/mutations';

type TodoWithoutUserId = Omit<Todo, 'userId'>;
type TodoModified = Partial<Todo>;


export default function MyCard(props: TodoWithoutUserId) {

    const [isChecked, setIsChecked] = useState(props.done);
    const [modifyTodoMutation] = useMutation<TodoModified>(ModifyTodo);
    const [deleteTodoMutation] = useMutation<{ id: string }>(RemoveTodo);



    const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        console.log(checked);
        modifyTodoMutation({ variables: { id: props.id, done: checked } }).then((data: any) => console.log(data)).catch((error) => console.error(error));
    };

    const handleDeleteClick = () => {
        deleteTodoMutation({ variables: { id: props.id } }).then((data: any) => console.log(data.removeTodo)).catch((error) => console.error(error));
    }

    return (
        <Card style={{ opacity: isChecked ? 0.5 : 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.photo}
                    alt={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {props.description}
                    </Typography>
                    <br />
                    <Typography variant="body1" color="text.secondary">
                        {props.createdAt as string}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <FormControlLabel
                control={
                    <Checkbox
                        name="SomeName"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                        color="primary"
                    />
                }
                label="Done" />
            <Button variant="text" color="error" onClick={handleDeleteClick}>
                Delete
            </Button>


        </Card>
    );
}