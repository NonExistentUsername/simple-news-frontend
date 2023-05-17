import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import React from "react";
import { ApiManager } from "../utils";

const apiManager = new ApiManager();


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    news_headers: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        maxWidth: 500,
        width: "100%",
        height: "auto",
        margin: theme.spacing(2),
    },
    card_content: {
        height: 200,
        overflow: 'hidden',
    },
}));

export default function NewsCard({ article, index }) {
    Moment.locale('en');
    const classes = useStyles();

    const handleToggle = () => {
        window.location.href = '/article/' + article.id;
    };

    return (
        <Card key={index} className={classes.card}>
            <CardHeader 
                title={article.title} 
                subheader={article.created_by + ' - ' + Moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}
            />
            <CardContent className={classes.card_content}>
                <Typography variant="body2">
                    {article.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" onClick={handleToggle}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
