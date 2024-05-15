import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Checkbox } from '@mui/material';
import { Todo } from '../types/todo';
import { useState } from 'react';

type TodoWithoutUserId = Omit<Todo, 'userId' | 'createdAt'>;


export default function MyCard(props: TodoWithoutUserId) {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
        setIsChecked(event.target.checked);
    };

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
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                color="primary"
            />
        </Card>
    );
}