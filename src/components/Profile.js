import { Paper } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useLoaderData } from 'react-router-dom';
import { AnonymousUser, ApiManager, getUser } from "../utils";

const apiManager = new ApiManager();

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: '100%',
    }
}));


export async function profileLoader() {
    let user = new AnonymousUser();

    const _ = await getUser().then((u) => {
        user = u;
    })
    
    return { user };
}

export function Profile() {
    let { user } = useLoaderData();
    console.log(user);

    return (
        <Paper className={useStyles().paper}>
            <h1>
                Profile
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar>{user.username[0]}</Avatar>
                <h2>{user.username}</h2>
            </div>
            <p>{user.email}</p>
            <p>{ user.is_staff ? "Staff" : "Not staff" }</p>
        </Paper>
    );
}
