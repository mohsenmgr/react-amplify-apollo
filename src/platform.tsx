import { Typography, Container, makeStyles } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function Platform() {
    const classes = useStyles();


    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h2" component="h1" gutterBottom>
                    React Application
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This is a landing page built using React and Material-UI v4.
                </Typography>
            </Container>
            <Outlet />
        </>
    )
}