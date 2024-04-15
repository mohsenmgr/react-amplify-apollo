import Routes from './routes/root';
import { BrowserRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';


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

    return (
        <>
            <div className={classes.root}>
                <BrowserRouter>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Home - Welcome
                            </Typography>
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">Login</Link>
                        </Toolbar>
                    </AppBar>
                    <Routes />
                </BrowserRouter>
            </div>
        </>
    )
}
