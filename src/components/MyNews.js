import { Grid, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@mui/material/Pagination';
import React from "react";
import { useLoaderData } from 'react-router-dom';
import { AnonymousUser, ApiManager, getUser } from "../utils";
import Loader from "./Loader";
import NewsCard from "./NewsCard";

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

const apiManager = new ApiManager();

export async function myNewsLoader() {
    let user = new AnonymousUser();

    const _ = await getUser().then((u) => {
        user = u;
    })

    return { user };
}

export function MyNews() {
    const classes = useStyles();
    const [news, setNews] = React.useState(null);
    const { user } = useLoaderData();

    console.log(user);
    React.useEffect(() => {
        apiManager.getNews(1, user.id, null, user).then((data) => {
            setNews(data);
        });
    }, []);

    const handleChangePage = (event, value) => {
        apiManager.getNews(value, user.id, null, user).then((data) => {
            setNews(data);
        });
    }

    if(news === null) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <List className={classes.news_headers}>
                <Typography variant="h4">Your news</Typography>
                <Typography variant="body2">News count: {news.count}</Typography>
            </List>
            <div className={classes.news_list_container}>
                <Grid container spacing={2} className={classes.news_list}>
                    {
                        news.results?.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))
                    }
                </Grid>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
                <Pagination count={Math.ceil(news.count / 10)} shape="rounded" onChange={handleChangePage} />
            </div>
        </div>
    );
}