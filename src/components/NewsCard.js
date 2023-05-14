import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
        margin: theme.spacing(2),
    },
    news_list_container: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    news_list: {
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        justifyContent: "left",
        flexWrap: "wrap",
        margin: theme.spacing(2),
        maxWidth: 1000 + theme.spacing(2) * 4,
        margin: "auto",
    },
}));

export default function NewsCard({ article, index }) {
    const classes = useStyles();

    const handleToggle = () => {
        
    };

    return (
        <Card key={index} className={classes.card}>
            <CardHeader title={article.title} />
            <CardContent>
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
