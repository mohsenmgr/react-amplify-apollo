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
type RefreshFunction = {
    onRefresh: () => Promise<string>
}
type MyCardPropType = TodoWithoutUserId & RefreshFunction;


type TodoModified = Partial<Todo>;


export default function MyCard(props: MyCardPropType) {

    const [isChecked, setIsChecked] = useState(props.done);
    const [modifyTodoMutation] = useMutation<TodoModified>(ModifyTodo);
    const [deleteTodoMutation] = useMutation<{ id: string }>(RemoveTodo);
    const refreshFunction = props.onRefresh;



    const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        console.log(checked);
        modifyTodoMutation({ variables: { id: props.id, done: checked } }).then((res: any) => console.log(res.data.modifyTodo)).catch((error) => console.error(error));
    };

    const handleDeleteClick = async () => {
        await deleteTodoMutation({ variables: { id: props.id } }).then((res: any) => console.log(res.data.removeTodo)).catch((error) => console.error(error));
        await refreshFunction();
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
            <Button variant="text" color="error" onClick={() => handleDeleteClick()}>
                Delete
            </Button>


        </Card>
    );
}