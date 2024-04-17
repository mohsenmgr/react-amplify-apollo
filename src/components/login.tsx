import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { useNavigate } from 'react-router-dom';
import { MyAppContext, User } from '../types'
import { UserContext } from '../context';

Amplify.configure(awsExports);

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(3),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {

    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);

    const navigate = useNavigate();
    const [errors, setErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const username = email;
        const signIn = async function () {
            return Auth.signIn({
                username,
                password,

            })
        };

        signIn().then((result) => {
            console.log('*** login *** result is : ' + JSON.stringify(result))
            setErrors(false);

            const context = new MyAppContext();
            const user: User = new User();
            user.setUser(result?.username, result?.username, result?.attributes);
            context.setUser(user);
            context.setLoggedIn(true);

            // Call the main application Context with the updated information
            // this callback calls setContext of the app, and update the isLoggedIn flag inside the context
            applicationContext.callback(context);
            navigate('/home');

        }).catch((error) => { console.error(error); setErrors(true); setErrorMessage(error.code as string) });
    };


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                    {
                        errors ? (<Alert variant="filled" severity="error">
                            {JSON.stringify(errorMessage)}
                        </Alert>) : <></>
                    }

                </Paper>
            </div>
        </Container>
    );
};

export default Login;