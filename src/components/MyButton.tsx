import { Button } from '@material-ui/core';


interface Props {
    text: string,
    onLogout: () => void
}

export default function MyButton(props: Props) {
    const { text, onLogout } = props;


    return <Button color="primary" variant="contained" disableElevation onClick={onLogout}>{text}</Button>;
}