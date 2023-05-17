import { Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiManager, getUser } from "../utils";
import Error from './Error';

const apiManager = new ApiManager();

export async function articleLoader ({ params }) {
    let user = null;

    const _ = await getUser().then((u) => {
        user = u;
    })

    const article = await apiManager.getArticle(params.id, user).then((data) => {
        return { data };
    });
    return { article: article, user: user };
}

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        height: '100%',
    },
}));


export function Article () {
    Moment.locale('en');
    const classes = useStyles();
    
    let { article, user }  = useLoaderData();
    article = article.data;
    
    const title = article.title;
    const content = article.content;
    const created_by = article.created_by;
    const created_at = article.created_at;
    

    return (
        <div className={classes.main}>
            <Card>
                <CardHeader 
                    title={title} 
                    subheader={created_by + ' - ' + Moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}
                />
                <CardContent>
                    {
                        article.is_banned ?
                        <Error message="This news is banned" />
                        :
                        null
                    }
                    <Typography variant="body2">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <List style={{ width: "100%" }}>
                            {
                                created_by === user.username || user.is_staff ? (
                                    <ListItem selected={true}>
                                        <Button onClick={() => window.location.href = "/edit-news/" + article.id}>
                                            Edit
                                        </Button>
                                    </ListItem>
                                ) : null
                            }
                        <ListItem>
                            <List subheader={<ListSubheader>Comments</ListSubheader>} className={classes.root}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Brunch this weekend?"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                Ali Connors
                                                </Typography>
                                                {" — I'll be in your neighborhood doing errands this…"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </ListItem>
                    </List>
                </CardActions>
            </Card>
        </div>
    );
}
