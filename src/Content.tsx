import Routes from './routes/root';
import { BrowserRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { MyAppContext } from './types';
import { useContext } from 'react';
import { UserContext } from './context';
import { Todo } from './types/todo';
import { editType } from './types/editable';


export default function Content() {


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
    const classes = useStyles();


    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);
    //console.log("*** CONTENT.tsx *** applicationContext: ", JSON.stringify(applicationContext));

    const showLoginLogout = () => {

        let component: JSX.Element;

        component = !!applicationContext?.loggedIn ?
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/logout">Logout</Link>
            :
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">Login</Link>;
        return component;
    };

    const state: Omit<Todo, "userId"> & editType = {
        id: "",
        title: "",
        description: "",
        done: false,
        photo: "",
        dueDate: undefined,
        edit: false
    }

    return (
        <>
            <div className={classes.root}>
                <BrowserRouter>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/home">Home - Welcome</Link>
                            </Typography>
                            <Typography variant="h6" className={classes.title}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/createtodo" state={state}>Create Todo</Link>
                            </Typography>

                            {showLoginLogout()}
                        </Toolbar>
                    </AppBar>
                    <Routes />
                </BrowserRouter>
            </div>
        </>
    )
}
