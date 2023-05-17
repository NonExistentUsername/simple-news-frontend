import { Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiManager } from "../utils";

const apiManager = new ApiManager();

export async function articleLoader ({ params}) {
    const article = await apiManager.getArticle(params.id).then((data) => {
        return { data };
    });
    return { article };
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
    const classes = useStyles();
    
    let { article }  = useLoaderData();
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
                    subheader={created_by + ' - ' + created_at}
                />
                <CardContent>
                    <Typography variant="body2">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions>
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
                </CardActions>
            </Card>
        </div>
    );
}
